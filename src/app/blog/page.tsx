import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';
import { blogs } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Blog | GUIDESOFT IT SOLUTIONS',
  description: 'Insights, tutorials, and news from the GUIDESOFT IT SOLUTIONS team on learning, career growth, and the future of education.',
};

export default function BlogIndexPage() {
  const featuredBlog = blogs[0];
  const otherBlogs = blogs.slice(1);

  return (
    <div className="min-h-screen bg-background text-text-primary overflow-x-hidden flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">GUIDESOFT IT SOLUTIONS Blog</h1>
            <p className="text-lg text-text-secondary">Insights on AI, online learning, and career development.</p>
          </div>

          {featuredBlog && (
            <div className="mb-16">
              <Link href={`/blog/${featuredBlog.slug}`} className="group block">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-3xl bg-card border border-border overflow-hidden hover:border-primary/50 transition-colors shadow-sm hover:shadow-xl hover:shadow-primary/5">
                  <div className="aspect-[4/3] lg:aspect-auto lg:h-full relative bg-muted overflow-hidden">
                    <img src={featuredBlog.coverImage} alt={featuredBlog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-8 lg:p-12">
                    <div className="flex gap-2 mb-4">
                      {featuredBlog.tags.map(tag => (
                        <span key={tag} className="text-xs font-semibold px-2.5 py-1 bg-primary/10 text-primary rounded-full">{tag}</span>
                      ))}
                    </div>
                    <h2 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">{featuredBlog.title}</h2>
                    <p className="text-text-secondary text-lg mb-6 line-clamp-3">{featuredBlog.excerpt}</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
                        {featuredBlog.author.avatar && <img src={featuredBlog.author.avatar} alt={featuredBlog.author.name} className="w-full h-full object-cover" />}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{featuredBlog.author.name}</div>
                        <div className="text-xs text-text-muted">{featuredBlog.publishedAt} · {featuredBlog.readTime} read</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherBlogs.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block h-full">
                <div className="rounded-2xl bg-card border border-border h-full flex flex-col overflow-hidden hover:border-primary/50 transition-colors shadow-sm hover:-translate-y-1">
                  <div className="aspect-[16/9] relative bg-muted overflow-hidden">
                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {post.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-primary">{tag}</span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-text-secondary text-sm mb-6 line-clamp-3 flex-grow">{post.excerpt}</p>
                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border">
                      <div className="w-8 h-8 rounded-full bg-muted overflow-hidden">
                        {post.author.avatar && <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />}
                      </div>
                      <div>
                        <div className="font-semibold text-xs">{post.author.name}</div>
                        <div className="text-[10px] text-text-muted">{post.publishedAt} · {post.readTime} read</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
