import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';
import { blogs } from '@/lib/cms';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = blogs.find(b => b.slug === resolvedParams.slug);
  
  if (!blog) {
    return {
      title: 'Post Not Found | GUIDESOFT IT SOLUTIONS'
    };
  }

  return {
    title: `${blog.title} | GUIDESOFT IT SOLUTIONS`,
    description: blog.excerpt,
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const blog = blogs.find(b => b.slug === resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-text-primary overflow-x-hidden flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center text-sm font-medium text-text-muted hover:text-primary mb-8 transition-colors">
            ← Back to all posts
          </Link>

          <header className="mb-10 text-center">
            <div className="flex justify-center gap-2 mb-6">
              {blog.tags.map(tag => (
                <span key={tag} className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">{tag}</span>
              ))}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight">{blog.title}</h1>
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">{blog.excerpt}</p>
            
            <div className="flex items-center justify-center gap-4 py-6 border-y border-border">
              <img src={blog.author.avatar} alt={blog.author.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="text-left">
                <div className="font-bold text-text-primary">{blog.author.name}</div>
                <div className="text-sm text-text-muted">{blog.publishedAt} · {blog.readTime} read</div>
              </div>
            </div>
          </header>

          <figure className="mb-12 aspect-[16/9] w-full bg-muted rounded-2xl overflow-hidden shadow-lg border border-border">
            <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
          </figure>

          {/* Simple markdown-like content rendering for demo purposes */}
          <div className="prose prose-lg dark:prose-invert prose-primary mx-auto max-w-none">
            {blog.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={index} className="text-3xl font-bold mt-12 mb-6 text-text-primary">{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <ul key={index} className="list-disc pl-6 space-y-2 mb-6 text-text-secondary">
                    {paragraph.split('\n').map((item, i) => (
                      <li key={i}>{item.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={index} className="mb-6 text-text-secondary leading-relaxed">{paragraph}</p>;
            })}
          </div>

          <div className="mt-16 pt-8 border-t border-border flex justify-center">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Share this article</h3>
              <div className="flex gap-4 justify-center">
                <button className="w-10 h-10 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center text-text-secondary hover:text-primary transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center text-text-secondary hover:text-primary transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </button>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
