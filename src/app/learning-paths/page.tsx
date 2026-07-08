// @ts-nocheck
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';
import { learningPaths } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Learning Paths | GUIDESOFT IT SOLUTIONS',
  description: 'Curated curriculum sequences designed to take you from beginner to job-ready in your chosen tech career.',
};

export default function LearningPathsPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary overflow-x-hidden flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Don't just learn a skill.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">Master a career.</span>
          </h1>
          <p className="text-lg text-text-secondary">
            Our Learning Paths are curated sequences of courses designed by industry experts. Follow a structured path from fundamentals to advanced concepts and build a portfolio along the way.
          </p>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {learningPaths.map((path) => (
              <Link key={path.id} href={`/learning-paths/${path.id}`} className="group block h-full">
                <div className="rounded-3xl bg-card border border-border p-6 h-full flex flex-col hover:border-primary/50 transition-colors shadow-sm hover:shadow-xl hover:shadow-primary/5">
                  <div className="mb-6 flex justify-between items-start">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{path.title}</h3>
                    <span className="px-3 py-1 bg-muted text-xs font-semibold rounded-full">{path.duration}</span>
                  </div>
                  <p className="text-text-secondary text-sm mb-6 flex-grow">{path.description}</p>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="text-xs text-text-muted mb-2 font-medium uppercase tracking-wider">Courses included:</div>
                      <ul className="space-y-2">
                        {path.courses.slice(0, 3).map((courseId, idx) => (
                          <li key={idx} className="text-sm font-medium flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {/* In a real app we'd fetch the course title from the ID */}
                            Course Reference {courseId}
                          </li>
                        ))}
                        {path.courses.length > 3 && (
                          <li className="text-xs text-text-muted italic ml-3.5">
                            + {path.courses.length - 3} more courses
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border mt-auto flex justify-between items-center text-sm font-semibold">
                    <span className="text-primary group-hover:underline">Explore Path</span>
                    <span>→</span>
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
