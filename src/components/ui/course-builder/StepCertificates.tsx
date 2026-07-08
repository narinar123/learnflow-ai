'use client';

import React, { useState } from 'react';
import { type Certificate, type CertificateTemplate, type CertificateField } from '@/lib/course-data';

interface StepCertificatesProps {
  certificates: Certificate[];
  onChange: (certificates: Certificate[]) => void;
  exams: { id: string; title: string }[];
}

const templates: { id: CertificateTemplate; label: string; desc: string; previewColor: string }[] = [
  { id: 'classic', label: 'Classic Scroll', desc: 'Traditional border style with calligraphic titles', previewColor: 'from-[#FAF6E9] to-[#EAE0C8] border-[#8C6D3B]' },
  { id: 'modern', label: 'Tech Modern', desc: 'Sleek borders, clean layout, perfect for technical courses', previewColor: 'from-slate-900 to-indigo-950 border-primary/30' },
  { id: 'minimal', label: 'Studio Minimalist', desc: 'Lots of whitespace, fine lines, elegant typography', previewColor: 'from-white to-neutral-50 border-neutral-200' },
  { id: 'premium', label: 'Executive Gold', desc: 'Gilded gold patterns with formal layout structure', previewColor: 'from-amber-950 to-neutral-900 border-amber-500/40' },
];

