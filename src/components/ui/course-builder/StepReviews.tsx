'use client';

import React, { useState } from 'react';
import { type Review } from '@/lib/course-data';

interface StepReviewsProps {
  reviews: Review[];
  onChange: (reviews: Review[]) => void;
}

export default function StepReviews({ reviews, onChange }: StepReviewsProps) {
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<Review['status'] | 'all'>('all');
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});

  const approvedReviews = reviews.filter(r => r.status === 'approved');
  const avgRating = approvedReviews.length > 0
    ? Number((approvedReviews.reduce((acc, r) => acc + r.rating, 0) / approvedReviews.length).toFixed(1))
    : 0;

  const countByRating = (rating: number) => reviews.filter(r => r.rating === rating).length;

  const filteredReviews = reviews.filter(r => {
    const matchRating = filterRating === 'all' || r.rating === filterRating;
    const matchStatus = filterStatus === 'all' || r.status === filterStatus;
    return matchRating && matchStatus;
  });

  const updateStatus = (id: string, status: Review['status']) => {
    onChange(reviews.map(r => r.id === id ? { ...r, status } : r));
  };

  const handleReplySubmit = (id: string) => {
    const text = replyTexts[id];
    if (!text || !text.trim()) return;
    onChange(reviews.map(r => r.id === id ? { ...r, instructorResponse: text.trim() } : r));
    setReplyTexts(prev => ({ ...prev, [id]: '' }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Reviews & Feedback Moderation</h2>
        <p className="text-sm text-muted-foreground">Monitor course rating distributions, approve reviews, and publish instructor responses.</p>
      </div>

      {/* Overview Analytics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Rating Value Card */}
        <div className="card-base p-5 flex flex-col justify-center items-center text-center">
          <p className="text-4xl font-extrabold text-foreground">{avgRating || '—'}</p>
          <div className="flex items-center gap-0.5 mt-2 text-warning">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} className="text-sm">
                {s <= Math.round(avgRating) ? '★' : '☆'}
              </span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">{approvedReviews.length} approved ratings</p>
        </div>

        {/* Rating Breakdown Graph */}
        <div className="card-base p-4 md:col-span-2 space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = countByRating(rating);
            const pct = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
            return (
              <div key={rating} className="flex items-center gap-3 text-xs">
                <span className="w-10 text-muted-foreground text-right">{rating} star</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-warning rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-8 text-muted-foreground text-right font-medium">{pct}%</span>
                <span className="w-8 text-muted-foreground text-right font-medium">({count})</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Moderation Controls Filter */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-card border border-border">
        <div className="flex items-center gap-3 flex-wrap">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="input-field py-1 px-3 text-xs w-36 bg-muted/50 border-none"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="flagged">Flagged</option>
          </select>

          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="input-field py-1 px-3 text-xs w-36 bg-muted/50 border-none"
          >
            <option value="all">All Ratings</option>
            {[5, 4, 3, 2, 1].map(r => (
              <option key={r} value={r}>{r} Stars</option>
            ))}
          </select>
        </div>

        <span className="text-xs text-muted-foreground">Showing {filteredReviews.length} reviews</span>
      </div>

      {/* Reviews List */}
      {filteredReviews.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-sm">No reviews matching the criteria.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((rev) => (
            <div key={rev.id} className="card-base p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <img src={rev.studentAvatar} alt={rev.studentName} className="w-10 h-10 rounded-full border border-border object-cover" />
                  <div>
                    <p className="text-xs font-bold text-foreground">{rev.studentName}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="flex text-warning text-xs">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i}>{i < rev.rating ? '★' : '☆'}</span>
                        ))}
                      </div>
                      <span className="text-[10px] text-muted-foreground">{rev.createdAt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {rev.status === 'pending' && (
                    <>
                      <button onClick={() => updateStatus(rev.id, 'approved')} className="btn-primary text-[10px] py-1 px-3 bg-positive hover:bg-positive/90">Approve</button>
                      <button onClick={() => updateStatus(rev.id, 'flagged')} className="btn-outline text-[10px] py-1 px-3 border-danger/30 text-danger hover:bg-danger/5">Flag</button>
                    </>
                  )}
                  {rev.status === 'approved' && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-positive/10 text-positive border border-positive/20 font-bold uppercase tracking-wider">Approved</span>
                  )}
                  {rev.status === 'flagged' && (
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-danger/10 text-danger border border-danger/20 font-bold uppercase tracking-wider">Flagged</span>
                      <button onClick={() => updateStatus(rev.id, 'approved')} className="btn-ghost text-[10px] py-1 px-2">Approve</button>
                    </div>
                  )}
                </div>
              </div>

              {/* Review Text */}
              <div className="pl-13 space-y-1">
                {rev.title && <p className="text-sm font-semibold text-foreground">{rev.title}</p>}
                <p className="text-xs text-muted-foreground leading-relaxed">{rev.body}</p>
              </div>

              {/* Reply Section */}
              <div className="pl-13 space-y-3">
                {rev.instructorResponse ? (
                  <div className="p-3 rounded-xl bg-muted/40 border border-border text-xs space-y-1">
                    <p className="font-bold text-primary">Instructor Response:</p>
                    <p className="text-muted-foreground leading-relaxed">{rev.instructorResponse}</p>
                  </div>
                ) : (
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Type official instructor response..."
                      value={replyTexts[rev.id] || ''}
                      onChange={(e) => setReplyTexts({ ...replyTexts, [rev.id]: e.target.value })}
                      onKeyDown={(e) => e.key === 'Enter' && handleReplySubmit(rev.id)}
                      className="input-field py-1.5 text-xs flex-1 bg-muted/30 border-none"
                    />
                    <button onClick={() => handleReplySubmit(rev.id)} className="btn-primary text-xs py-1.5 px-4 shrink-0">Reply</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
