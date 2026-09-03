import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";
import { getGlobalSettings } from "@/lib/frontend-data";
import { sendContactNotification } from "@/lib/mailer";
import type { Media } from "@/payload-types";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, budget, message } = body ?? {};

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "name, email, and message are required" },
      { status: 400 },
    );
  }

  const payload = await getPayloadClient();
  await payload.create({
    collection: "messages",
    data: { name, email, budget, message },
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
    await sendContactNotification({ name, email, budget, message, logoUrl });
  } catch (error) {
    console.error("Failed to send contact notification email:", error);
  }

  return NextResponse.json({ success: true });
}
