import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPosts, getPostBySlug } from '@/lib/posts';

type Params = {
  slug: string;
};

export function generateStaticParams() {
  return getAllPosts('es').map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPageEs({ params }: { params: Params }) {
  const post = getPostBySlug(params.slug, 'es');

  if (!post) {
    notFound();
  }

  return (
    <>
      <header id="header">
        <div className="content">
          <div className="inner">
            <h1>{post.title}</h1>
            <p className="blog-meta">
              {new Date(post.date).toLocaleDateString('es-ES')} &middot; Por Fernando Mateos-González
            </p>
          </div>
        </div>
        <nav>
          <ul>
            <li>
              <Link href="/es">Inicio</Link>
            </li>
            <li>
              <Link href="/es/blog">Blog</Link>
            </li>
            <li>
              <Link href="/es/te-ayudo">¿Te ayudo?</Link>
            </li>
            <li>
              <Link href="/blog">English</Link>
            </li>
          </ul>
        </nav>
      </header>

      <div id="main">
        <article>
          {post.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
          {post.originalSource && (
            <p className="original-source">
              Este artículo se publicó originalmente en{' '}
              <a href={post.originalSource} target="_blank" rel="noreferrer">
                Bioblogia.net
              </a>
            </p>
          )}
        </article>
      </div>
    </>
  );
}
