import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";
import { getGlobalSettings } from "@/lib/frontend-data";
import { sendContactNotification } from "@/lib/mailer";
import {
  assertAcceptableRequest,
  sanitizeContactInput,
} from "@/lib/contact-security";
import type { Media } from "@/payload-types";

export async function POST(request: Request) {
  const requestCheck = assertAcceptableRequest(request);
  if (!requestCheck.ok) {
    return NextResponse.json(
      { error: requestCheck.error },
      { status: requestCheck.status },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { data, error } = sanitizeContactInput(body ?? {});
  if (!data) {
    return NextResponse.json(
      { error: error || "Invalid submission" },
      { status: 400 },
    );
  }

  const payload = await getPayloadClient();
  await payload.create({
    collection: "messages",
    data,
  });

  try {
    const settings = await getGlobalSettings();
    const logo =
      settings?.logo && typeof settings.logo === "object"
        ? (settings.logo as Media)
        : null;
    const siteUrl =
      process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
    const logoUrl = logo?.url
      ? logo.url.startsWith("http")
        ? logo.url
        : `${siteUrl}${logo.url}`
      : undefined;
    await sendContactNotification({ ...data, logoUrl });
  } catch (error) {
    console.error("Failed to send contact notification email:", error);
  }

  return NextResponse.json({ success: true });
}
