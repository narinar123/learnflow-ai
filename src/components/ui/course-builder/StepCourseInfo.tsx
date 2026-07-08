'use client';

import React, { useState } from 'react';

interface CourseInfoState {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  thumbnail: string;
  level: string;
  language: string;
  price: number;
  originalPrice: number;
  isFree: boolean;
  hasCertificate: boolean;
  whatYoullLearn: string[];
  requirements: string[];
}

interface StepCourseInfoProps {
  data: CourseInfoState;
  onChange: (data: Partial<CourseInfoState>) => void;
}

const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];
const LANGUAGES = ['English', 'Hindi', 'Tamil', 'Telugu', 'Malayalam', 'Kannada', 'Bengali', 'Marathi'];

export default function StepCourseInfo({ data, onChange }: StepCourseInfoProps) {
  const [newLearnItem, setNewLearnItem] = useState('');
  const [newRequirement, setNewRequirement] = useState('');

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const addToList = (key: 'whatYoullLearn' | 'requirements', val: string) => {
    if (!val.trim()) return;
    onChange({ [key]: [...data[key], val.trim()] });
    if (key === 'whatYoullLearn') setNewLearnItem('');
    else setNewRequirement('');
  };

  const removeFromList = (key: 'whatYoullLearn' | 'requirements', idx: number) => {
    onChange({ [key]: data[key].filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Course Information</h2>
        <p className="text-sm text-muted-foreground">Define the core details, pricing, and learning outcomes for your course.</p>
      </div>

      {/* Thumbnail */}
      <section className="card-base p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Course Thumbnail</h3>
        <div className="flex items-start gap-5">
          {data.thumbnail ? (
            <img src={data.thumbnail} alt="Thumbnail" className="w-40 h-24 object-cover rounded-xl border border-border" />
          ) : (
            <div className="w-40 h-24 rounded-xl border-2 border-dashed border-border bg-muted flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
          )}
          <div className="flex-1 space-y-2">
            <p className="text-xs text-muted-foreground">Upload a 1280×720 image (JPG, PNG, WebP). Max 2MB.</p>
            <div className="flex gap-2">
              <button className="btn-outline text-xs py-2 px-4">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Upload Image
              </button>
              <input
                type="text"
                value={data.thumbnail}
                onChange={(e) => onChange({ thumbnail: e.target.value })}
                placeholder="Or paste image URL..."
                className="input-field py-2 text-xs flex-1"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Info */}
      <section className="card-base p-5 space-y-5">
        <h3 className="text-sm font-semibold text-foreground">Core Details</h3>

        {/* Title */}
        <div>
          <label className="label-text">Course Title <span className="text-danger">*</span></label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => {
              onChange({ title: e.target.value, slug: generateSlug(e.target.value) });
            }}
            placeholder="e.g. React 19 Mastery — From Zero to Production"
            className="input-field"
            maxLength={120}
          />
          <p className="helper-text">{data.title.length}/120 characters</p>
        </div>

        {/* Slug */}
        <div>
          <label className="label-text">URL Slug</label>
          <div className="flex items-center gap-0">
            <span className="inline-flex items-center px-3 h-10 text-xs text-muted-foreground bg-muted border border-border border-r-0 rounded-l-xl">learnflow.ai/courses/</span>
            <input
              type="text"
              value={data.slug}
              onChange={(e) => onChange({ slug: e.target.value })}
              placeholder="course-slug"
              className="input-field rounded-l-none"
            />
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label className="label-text">Short Description <span className="text-danger">*</span></label>
          <textarea
            value={data.shortDescription}
            onChange={(e) => onChange({ shortDescription: e.target.value })}
            placeholder="A brief summary shown in course cards and search results..."
            className="input-field resize-none"
            rows={2}
            maxLength={180}
          />
          <p className="helper-text">{data.shortDescription.length}/180 characters</p>
        </div>

        {/* Full Description */}
        <div>
          <label className="label-text">Full Description</label>
          <textarea
            value={data.description}
            onChange={(e) => onChange({ description: e.target.value })}
            placeholder="Write a detailed description of your course. You can use markdown..."
            className="input-field resize-none"
            rows={6}
          />
          <p className="helper-text">Supports Markdown formatting</p>
        </div>

        {/* Level & Language Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label-text">Difficulty Level</label>
            <select
              value={data.level}
              onChange={(e) => onChange({ level: e.target.value })}
              className="input-field"
            >
              {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="label-text">Language</label>
            <select
              value={data.language}
              onChange={(e) => onChange({ language: e.target.value })}
              className="input-field"
            >
              {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="card-base p-5 space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Pricing</h3>

        {/* Free toggle */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-muted/60">
          <div>
            <p className="text-sm font-medium text-foreground">Free Course</p>
            <p className="text-xs text-muted-foreground mt-0.5">Make this course available at no cost</p>
          </div>
          <button
            onClick={() => onChange({ isFree: !data.isFree })}
            className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${data.isFree ? 'bg-primary' : 'bg-border'}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${data.isFree ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
          </button>
        </div>

        {!data.isFree && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label-text">Price (₹)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
                <input
                  type="number"
                  value={data.price}
                  onChange={(e) => onChange({ price: Number(e.target.value) })}
                  className="input-field pl-7"
                  min={0}
                />
              </div>
            </div>
            <div>
              <label className="label-text">Original Price (₹)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
                <input
                  type="number"
                  value={data.originalPrice}
                  onChange={(e) => onChange({ originalPrice: Number(e.target.value) })}
                  className="input-field pl-7"
                  min={0}
                />
              </div>
            </div>
          </div>
        )}

        {/* Certificate */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-muted/60">
          <div>
            <p className="text-sm font-medium text-foreground">Includes Certificate</p>
            <p className="text-xs text-muted-foreground mt-0.5">Students receive a certificate upon completion</p>
          </div>
          <button
            onClick={() => onChange({ hasCertificate: !data.hasCertificate })}
            className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${data.hasCertificate ? 'bg-primary' : 'bg-border'}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${data.hasCertificate ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
          </button>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="card-base p-5 space-y-4">
        <h3 className="text-sm font-semibold text-foreground">What You'll Learn</h3>
        <p className="text-xs text-muted-foreground">Add the key learning outcomes — shown as bullet points on the course page</p>
        <ul className="space-y-2">
          {data.whatYoullLearn.map((item, i) => (
            <li key={i} className="flex items-center gap-2 group">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00C9A7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="flex-1 text-sm text-foreground">{item}</span>
              <button onClick={() => removeFromList('whatYoullLearn', i)} className="opacity-0 group-hover:opacity-100 btn-ghost p-1 text-danger">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <input
            type="text"
            value={newLearnItem}
            onChange={(e) => setNewLearnItem(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addToList('whatYoullLearn', newLearnItem)}
            placeholder="Add a learning outcome..."
            className="input-field py-2 text-sm flex-1"
          />
          <button onClick={() => addToList('whatYoullLearn', newLearnItem)} className="btn-primary text-xs py-2 px-4">Add</button>
        </div>
      </section>

      {/* Requirements */}
      <section className="card-base p-5 space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Prerequisites</h3>
        <p className="text-xs text-muted-foreground">List any requirements or prior knowledge students need</p>
        <ul className="space-y-2">
          {data.requirements.map((item, i) => (
            <li key={i} className="flex items-center gap-2 group">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground shrink-0" />
              <span className="flex-1 text-sm text-foreground">{item}</span>
              <button onClick={() => removeFromList('requirements', i)} className="opacity-0 group-hover:opacity-100 btn-ghost p-1 text-danger">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <input
            type="text"
            value={newRequirement}
            onChange={(e) => setNewRequirement(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addToList('requirements', newRequirement)}
            placeholder="Add a prerequisite..."
            className="input-field py-2 text-sm flex-1"
          />
          <button onClick={() => addToList('requirements', newRequirement)} className="btn-primary text-xs py-2 px-4">Add</button>
        </div>
      </section>
    </div>
  );
}
