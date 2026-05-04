import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function BlogIndexPageEs() {
  const posts = getAllPosts('es');

  return (
    <>
      <header id="header">
        <div className="content">
          <div className="inner">
            <h1>Blog</h1>
            <p>Notas sobre biología de campo, ciencia y carreras profesionales.</p>
          </div>
        </div>
        <nav>
          <ul>
            <li>
              <Link href="/es">Inicio</Link>
            </li>
            <li>
              <Link href="/es/te-ayudo">¿Te ayudo?</Link>
            </li>
            <li>
              <a href="https://www.bioblogia.net/" target="_blank" rel="noreferrer">
                Bio
              </a>
            </li>
            <li>
              <a
                href="https://scholar.google.se/citations?hl=es&pli=1&user=bwM4wj0AAAAJ"
                target="_blank"
                rel="noreferrer"
              >
                Investigación
              </a>
            </li>
            <li>
              <Link href="/blog">English</Link>
            </li>
          </ul>
        </nav>
      </header>

      <div id="main">
        <article>
          <h2 className="major">Entradas</h2>
          <ul className="blog-list">
            {posts.map((post) => (
              <li key={post.slug}>
                <h3>
                  <Link href={`/es/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="blog-meta">{new Date(post.date).toLocaleDateString('es-ES')}</p>
                <p>{post.summary}</p>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </>
  );
}
