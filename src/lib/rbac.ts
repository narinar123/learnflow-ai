// ============================================================
// RBAC — Role-Based Access Control
// GUIDESOFT IT SOLUTIONS · Enterprise Admin Panel
// ============================================================

export const ROLES = [
  'super_admin',
  'admin',
  'content_manager',
  'support_agent',
  'finance_manager',
  'analyst',
] as const;

export type Role = (typeof ROLES)[number];

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: 'Super Admin',
  admin: 'Admin',
  content_manager: 'Content Manager',
  support_agent: 'Support Agent',
  finance_manager: 'Finance Manager',
  analyst: 'Analyst',
};

export const ROLE_COLORS: Record<Role, string> = {
  super_admin: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  admin: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  content_manager: 'bg-teal-500/15 text-teal-400 border-teal-500/30',
  support_agent: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  finance_manager: 'bg-green-500/15 text-green-400 border-green-500/30',
  analyst: 'bg-pink-500/15 text-pink-400 border-pink-500/30',
};

export const ROLE_DESCRIPTIONS: Record<Role, string> = {
  super_admin: 'Full unrestricted access to all platform features and settings.',
  admin: 'Manage users, courses, and basic platform configuration.',
  content_manager: 'Create and manage courses, media, CMS, and AI content.',
  support_agent: 'View user profiles, logs, and handle support tickets.',
  finance_manager: 'Manage payments, revenue, invoices, and financial reports.',
  analyst: 'Read-only access to dashboards, analytics, and logs.',
};

// ─── Permission Definitions ───────────────────────────────────────────────────

export const PERMISSION_GROUPS = {
  Dashboard: ['dashboard:read', 'dashboard:export'],
  Users: ['users:read', 'users:write', 'users:delete', 'users:impersonate'],
  Roles: ['roles:read', 'roles:write', 'roles:delete'],
  Permissions: ['permissions:read', 'permissions:write'],
  Courses: ['courses:read', 'courses:write', 'courses:delete', 'courses:publish'],
  Categories: ['categories:read', 'categories:write'],
  Lessons: ['lessons:read', 'lessons:write', 'lessons:delete'],
  Modules: ['modules:read', 'modules:write'],
  Quizzes: ['quizzes:read', 'quizzes:write', 'quizzes:delete'],
  Certificates: ['certificates:read', 'certificates:write', 'certificates:issue'],
  Membership: ['membership:read', 'membership:write', 'membership:delete'],
  Coupons: ['coupons:read', 'coupons:write', 'coupons:delete'],
  Payments: ['payments:read', 'payments:refund'],
  Revenue: ['revenue:read', 'revenue:export'],
  Invoices: ['invoices:read', 'invoices:write'],
  CMS: ['cms:read', 'cms:write', 'cms:publish'],
  Marketing: ['marketing:read', 'marketing:write', 'marketing:send'],
  Media: ['media:read', 'media:write', 'media:delete'],
  AI: ['ai:read', 'ai:write', 'ai:manage_models'],
  Prompts: ['prompts:read', 'prompts:write', 'prompts:delete'],
  'Knowledge Base': ['knowledge_base:read', 'knowledge_base:write'],
  'Audit Logs': ['audit_logs:read', 'audit_logs:export'],
  'Activity Logs': ['activity_logs:read'],
  Integrations: ['integrations:read', 'integrations:write'],
  'API Keys': ['api_keys:read', 'api_keys:write', 'api_keys:delete'],
  Settings: ['settings:read', 'settings:write'],
} as const;

export type Permission = (typeof PERMISSION_GROUPS)[keyof typeof PERMISSION_GROUPS][number];

// ─── Role → Permission Matrix ─────────────────────────────────────────────────

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  super_admin: Object.values(PERMISSION_GROUPS).flat() as Permission[],

  admin: [
    'dashboard:read', 'dashboard:export',
    'users:read', 'users:write', 'users:delete',
    'roles:read', 'roles:write',
    'permissions:read',
    'courses:read', 'courses:write', 'courses:publish',
    'categories:read', 'categories:write',
    'lessons:read', 'lessons:write',
    'modules:read', 'modules:write',
    'quizzes:read', 'quizzes:write',
    'certificates:read', 'certificates:issue',
    'membership:read', 'membership:write',
    'coupons:read', 'coupons:write',
    'payments:read',
    'revenue:read',
    'invoices:read',
    'cms:read', 'cms:write',
    'marketing:read',
    'media:read', 'media:write',
    'ai:read',
    'audit_logs:read',
    'activity_logs:read',
    'integrations:read',
    'api_keys:read',
    'settings:read',
  ],

  content_manager: [
    'dashboard:read',
    'courses:read', 'courses:write', 'courses:publish',
    'categories:read', 'categories:write',
    'lessons:read', 'lessons:write', 'lessons:delete',
    'modules:read', 'modules:write',
    'quizzes:read', 'quizzes:write',
    'certificates:read', 'certificates:write',
    'cms:read', 'cms:write', 'cms:publish',
    'marketing:read', 'marketing:write',
    'media:read', 'media:write', 'media:delete',
    'ai:read', 'ai:write',
    'prompts:read', 'prompts:write',
    'knowledge_base:read', 'knowledge_base:write',
  ],

  support_agent: [
    'dashboard:read',
    'users:read',
    'courses:read',
    'payments:read',
    'audit_logs:read',
    'activity_logs:read',
  ],

  finance_manager: [
    'dashboard:read', 'dashboard:export',
    'users:read',
    'payments:read', 'payments:refund',
    'revenue:read', 'revenue:export',
    'invoices:read', 'invoices:write',
    'membership:read', 'membership:write',
    'coupons:read', 'coupons:write',
    'audit_logs:read',
  ],

  analyst: [
    'dashboard:read', 'dashboard:export',
    'users:read',
    'courses:read',
    'revenue:read', 'revenue:export',
    'payments:read',
    'audit_logs:read',
    'activity_logs:read',
  ],
};

// ─── Helper Functions ─────────────────────────────────────────────────────────

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
  return permissions.some((p) => hasPermission(role, p));
}

export function hasAllPermissions(role: Role, permissions: Permission[]): boolean {
  return permissions.every((p) => hasPermission(role, p));
}

export function getRolePermissions(role: Role): Permission[] {
  return ROLE_PERMISSIONS[role] ?? [];
}

export function getPermissionMatrix(): Record<Permission, Record<Role, boolean>> {
  const allPerms = Object.values(PERMISSION_GROUPS).flat() as Permission[];
  const matrix = {} as Record<Permission, Record<Role, boolean>>;
  for (const perm of allPerms) {
    matrix[perm] = {} as Record<Role, boolean>;
    for (const role of ROLES) {
      matrix[perm][role] = hasPermission(role, perm);
    }
  }
  return matrix;
}

// ─── Demo Session ─────────────────────────────────────────────────────────────

export const DEMO_ADMIN_USER = {
  id: 'admin-001',
  name: 'Alex Rivera',
  email: 'alex.rivera@learnflow.ai',
  avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=AlexRivera',
  role: 'super_admin' as Role,
};
