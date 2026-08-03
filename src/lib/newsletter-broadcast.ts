import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import {
  formatDate,
  getAllPosts,
  getPostBySlug,
  getPostExcerpt,
  getPostPath,
  type BlogPost,
} from "@/lib/blog";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/brand";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildNewsletterEmailHtml(post: BlogPost, recipientName?: string | null) {
  const url = `${SITE_URL}${getPostPath(post.slug)}`;
  const greeting = recipientName?.trim()
    ? `Hola ${escapeHtml(recipientName.trim())},`
    : "Hola,";
  const excerpt = getPostExcerpt(post.content);

  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#171717;background:#f9fafb;padding:24px 12px;">
      <div style="background:#00497b;color:#fff;padding:24px;border-radius:12px 12px 0 0;text-align:center;">
        <strong style="font-size:20px;">EOTECHNE</strong>
        <div style="margin-top:6px;font-size:14px;opacity:0.9;">Boletín · Nuevo artículo</div>
      </div>
      <div style="background:#fff;border:1px solid #e5e7eb;border-top:none;padding:28px 24px;border-radius:0 0 12px 12px;">
        <p style="margin:0 0 16px;color:#374151;">${greeting}</p>
        <span style="display:inline-block;background:#8ec44b1a;color:#00497b;padding:6px 12px;border-radius:999px;font-size:12px;font-weight:700;">
          ${escapeHtml(post.category)}
        </span>
        <h1 style="margin:16px 0 12px;font-size:24px;line-height:1.3;color:#00497b;">
          ${escapeHtml(post.title)}
        </h1>
        <p style="margin:0 0 16px;color:#6b7280;font-size:14px;">
          ${escapeHtml(formatDate(post.date))} · ${escapeHtml(post.author)}
        </p>
        <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#374151;">
          ${escapeHtml(post.description)}
        </p>
        <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#4b5563;">
          ${escapeHtml(excerpt)}
        </p>
        <div style="text-align:center;margin:28px 0;">
          <a href="${url}" style="display:inline-block;background:#8ec44b;color:#00497b;text-decoration:none;font-weight:700;padding:14px 28px;border-radius:999px;">
            Leer artículo completo
          </a>
        </div>
        <p style="margin:0;font-size:13px;line-height:1.6;color:#6b7280;text-align:center;">
          También puedes abrirlo aquí:<br />
          <a href="${url}" style="color:#00497b;">${escapeHtml(url)}</a>
        </p>
        <hr style="margin:28px 0;border:none;border-top:1px solid #e5e7eb;" />
        <p style="margin:0;font-size:12px;line-height:1.6;color:#9ca3af;text-align:center;">
          Recibes este correo porque te suscribiste al boletín de EOTECHNE.<br />
          Para dejar de recibirlo, responde a ${escapeHtml(CONTACT_EMAIL)} con el asunto "Cancelar suscripción".
        </p>
      </div>
    </div>
  `.trim();
}

export async function broadcastNewsletterPost(slug: string) {
  const post = getPostBySlug(slug);
  if (!post) {
    return { ok: false as const, error: "Artículo no encontrado" };
  }

  const existing = await prisma.newsletterBroadcast.findUnique({
    where: { slug },
  });
  if (existing) {
    return {
      ok: false as const,
      error: `Este artículo ya se envió el ${existing.sentAt.toLocaleString("es-MX")} a ${existing.recipientCount} suscriptores`,
    };
  }

  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "asc" },
  });

  if (subscribers.length === 0) {
    return { ok: false as const, error: "No hay suscriptores en el boletín" };
  }

  const subject = `${post.title} | Boletín EOTECHNE`;
  let sentCount = 0;
  const failures: string[] = [];

  for (const subscriber of subscribers) {
    const html = buildNewsletterEmailHtml(post, subscriber.name);
    const result = await sendEmail({
      to: subscriber.email,
      subject,
      html,
      replyTo: CONTACT_EMAIL,
    });

    if (result.sent) {
      sentCount += 1;
    } else {
      failures.push(`${subscriber.email}: ${result.error ?? "error desconocido"}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  if (sentCount === 0) {
    return {
      ok: false as const,
      error: failures[0] ?? "No se pudo enviar ningún correo",
      failures,
    };
  }

  await prisma.newsletterBroadcast.create({
    data: {
      slug,
      recipientCount: sentCount,
    },
  });

  return {
    ok: true as const,
    slug,
    title: post.title,
    url: `${SITE_URL}${getPostPath(slug)}`,
    sentCount,
    failedCount: failures.length,
    failures,
  };
}

export async function broadcastLatestUnsentPost() {
  const sent = await prisma.newsletterBroadcast.findMany({
    select: { slug: true },
  });
  const sentSlugs = new Set(sent.map((item) => item.slug));
  const latestUnsent = getAllPosts().find((post) => !sentSlugs.has(post.slug));

  if (!latestUnsent) {
    return { ok: false as const, error: "No hay artículos nuevos por enviar" };
  }

  return broadcastNewsletterPost(latestUnsent.slug);
}