export default function StepCertificates({
  certificates,
  onChange,
  exams,
}: StepCertificatesProps) {
  const [selectedCertIndex, setSelectedCertIndex] = useState(0);

  const currentCert = certificates[selectedCertIndex] || {
    id: 'cert_new',
    courseId: 'current',
    title: 'Certificate of Completion',
    template: 'modern',
    fields: [
      { key: 'studentName', label: 'Student Name', value: '{{student.name}}', editable: false },
      { key: 'courseName', label: 'Course Name', value: 'Course Title', editable: true },
      { key: 'instructorName', label: 'Instructor Signature', value: 'Instructor Name', editable: true },
      { key: 'completionDate', label: 'Date', value: '{{completion.date}}', editable: false },
    ],
    autoIssueOnCompletionPercent: 100,
    autoIssueOnExamPass: false,
    includeInstructor: true,
    includeDate: true,
    includeVerificationCode: true,
    createdAt: new Date().toISOString().split('T')[0],
  };

  const updateCert = (fields: Partial<Certificate>) => {
    const updated = { ...currentCert, ...fields } as Certificate;
    if (certificates.length === 0) {
      onChange([updated]);
    } else {
      onChange(certificates.map((c, idx) => (idx === selectedCertIndex ? updated : c)));
    }
  };

  const updateField = (key: string, value: string) => {
    const fields = currentCert.fields.map((f: CertificateField) =>
      f.key === key ? { ...f, value } : f
    );
    updateCert({ fields });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Verify Certifications</h2>
        <p className="text-sm text-muted-foreground">Design completion certificates, configure mapping fields, and auto-issue conditions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Config Panel */}
        <div className="lg:col-span-1 space-y-5">
          {/* Templates selection */}
          <section className="card-base p-4 space-y-3">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Select Style</h3>
            <div className="space-y-2">
              {templates.map((tpl) => {
                const isSelected = currentCert.template === tpl.id;
                return (
                  <button
                    key={tpl.id}
                    onClick={() => updateCert({ template: tpl.id })}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                      isSelected ? 'border-primary bg-primary/5 shadow-sm' : 'border-border bg-card hover:bg-muted/40'
                    }`}
                  >
                    <div>
                      <p className={`text-xs font-bold ${isSelected ? 'text-primary' : 'text-foreground'}`}>{tpl.label}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{tpl.desc}</p>
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Issue Rules */}
          <section className="card-base p-4 space-y-4">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Auto-Issue Rules</h3>

            {/* Threshold percent */}
            <div>
              <label className="label-text text-xs">Require Syllabus Completion (%)</label>
              <input
                type="number"
                value={currentCert.autoIssueOnCompletionPercent || 100}
                onChange={(e) => updateCert({ autoIssueOnCompletionPercent: Number(e.target.value) })}
                className="input-field py-1.5 text-xs"
                min={0}
                max={100}
              />
            </div>

            {/* Exam pass requirement */}
            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-2 text-xs font-medium text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentCert.autoIssueOnExamPass || false}
                  onChange={(e) => updateCert({ autoIssueOnExamPass: e.target.checked })}
                  className="w-4 h-4 accent-primary"
                />
                Require Exam Pass
              </label>

              {currentCert.autoIssueOnExamPass && (
                <div>
                  <label className="label-text text-[10px] text-muted-foreground">Select Exam</label>
                  <select
                    value={currentCert.examId || ''}
                    onChange={(e) => updateCert({ examId: e.target.value })}
                    className="input-field py-1 text-xs"
                  >
                    <option value="">-- Choose Exam --</option>
                    {exams.map((ex) => (
                      <option key={ex.id} value={ex.id}>{ex.title}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </section>

          {/* Certificate fields */}
          <section className="card-base p-4 space-y-3">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Dynamic Fields</h3>
            {currentCert.fields.map((f: CertificateField) => {
              if (!f.editable) return null;
              return (
                <div key={f.key}>
                  <label className="label-text text-xs">{f.label}</label>
                  <input
                    type="text"
                    value={f.value}
                    onChange={(e) => updateField(f.key, e.target.value)}
                    className="input-field py-1.5 text-xs"
                  />
                </div>
              );
            })}
          </section>
        </div>

        {/* Right Canvas Preview */}
        <div className="lg:col-span-2 flex flex-col justify-center">
          <div className="text-center mb-2">
            <span className="text-xs text-muted-foreground">Certificate Preview Canvas (Simulated)</span>
          </div>

          {/* Certificate Frame */}
          <div className={`aspect-[1.414/1] w-full rounded-2xl border-4 bg-gradient-to-br p-8 flex flex-col justify-between items-center text-center shadow-lg overflow-hidden ${
            currentCert.template === 'classic' ? 'from-[#FAF6E9] to-[#EAE0C8] border-[#8C6D3B] text-neutral-800' :
            currentCert.template === 'minimal' ? 'from-white to-neutral-50 border-neutral-200 text-neutral-900' :
            currentCert.template === 'premium' ? 'from-amber-950 to-neutral-900 border-amber-500/40 text-amber-100/90' :
            'from-slate-900 to-indigo-950 border-indigo-500/30 text-white' // default modern
          }`}>
            {/* Top Logo */}
            <div className="text-xs font-extrabold tracking-widest uppercase opacity-75">
              GUIDESOFT IT SOLUTIONS Certified Academy
            </div>

            {/* Main title */}
            <div className="space-y-2 mt-4">
              <p className="text-[10px] tracking-widest uppercase font-semibold opacity-60">This certifies that</p>
              <h4 className="text-xl sm:text-2xl font-serif font-bold tracking-wide py-1 text-primary-400">
                [Student Name]
              </h4>
              <p className="text-xs max-w-sm mx-auto leading-relaxed opacity-80">
                has successfully fulfilled all academic curriculum specifications and certification thresholds for
              </p>
              <h5 className="text-sm sm:text-base font-bold tracking-tight">
                {currentCert.fields.find((f: CertificateField) => f.key === 'courseName')?.value || '[Course Title]'}
              </h5>
            </div>

            {/* Bottom Signature / ID row */}
            <div className="w-full flex justify-between items-end mt-8 border-t border-current/10 pt-4 text-[10px] opacity-80">
              <div className="text-left space-y-1">
                <p className="font-serif italic font-bold">
                  {currentCert.fields.find((f: CertificateField) => f.key === 'instructorName')?.value || '[Instructor]'}
                </p>
                <p className="text-[8px] uppercase tracking-wider font-semibold opacity-60">Verified Instructor</p>
              </div>

              {currentCert.includeVerificationCode && (
                <div className="text-center space-y-1 bg-current/5 px-2.5 py-1 rounded">
                  <p className="font-mono text-[8px] tracking-widest">CRED-LF-{currentCert.id.slice(5).toUpperCase()}</p>
                  <p className="text-[8px] uppercase tracking-wider opacity-60">Verification Code</p>
                </div>
              )}

              <div className="text-right space-y-1">
                <p className="font-medium">July 07, 2026</p>
                <p className="text-[8px] uppercase tracking-wider opacity-60">Issue Date</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
