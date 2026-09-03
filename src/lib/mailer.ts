import { Resend } from "resend";

let client: Resend | null = null;

function getClient() {
  if (client) return client;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  client = new Resend(apiKey);
  return client;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderTemplate({
  name,
  email,
  budget,
  message,
  logoUrl,
}: {
  name: string;
  email: string;
  budget?: string;
  message: string;
  logoUrl?: string;
}) {
  const rows = [
    { label: "Name", value: name },
    { label: "Email", value: email },
    budget ? { label: "Budget", value: budget } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  const rowsHtml = rows
    .map(
      (row) => `
        <tr>
          <td style="padding:6px 0;color:#8a8f98;font-size:13px;width:90px;vertical-align:top;">${row.label}</td>
          <td style="padding:6px 0;color:#f5f5f5;font-size:14px;">${escapeHtml(row.value)}</td>
        </tr>`,
    )
    .join("");

  const logoHtml = logoUrl
    ? `<img src="${escapeHtml(logoUrl)}" alt="Logo" height="28" style="height:28px;width:auto;display:block;margin-bottom:12px;">`
    : "";

  return `
<div style="background:#0a0a0a;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" style="max-width:520px;margin:0 auto;background:#141416;border:1px solid #26272b;border-radius:16px;overflow:hidden;">
    <tr>
      <td style="padding:24px 28px;border-bottom:1px solid #26272b;">
        ${logoHtml}
        <span style="display:inline-block;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#d6ff45;">New Inquiry</span>
        <h1 style="margin:8px 0 0;font-size:20px;color:#f5f5f5;">${escapeHtml(name)} wants to talk</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 28px;">
        <table role="presentation" width="100%" style="border-collapse:collapse;">
          ${rowsHtml}
        </table>
        <div style="margin-top:16px;padding-top:16px;border-top:1px solid #26272b;">
          <p style="margin:0 0 6px;color:#8a8f98;font-size:13px;">Message</p>
          <p style="margin:0;color:#f5f5f5;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(message)}</p>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 28px;background:#0f0f11;">
        <p style="margin:0;color:#5c6068;font-size:12px;">Sent from the tammingabudds.com contact form. Reply to this email to respond directly to ${escapeHtml(name)}.</p>
      </td>
    </tr>
  </table>
</div>`;
}

export async function sendContactNotification({
  name,
  email,
  budget,
  message,
  logoUrl,
}: {
  name: string;
  email: string;
  budget?: string;
  message: string;
  logoUrl?: string;
}) {
  const resend = getClient();
  if (!resend) {
    console.warn("Skipping contact notification email: RESEND_API_KEY not set.");
    return;
  }

  const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
  const to = process.env.CONTACT_TO_EMAIL || from;

  await resend.emails.send({
    from: `Portfolio Contact <${from}>`,
    to,
    replyTo: email,
    subject: `New inquiry from ${name}`,
    html: renderTemplate({ name, email, budget, message, logoUrl }),
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      budget ? `Budget: ${budget}` : null,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}
