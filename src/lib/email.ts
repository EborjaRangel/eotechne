import nodemailer from "nodemailer";
import { CONTACT_EMAIL } from "@/lib/brand";

const RESEND_API_URL = "https://api.resend.com/emails";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function line(label: string, value: string | null | undefined): string {
  if (!value?.trim()) return "";
  return `<tr><td style="padding:8px 12px;font-weight:600;color:#00497b;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 12px;color:#374151;">${escapeHtml(value)}</td></tr>`;
}

function emailShell(title: string, bodyRows: string): string {
  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#171717;">
      <div style="background:#00497b;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0;">
        <strong style="font-size:18px;">EOTECHNE</strong>
        <div style="margin-top:4px;font-size:14px;opacity:0.85;">${escapeHtml(title)}</div>
      </div>
      <div style="border:1px solid #e5e7eb;border-top:none;padding:20px 24px;border-radius:0 0 12px 12px;">
        <table style="width:100%;border-collapse:collapse;">${bodyRows}</table>
      </div>
    </div>
  `.trim();
}

interface SendEmailOptions {
  subject: string;
  html: string;
  replyTo?: string;
}

function getDestinationEmail(): string {
  return process.env.CONTACT_EMAIL ?? CONTACT_EMAIL;
}

async function sendViaResend({
  subject,
  html,
  replyTo,
}: SendEmailOptions): Promise<{ sent: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { sent: false, error: "RESEND_API_KEY not configured" };

  const from =
    process.env.EMAIL_FROM ?? "EOTECHNE Notificaciones <onboarding@resend.dev>";

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [getDestinationEmail()],
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    return { sent: false, error: detail };
  }

  return { sent: true };
}

async function sendViaSmtp({
  subject,
  html,
  replyTo,
}: SendEmailOptions): Promise<{ sent: boolean; error?: string }> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return { sent: false, error: "SMTP not configured" };
  }

  const port = Number(process.env.SMTP_PORT ?? "465");
  const secure = process.env.SMTP_SECURE !== "false";

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM ?? `EOTECHNE <${user}>`,
    to: getDestinationEmail(),
    subject,
    html,
    replyTo,
  });

  return { sent: true };
}

export async function sendNotificationEmail(
  options: SendEmailOptions,
): Promise<{ sent: boolean; error?: string }> {
  try {
    if (process.env.RESEND_API_KEY) {
      const result = await sendViaResend(options);
      if (result.sent) return result;
      console.error("Resend failed, trying SMTP:", result.error);
    }

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      return await sendViaSmtp(options);
    }

    console.warn(
      "Correo no enviado: configura RESEND_API_KEY o SMTP (GoDaddy) en Vercel/Railway.",
    );
    return {
      sent: false,
      error: "No email provider configured",
    };
  } catch (error) {
    console.error("Email send error:", error);
    return {
      sent: false,
      error: error instanceof Error ? error.message : "Unknown email error",
    };
  }
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  service?: string | null;
  industry?: string | null;
  message: string;
}) {
  const rows = [
    line("Nombre", data.name),
    line("Correo", data.email),
    line("Empresa", data.company),
    line("Teléfono", data.phone),
    line("Servicio de interés", data.service),
    line("Industria", data.industry),
    line("Mensaje", data.message),
  ].join("");

  return sendNotificationEmail({
    subject: `[EOTECHNE] Nuevo contacto: ${data.name}`,
    replyTo: data.email,
    html: emailShell("Nuevo mensaje desde el formulario de contacto", rows),
  });
}

export async function sendNewsletterNotification(data: {
  email: string;
  name?: string | null;
}) {
  const rows = [line("Correo", data.email), line("Nombre", data.name)].join("");

  return sendNotificationEmail({
    subject: `[EOTECHNE] Nueva suscripción al boletín`,
    replyTo: data.email,
    html: emailShell("Nueva suscripción al boletín", rows),
  });
}
