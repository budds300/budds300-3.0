import { createHash } from "crypto";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_BODY_BYTES = 32 * 1024;

const buckets = new Map<string, { count: number; resetAt: number }>();

type ContactInput = {
  budget?: unknown;
  company?: unknown;
  email?: unknown;
  formStartedAt?: unknown;
  message?: unknown;
  name?: unknown;
};

type RequestCheck =
  | { ok: true }
  | { error: string; ok: false; status: 403 | 413 | 415 | 429 };

export type SanitizedContact = {
  budget?: string;
  email: string;
  message: string;
  name: string;
};

function clean(value: unknown, maxLength: number) {
  return typeof value === "string"
    ? value.replace(/\s+/g, " ").trim().slice(0, maxLength)
    : "";
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return (
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function hash(value: string) {
  return createHash("sha256").update(value).digest("hex").slice(0, 24);
}

function looksLikeRandomToken(value: string) {
  const compact = value.replace(/[^a-zA-Z]/g, "");
  if (compact.length < 14 || /\s/.test(value)) return false;

  const vowels = compact.match(/[aeiou]/gi)?.length ?? 0;
  const vowelRatio = vowels / compact.length;
  const mixedCaseRuns = value.match(/[a-z][A-Z]|[A-Z][a-z]/g)?.length ?? 0;

  return vowelRatio < 0.24 && mixedCaseRuns >= 4;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function toContactInput(input: unknown): ContactInput {
  return input && typeof input === "object" ? (input as ContactInput) : {};
}

export function assertAcceptableRequest(request: Request): RequestCheck {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return { ok: false, status: 413, error: "Request is too large" };
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return { ok: false, status: 415, error: "Unsupported content type" };
  }

  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) {
        return { ok: false, status: 403, error: "Invalid request origin" };
      }
    } catch {
      return { ok: false, status: 403, error: "Invalid request origin" };
    }
  }

  const bucketKey = hash(getClientIp(request));
  const now = Date.now();
  const bucket = buckets.get(bucketKey);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(bucketKey, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }

  bucket.count += 1;
  if (bucket.count > MAX_REQUESTS_PER_WINDOW) {
    return { ok: false, status: 429, error: "Too many requests" };
  }

  return { ok: true };
}

export function sanitizeContactInput(input: unknown): {
  data?: SanitizedContact;
  error?: string;
} {
  const contactInput = toContactInput(input);

  if (clean(contactInput.company, 100)) {
    return { error: "Invalid submission" };
  }

  const startedAt = Number(contactInput.formStartedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 2500) {
    return { error: "Invalid submission" };
  }

  const name = clean(contactInput.name, 80);
  const email = clean(contactInput.email, 120).toLowerCase();
  const budget = clean(contactInput.budget, 80);
  const message = clean(contactInput.message, 2000);

  if (!name || !email || !message) {
    return { error: "name, email, and message are required" };
  }

  if (!isValidEmail(email)) {
    return { error: "Enter a valid email address" };
  }

  if (name.length < 2 || message.length < 12) {
    return { error: "Please add a little more detail" };
  }

  if (
    looksLikeRandomToken(name) ||
    looksLikeRandomToken(message) ||
    looksLikeRandomToken(budget)
  ) {
    return { error: "Invalid submission" };
  }

  const linkCount = (message.match(/https?:\/\//gi) || []).length;
  if (linkCount > 2) {
    return { error: "Too many links" };
  }

  return {
    data: {
      name,
      email,
      budget: budget || undefined,
      message,
    },
  };
}
