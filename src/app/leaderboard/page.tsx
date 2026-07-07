'use client';

import { useState } from 'react';
import { Trophy, Flame, Zap, Award, Search, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { AppLayout } from '@/components/ui/AppLayout';
import { leaderboard } from '@/lib/data';

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState<'weekly' | 'alltime'>('weekly');
  const [searchQuery, setSearchQuery] = useState('');

  // Podium (Ranks 1, 2, 3)
  const podiumUsers = leaderboard.filter(u => u.rank <= 3);
  // Rest of the list (Ranks 4+)
  const listUsers = leaderboard.filter(u => u.rank > 3).filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Separate top podium specifically for positioning: 2nd, 1st, 3rd
  const rank1 = podiumUsers.find(u => u.rank === 1);
  const rank2 = podiumUsers.find(u => u.rank === 2);
  const rank3 = podiumUsers.find(u => u.rank === 3);

  // User rank helper
  const renderRankChange = (change: 'up' | 'down' | 'same', amount: number) => {
    if (change === 'up') {
      return (
        <span className="flex items-center gap-0.5 text-xs font-bold text-emerald-400">
          <ArrowUp size={12} />
          {amount}
        </span>
      );
    }
    if (change === 'down') {
      return (
        <span className="flex items-center gap-0.5 text-xs font-bold text-rose-500">
          <ArrowDown size={12} />
          {amount}
        </span>
      );
    }
    return (
      <span className="flex items-center text-slate-500">
        <Minus size={12} />
      </span>
    );
  };

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] flex items-center gap-2">
              <Trophy className="text-amber-500 fill-amber-500/20" size={28} />
              <span>Leaderboard</span>
            </h1>
            <p className="mt-2 text-[var(--text-secondary)]">
              Compete with global learners. Win weekly badges and bonus XP. Resets every Monday.
            </p>
          </div>

          {/* Timeframe switch */}
          <div className="flex p-1 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] self-start md:self-auto">
            <button
              onClick={() => setTimeframe('weekly')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                timeframe === 'weekly' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Weekly League
            </button>
            <button
              onClick={() => setTimeframe('alltime')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                timeframe === 'alltime' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              All Time Champions
            </button>
          </div>
        </div>

        {/* ─── Podium (Ranks 1, 2, 3) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-6">
          
          {/* Rank 2 (Silver) */}
          {rank2 && (
            <div className="order-2 md:order-1 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 text-center flex flex-col items-center relative hover:scale-[1.02] transition-all">
              <div className="absolute -top-4 w-8 h-8 rounded-full bg-slate-400 border border-slate-300 flex items-center justify-center font-bold text-white text-xs shadow-lg">
                2
              </div>
              <img 
                src={rank2.avatar} 
                alt={rank2.name} 
                className="w-16 h-16 rounded-full object-cover border-2 border-slate-400/50 mb-3"
              />
              <h3 className="text-sm font-bold text-[var(--text-primary)]">{rank2.name}</h3>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">Level {rank2.level}</p>
              
              <div className="flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-slate-400/10 text-slate-300 text-xs font-bold border border-slate-400/20">
                <Zap size={12} className="fill-slate-300" />
                <span>{rank2.xp.toLocaleString()} XP</span>
              </div>
            </div>
          )}

          {/* Rank 1 (Gold - Taller Card) */}
          {rank1 && (
            <div className="order-1 md:order-2 rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-[var(--bg-surface)] p-8 text-center flex flex-col items-center relative hover:scale-[1.03] transition-all shadow-xl shadow-amber-500/5 md:min-h-[250px]">
              <div className="absolute -top-5 w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 border-2 border-yellow-300 flex items-center justify-center font-black text-white text-sm shadow-xl animate-bounce">
                👑
              </div>
              <img 
                src={rank1.avatar} 
                alt={rank1.name} 
                className="w-20 h-20 rounded-full object-cover border-4 border-amber-500/40 mb-3"
              />
              <h3 className="text-base font-extrabold text-[var(--text-primary)]">{rank1.name}</h3>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">Level {rank1.level}</p>
              
              <div className="flex items-center gap-1.5 mt-3 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-sm font-extrabold border border-amber-500/25">
                <Zap size={14} className="fill-amber-400" />
                <span>{rank1.xp.toLocaleString()} XP</span>
              </div>
            </div>
          )}

          {/* Rank 3 (Bronze) */}
          {rank3 && (
            <div className="order-3 md:order-3 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 text-center flex flex-col items-center relative hover:scale-[1.02] transition-all">
              <div className="absolute -top-4 w-8 h-8 rounded-full bg-amber-700 border border-amber-600 flex items-center justify-center font-bold text-white text-xs shadow-lg">
                3
              </div>
              <img 
                src={rank3.avatar} 
                alt={rank3.name} 
                className="w-16 h-16 rounded-full object-cover border-2 border-amber-700/50 mb-3"
              />
              <h3 className="text-sm font-bold text-[var(--text-primary)]">{rank3.name}</h3>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">Level {rank3.level}</p>
              
              <div className="flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-amber-700/10 text-amber-600 text-xs font-bold border border-amber-700/20">
                <Zap size={12} className="fill-amber-600" />
                <span>{rank3.xp.toLocaleString()} XP</span>
              </div>
            </div>
          )}

        </div>

        {/* Search bar & list */}
        <div className="space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={16} />
            <input
              type="text"
              placeholder="Search competitor name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
          </div>

          {/* Table list */}
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[var(--bg-surface-2)] text-xs text-[var(--text-secondary)] border-b border-[var(--border-color)] font-bold">
                    <th className="px-6 py-4 text-center w-16">Rank</th>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4 text-center w-24">Change</th>
                    <th className="px-6 py-4 text-center w-24">Streak</th>
                    <th className="px-6 py-4 text-center w-28">Completed</th>
                    <th className="px-6 py-4 text-right pr-8">Total XP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)] text-sm">
                  {listUsers.map((user) => {
                    const isSelf = user.userId === 'usr_demo';
                    return (
                      <tr 
                        key={user.userId} 
                        className={`hover:bg-[var(--bg-surface-2)]/30 transition-colors ${
                          isSelf ? 'bg-indigo-600/10 hover:bg-indigo-600/15' : ''
                        }`}
                      >
                        {/* Rank */}
                        <td className="px-6 py-4 text-center font-bold">
                          {isSelf ? (
                            <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-bold text-xs">
                              {user.rank}
                            </span>
                          ) : (
                            <span className="text-[var(--text-secondary)]">{user.rank}</span>
                          )}
                        </td>

                        {/* Name/Avatar */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={user.avatar} 
                              alt={user.name} 
                              className="w-8 h-8 rounded-full object-cover border border-[var(--border-color)]"
                            />
                            <div>
                              <div className="font-semibold text-[var(--text-primary)]">
                                {user.name} {isSelf && <span className="text-xs font-semibold text-indigo-400 ml-1">(You)</span>}
                              </div>
                              <div className="text-[10px] text-[var(--text-secondary)]">Level {user.level}</div>
                            </div>
                          </div>
                        </td>

                        {/* Change */}
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center">
                            {renderRankChange(user.change, user.changeAmount)}
                          </div>
                        </td>

                        {/* Streak */}
                        <td className="px-6 py-4 text-center font-bold text-[var(--text-primary)]">
                          <div className="flex items-center justify-center gap-1">
                            <Flame size={14} className="text-amber-500 fill-amber-500/20" />
                            <span>{user.streak}d</span>
                          </div>
                        </td>

                        {/* Completed Courses */}
                        <td className="px-6 py-4 text-center text-[var(--text-secondary)] font-medium">
                          {user.coursesCompleted} courses
                        </td>

                        {/* XP */}
                        <td className="px-6 py-4 text-right pr-8 font-mono font-bold text-indigo-400">
                          {user.xp.toLocaleString()} XP
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
