import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <header id="header">
        <div className="content">
          <div className="inner">
            <h1>Blog</h1>
            <p>Short notes on field biology, science, and careers.</p>
          </div>
        </div>
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <a href="https://www.bioblogia.net/p/english.html" target="_blank" rel="noreferrer">
                Bio
              </a>
            </li>
            <li>
              <a
                href="https://scholar.google.se/citations?hl=es&pli=1&user=bwM4wj0AAAAJ"
                target="_blank"
                rel="noreferrer"
              >
                Research
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <div id="main">
        <article>
          <h2 className="major">Posts</h2>
          <ul className="blog-list">
            {posts.map((post) => (
              <li key={post.slug}>
                <h3>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="blog-meta">{new Date(post.date).toLocaleDateString()}</p>
                <p>{post.summary}</p>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </>
  );
}

