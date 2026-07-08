'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Building2, 
  LayoutDashboard, 
  Users, 
  Network, 
  BookOpen, 
  GraduationCap, 
  UserPlus, 
  CheckSquare, 
  Calendar, 
  Award, 
  CreditCard, 
  Banknote, 
  MessagesSquare, 
  BarChart3, 
  FileText, 
  Settings 
} from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

const navigation = [
  { name: 'Dashboard', href: '/institution/dashboard', icon: LayoutDashboard },
  { name: 'Institution Profile', href: '/institution/profile', icon: Building2 },
  { name: 'Branches', href: '/institution/branches', icon: Network },
  { name: 'Departments', href: '/institution/departments', icon: Users },
  { name: 'Programs', href: '/institution/programs', icon: GraduationCap },
  { name: 'Courses', href: '/institution/courses', icon: BookOpen },
  { name: 'Admissions', href: '/institution/admissions', icon: UserPlus },
  { name: 'Enrollments', href: '/institution/enrollments', icon: UserPlus },
  { name: 'Attendance', href: '/institution/attendance', icon: CheckSquare },
  { name: 'Timetable', href: '/institution/timetable', icon: Calendar },
  { name: 'Students', href: '/institution/students', icon: Users },
  { name: 'Faculty', href: '/institution/faculty', icon: Users },
  { name: 'Certificates', href: '/institution/certificates', icon: Award },
  { name: 'Billing', href: '/institution/billing', icon: CreditCard },
  { name: 'Payments', href: '/institution/payments', icon: Banknote },
  { name: 'CRM', href: '/institution/crm', icon: MessagesSquare },
  { name: 'Analytics', href: '/institution/analytics', icon: BarChart3 },
  { name: 'Reports', href: '/institution/reports', icon: FileText },
  { name: 'Settings', href: '/institution/settings', icon: Settings },
];

export function InstitutionSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900/50 backdrop-blur-xl border-r border-white/10 px-6 pb-4 pt-6">
      <div className="flex h-16 shrink-0 items-center gap-x-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
          <Building2 className="h-6 w-6 text-white" />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          EduAI Admin
        </span>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={clsx(
                        isActive
                          ? 'bg-indigo-500/10 text-indigo-400'
                          : 'text-gray-400 hover:text-white hover:bg-white/5',
                        'group flex gap-x-3 rounded-lg p-2.5 text-sm leading-6 font-semibold transition-all duration-200 relative overflow-hidden'
                      )}
                    >
                      {isActive && (
                        <motion.div 
                          layoutId="sidebar-active" 
                          className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent border-l-2 border-indigo-500" 
                        />
                      )}
                      <item.icon
                        className={clsx(
                          isActive ? 'text-indigo-400' : 'text-gray-500 group-hover:text-gray-300',
                          'h-5 w-5 shrink-0 transition-colors z-10'
                        )}
                        aria-hidden="true"
                      />
                      <span className="z-10">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
