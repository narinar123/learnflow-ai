'use client';

import React, { useState } from 'react';
import { categories, skills, type Category, type Skill } from '@/lib/course-data';

interface StepCategoriesProps {
  selectedCategoryId: string;
  selectedSkillIds: string[];
  onCategoryChange: (id: string) => void;
  onSkillsChange: (ids: string[]) => void;
}

export default function StepCategories({
  selectedCategoryId,
  selectedSkillIds,
  onCategoryChange,
  onSkillsChange,
}: StepCategoriesProps) {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [skillSearch, setSkillSearch] = useState('');

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId);
  const categorySkills = skills.filter((s) => s.categoryId === selectedCategoryId);
  const filteredSkills = categorySkills.filter((s) =>
    s.name.toLowerCase().includes(skillSearch.toLowerCase())
  );

  const toggleSkill = (skillId: string) => {
    if (selectedSkillIds.includes(skillId)) {
      onSkillsChange(selectedSkillIds.filter((id) => id !== skillId));
    } else {
      onSkillsChange([...selectedSkillIds, skillId]);
    }
  };

  const proficiencyColors: Record<string, string> = {
    Beginner: 'bg-positive/10 text-positive border-positive/20',
    Intermediate: 'bg-primary/10 text-primary border-primary/20',
    Advanced: 'bg-warning/10 text-warning border-warning/20',
    Expert: 'bg-danger/10 text-danger border-danger/20',
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Categories & Skills</h2>
        <p className="text-sm text-muted-foreground">Select the primary category for your course and tag the skills students will gain.</p>
      </div>

      {/* Category Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Select Category</h3>
          <button
            onClick={() => setShowAddCategory(!showAddCategory)}
            className="btn-ghost text-xs py-1.5 px-3"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Category
          </button>
        </div>

        {/* Add Category Form */}
        {showAddCategory && (
          <div className="mb-4 p-4 rounded-xl border border-border bg-muted/40 flex items-center gap-3">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Category name..."
              className="input-field flex-1 py-2"
            />
            <button className="btn-primary text-xs py-2 px-4">Create</button>
            <button onClick={() => setShowAddCategory(false)} className="btn-ghost text-xs py-2 px-3">Cancel</button>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((cat) => {
            const isSelected = selectedCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => { onCategoryChange(cat.id); onSkillsChange([]); }}
                className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 card-hover
                  ${isSelected
                    ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                    : 'border-border bg-card hover:border-primary/40'
                  }`}
              >
                {isSelected && (
                  <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                )}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3"
                  style={{ background: `${cat.color}18` }}
                >
                  {cat.icon}
                </div>
                <p className={`text-sm font-semibold leading-tight ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                  {cat.name}
                </p>
                <p className="text-[10px] text-muted-foreground mt-1">{cat.courseCount} courses</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Skills Section */}
      {selectedCategory && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Skills</h3>
              <p className="text-xs text-muted-foreground mt-0.5">in <span className="text-primary font-medium">{selectedCategory.name}</span> — select all that apply</p>
            </div>
            <div className="relative">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                placeholder="Search skills..."
                className="input-field pl-8 py-2 text-xs w-48"
              />
            </div>
          </div>

          {filteredSkills.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground text-sm">
              No skills found in this category.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredSkills.map((skill) => {
                const isSelected = selectedSkillIds.includes(skill.id);
                return (
                  <div
                    key={skill.id}
                    onClick={() => toggleSkill(skill.id)}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-150
                      ${isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-card hover:border-primary/30'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all
                          ${isSelected ? 'bg-primary border-primary' : 'border-border'}`}
                      >
                        {isSelected && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-foreground">{skill.name}</p>
                          {skill.trending && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-warning/10 text-warning font-medium">🔥 Trending</span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{skill.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 ml-4 shrink-0">
                      {skill.proficiencyLevels.map((level) => (
                        <span
                          key={level}
                          className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${proficiencyColors[level]}`}
                        >
                          {level}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Selected Summary */}
          {selectedSkillIds.length > 0 && (
            <div className="mt-4 p-3 rounded-xl bg-positive/5 border border-positive/20 flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00C9A7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-xs font-medium text-positive">
                {selectedSkillIds.length} skill{selectedSkillIds.length > 1 ? 's' : ''} selected
              </span>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
