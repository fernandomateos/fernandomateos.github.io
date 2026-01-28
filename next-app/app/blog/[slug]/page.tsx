import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPosts, getPostBySlug } from '@/lib/posts';

type Params = {
  slug: string;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: Params }) {
  const post = getPostBySlug(params.slug);

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
              {new Date(post.date).toLocaleDateString()} &middot; By Fernando Mateos-González
            </p>
          </div>
        </div>
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
          </ul>
        </nav>
      </header>

      <div id="main">
        <article>
          {post.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </article>
      </div>
    </>
  );
}

