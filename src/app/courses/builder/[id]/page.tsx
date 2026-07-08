'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/ui/AppLayout';
import BuilderSidebarComponent from '@/components/ui/course-builder/BuilderSidebar';
import StepCategories from '@/components/ui/course-builder/StepCategories';
import StepCourseInfo from '@/components/ui/course-builder/StepCourseInfo';
import StepCurriculum from '@/components/ui/course-builder/StepCurriculum';
import StepResources from '@/components/ui/course-builder/StepResources';
import StepAssignments from '@/components/ui/course-builder/StepAssignments';
import StepLabs from '@/components/ui/course-builder/StepLabs';
import StepAssessments from '@/components/ui/course-builder/StepAssessments';
import StepCertificates from '@/components/ui/course-builder/StepCertificates';
import StepReviews from '@/components/ui/course-builder/StepReviews';
import {
  type CourseBuilderState,
  managedCourses,
  sampleModules,
  sampleResources,
  sampleAssignments,
  sampleProjects,
  sampleLabs,
  sampleQuizzes,
  sampleExams,
  sampleCertificates,
  sampleReviews,
} from '@/lib/course-data';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CourseBuilderPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);

  const [state, setState] = useState<CourseBuilderState>({
    courseId: id,
    currentStep: 1,
    completedSteps: [],
    courseInfo: {
      title: '',
      slug: '',
      shortDescription: '',
      description: '',
      thumbnail: '',
      categoryId: '',
      skillIds: [],
      level: 'Intermediate',
      language: 'English',
      price: 0,
      originalPrice: 0,
      isFree: false,
      hasCertificate: true,
      whatYoullLearn: [],
      requirements: [],
    },
    modules: [],
    resources: [],
    assignments: [],
    projects: [],
    labs: [],
    quizzes: [],
    exams: [],
    certificates: [],
  });

  const [lastSaved, setLastSaved] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // Initialize builder state with mock or blank data
  useEffect(() => {
    if (id === 'new') {
      setState((prev) => ({
        ...prev,
        courseInfo: {
          ...prev.courseInfo,
          title: 'New Enterprise Course Draft',
          slug: 'new-enterprise-course-draft',
          thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop',
        },
        modules: [],
        resources: [],
        assignments: [],
        projects: [],
        labs: [],
        quizzes: [],
        exams: [],
        certificates: [],
      }));
    } else {
      // Mock lookup from ID
      const existing = managedCourses.find((c) => c.id === id);
      if (existing) {
        setState((prev) => ({
          ...prev,
          courseInfo: {
            title: existing.title,
            slug: existing.slug,
            shortDescription: 'Deep dive technical training for enterprise applications.',
            description: 'This is a comprehensive course tailored for enterprise software development.',
            thumbnail: existing.thumbnail,
            categoryId: existing.categoryId,
            skillIds: existing.skills,
            level: existing.level,
            language: 'English',
            price: 4999,
            originalPrice: 9999,
            isFree: false,
            hasCertificate: true,
            whatYoullLearn: ['Apply advanced architectures', 'Optimize web applications for performance', 'Configure reliable CI/CD pipelines'],
            requirements: ['Prior programming experience', 'Basic understanding of tools'],
          },
          modules: sampleModules,
          resources: sampleResources,
          assignments: sampleAssignments,
          projects: sampleProjects,
          labs: sampleLabs,
          quizzes: sampleQuizzes,
          exams: sampleExams,
          certificates: sampleCertificates,
        }));
      }
    }
    setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    setLoading(false);
  }, [id]);

  const handleStepClick = (step: number) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  };

  const markStepComplete = (stepId: number) => {
    if (!state.completedSteps.includes(stepId)) {
      setState((prev) => ({
        ...prev,
        completedSteps: [...prev.completedSteps, stepId],
      }));
    }
  };

  const nextStep = () => {
    markStepComplete(state.currentStep);
    if (state.currentStep < 9) {
      setState((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
    }
    setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  };

  const prevStep = () => {
    if (state.currentStep > 1) {
      setState((prev) => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  };

  const handlePublish = () => {
    alert('Congratulations! Your enterprise course has been submitted for verification.');
    router.push('/courses/manage');
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-[calc(100vh-160px)]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary" />
        </div>
      </AppLayout>
    );
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Builder left navigation */}
      <BuilderSidebarComponent
        currentStep={state.currentStep}
        completedSteps={state.completedSteps}
        onStepClick={handleStepClick}
        courseTitle={state.courseInfo.title}
        lastSaved={lastSaved}
        onPublish={handlePublish}
      />

      {/* Main Form area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 px-6 border-b border-border flex items-center justify-between bg-card shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push('/courses/manage')}
              className="btn-ghost p-1.5 text-muted-foreground hover:text-foreground shrink-0"
              aria-label="Back to dashboard"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Enterprise Course Builder</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Draft Mode
            </span>
          </div>
        </header>

        {/* Content body */}
        <main className="flex-1 overflow-y-auto scrollbar-thin p-8 max-w-4xl w-full mx-auto">
          {state.currentStep === 1 && (
            <StepCategories
              selectedCategoryId={state.courseInfo.categoryId}
              selectedSkillIds={state.courseInfo.skillIds}
              onCategoryChange={(catId) => setState((prev) => ({ ...prev, courseInfo: { ...prev.courseInfo, categoryId: catId } }))}
              onSkillsChange={(skillIds) => setState((prev) => ({ ...prev, courseInfo: { ...prev.courseInfo, skillIds } }))}
            />
          )}

          {state.currentStep === 2 && (
            <StepCourseInfo
              data={state.courseInfo}
              onChange={(data) => setState((prev) => ({ ...prev, courseInfo: { ...prev.courseInfo, ...data } }))}
            />
          )}

          {state.currentStep === 3 && (
            <StepCurriculum
              modules={state.modules}
              onChange={(modules) => setState((prev) => ({ ...prev, modules }))}
            />
          )}

          {state.currentStep === 4 && (
            <StepResources
              resources={state.resources}
              onChange={(resources) => setState((prev) => ({ ...prev, resources }))}
            />
          )}

          {state.currentStep === 5 && (
            <StepAssignments
              assignments={state.assignments}
              projects={state.projects}
              onAssignmentsChange={(assignments) => setState((prev) => ({ ...prev, assignments }))}
              onProjectsChange={(projects) => setState((prev) => ({ ...prev, projects }))}
            />
          )}

          {state.currentStep === 6 && (
            <StepLabs
              labs={state.labs}
              onChange={(labs) => setState((prev) => ({ ...prev, labs }))}
            />
          )}

          {state.currentStep === 7 && (
            <StepAssessments
              quizzes={state.quizzes}
              exams={state.exams}
              onQuizzesChange={(quizzes) => setState((prev) => ({ ...prev, quizzes }))}
              onExamsChange={(exams) => setState((prev) => ({ ...prev, exams }))}
            />
          )}

          {state.currentStep === 8 && (
            <StepCertificates
              certificates={state.certificates}
              onChange={(certificates) => setState((prev) => ({ ...prev, certificates }))}
              exams={state.exams.map((e) => ({ id: e.id, title: e.title }))}
            />
          )}

          {state.currentStep === 9 && (
            <StepReviews
              reviews={sampleReviews}
              onChange={() => {}}
            />
          )}

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t border-border/80">
            <button
              onClick={prevStep}
              disabled={state.currentStep === 1}
              className="btn-outline text-xs px-5 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous Step
            </button>
            <button
              onClick={state.currentStep === 9 ? handlePublish : nextStep}
              className="btn-primary text-xs px-5 py-2.5"
            >
              {state.currentStep === 9 ? 'Publish Course' : 'Next Step'}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
