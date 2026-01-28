export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string;
};

// For a real blog you might fetch this from a CMS
// or read markdown files from the filesystem.
export const posts: Post[] = [
  {
    slug: 'fieldwork-lessons',
    title: 'Lessons from the Field',
    date: '2023-06-10',
    summary:
      'A few practical ideas for thriving during long field seasons in remote places.',
    content: `Spending months in the field teaches you to focus on the essentials:
good preparation, adaptability, and respect for the ecosystems and people
you work with.

In this short note I share a handful of small, practical habits that can
dramatically improve both data quality and team morale.`,
  },
  {
    slug: 'communication-for-scientists',
    title: 'Why Scientists Should Communicate More',
    date: '2023-09-02',
    summary:
      'Science communication is not a luxury—it is part of the job description.',
    content: `Sharing our work clearly and honestly helps the public understand why
conservation and long‑term monitoring matter.

You do not need expensive equipment or a large following to start. A blog
post, a classroom visit, or a short thread can already make a difference.`,
  },
  {
    slug: 'career-paths-in-biology',
    title: 'Non‑Linear Careers in Biology',
    date: '2024-02-18',
    summary:
      'Many paths can lead to meaningful work in ecology, conservation, and field biology.',
    content: `Very few careers in biology are truly linear.

Field seasons, short contracts, and interdisciplinary projects often create
unusual CVs—but these experiences can become unique strengths.

In this post I discuss a few examples and share resources for early‑career
biologists considering their next step.`,
  },
];

export function getAllPosts(): Post[] {
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

