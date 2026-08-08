import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PostCard from "@/components/blog/PostCard";
import NewsletterForm from "@/components/blog/NewsletterForm";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/brand";
import {
  defaultOpenGraph,
  defaultTwitter,
} from "@/lib/seo";
import { Mail } from "lucide-react";

const BLOG_TITLE = "Blog";
const BLOG_DESCRIPTION =
  "Artículos sobre desarrollo a la medida, IA Generativa, Ciencia de Datos Aplicada, Business Intelligence, fintech y tecnología para empresas y gobierno en México.";

export const metadata: Metadata = {
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: defaultOpenGraph(BLOG_TITLE, BLOG_DESCRIPTION, "/blog"),
  twitter: defaultTwitter(BLOG_TITLE, BLOG_DESCRIPTION),
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="min-h-screen min-w-0 overflow-x-clip bg-gray-50 pt-14 sm:pt-16">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-eotechne-green/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-eotechne-green">
              Blog
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-eotechne-blue-dark sm:text-4xl md:text-5xl">
              Artículos y tendencias
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Publicamos regularmente sobre tecnología, datos e innovación para
              PyMEs, medianas empresas e instituciones de gobierno.
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="mt-16 rounded-2xl border border-dashed border-gray-300 bg-white p-8 sm:p-12">
              <p className="text-gray-600">
                Próximamente publicaremos nuestros primeros artículos.
              </p>
            </div>
          )}

          <div className="mt-16 overflow-hidden rounded-2xl bg-eotechne-blue-dark sm:mt-20">
            <div className="grid gap-6 p-6 sm:gap-8 sm:p-8 lg:grid-cols-2 lg:p-12">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-eotechne-green/10 text-eotechne-green">
                  <Mail className="h-6 w-6" />
                </div>
                <h2 className="mt-6 text-2xl font-bold text-white">
                  Suscríbete a nuestro boletín
                </h2>
                <p className="mt-3 text-white/60">
                  Recibe cada semana artículos, tendencias y recursos sobre
                  desarrollo a la medida, IA Generativa y Business Intelligence.
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-full">
                  <NewsletterForm variant="dark" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-sm font-medium text-eotechne-blue-dark transition hover:text-eotechne-green"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
