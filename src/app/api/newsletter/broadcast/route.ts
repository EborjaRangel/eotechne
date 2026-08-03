import { NextResponse } from "next/server";
import {
  broadcastLatestUnsentPost,
  broadcastNewsletterPost,
} from "@/lib/newsletter-broadcast";

function isAuthorized(request: Request): boolean {
  const secret = process.env.NEWSLETTER_SECRET;
  if (!secret) return false;

  const header = request.headers.get("authorization");
  if (header === `Bearer ${secret}`) return true;

  const url = new URL(request.url);
  return url.searchParams.get("secret") === secret;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const slug = typeof body.slug === "string" ? body.slug.trim() : "";

    const result = slug
      ? await broadcastNewsletterPost(slug)
      : await broadcastLatestUnsentPost();

    if (!result.ok) {
      return NextResponse.json(
        {
          error: result.error,
          ...("failures" in result ? { failures: result.failures } : {}),
        },
        { status: 400 },
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Newsletter broadcast error:", error);
    return NextResponse.json(
      { error: "Error al enviar el boletín" },
      { status: 500 },
    );
  }
}
