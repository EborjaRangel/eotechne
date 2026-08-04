import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NewsletterForm from "@/components/blog/NewsletterForm";
import PostCard from "@/components/blog/PostCard";
import ArticleVideo from "@/components/blog/ArticleVideo";
import ShareArticle from "@/components/blog/ShareArticle";
import { SITE_URL } from "@/lib/brand";
import { getAllPosts, getPostBySlug, getPostPath, formatDate } from "@/lib/blog";
import { Calendar, User, ArrowLeft, Mail } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Artículo no encontrado" };

  const url = `${SITE_URL}${getPostPath(slug)}`;

  return {
    title: `${post.title} | Blog EOTECHNE`,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      locale: "es_MX",
      siteName: "EOTECHNE",
      url,
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: "/logos/eotechne-logo-propuesta-4-apilado.png",
          width: 1200,
          height: 630,
          alt: "EOTECHNE",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/logos/eotechne-logo-propuesta-4-apilado.png"],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getAllPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, 2);
  const shareUrl = `${SITE_URL}${getPostPath(slug)}`;

  return (
    <>
      <Header />
      <main className="min-h-screen min-w-0 overflow-x-clip bg-white pt-14 sm:pt-16">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-eotechne-blue-dark transition hover:text-eotechne-green"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al blog
          </Link>

          <span className="mt-8 inline-block rounded-full bg-eotechne-green/10 px-4 py-1.5 text-xs font-semibold text-eotechne-blue-dark">
            {post.category}
          </span>

          <h1 className="mt-4 text-2xl font-bold tracking-tight text-eotechne-blue-dark sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <p className="mt-4 text-lg text-gray-600">{post.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.author}
            </span>
          </div>

          <div className="prose prose-base sm:prose-lg mt-10 max-w-none overflow-x-auto prose-headings:text-eotechne-blue-dark prose-a:text-eotechne-green prose-strong:text-eotechne-blue-dark sm:mt-12">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          {(post.youtube || post.video) && (
            <ArticleVideo
              youtubeUrl={post.youtube}
              videoSrc={post.video}
              title={post.title}
            />
          )}

          <ShareArticle url={shareUrl} title={post.title} />
        </article>

        <section className="border-t border-gray-100 bg-gray-50 py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-eotechne-blue-dark p-6 sm:p-8 lg:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-eotechne-green/10 text-eotechne-green">
                <Mail className="h-6 w-6" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-white">
                ¿Te gustó este artículo?
              </h2>
              <p className="mt-2 text-white/60">
                Suscríbete al boletín y recibe más contenido como este directo
                en tu correo.
              </p>
              <div className="mt-6">
                <NewsletterForm variant="dark" />
              </div>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <h2 className="text-2xl font-bold text-eotechne-blue-dark">
              Más artículos
            </h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
