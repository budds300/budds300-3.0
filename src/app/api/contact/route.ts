import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";

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

  return NextResponse.json({ success: true });
}
