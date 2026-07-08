'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/ui/AppLayout';
import { toast } from 'sonner';
import {
  Settings, ChevronRight, Save, Plus, Trash2, Edit3,
  Eye, EyeOff, Copy, RefreshCw, Upload, Download,
  CheckCircle2, AlertTriangle, Info, Search, Filter,
  Zap, Image, Type, Monitor, Sun, Moon, Check,
  Globe, Languages, Clock, Mail, MessageSquare, Bell,
  HardDrive, Key, Lock, CreditCard, Shield, Database,
  ScrollText, Building2, Palette, Smartphone,
} from 'lucide-react';

type ModuleKey =
  | 'general' | 'branding' | 'themes' | 'localization' | 'languages'
  | 'timezones' | 'email-templates' | 'sms-templates' | 'notifications'
  | 'storage' | 'api-keys' | 'oauth' | 'payment-gateways' | 'security'
  | 'backup' | 'audit-logs';

interface SidebarModule {
  key: ModuleKey; label: string; icon: React.ReactNode;
  badge?: string; badgeColor?: string;
}

const MODULE_GROUPS: { label: string; modules: SidebarModule[] }[] = [
  {
    label: 'System',
    modules: [
      { key: 'general', label: 'General', icon: <Settings size={15} /> },
      { key: 'branding', label: 'Branding', icon: <Image size={15} /> },
      { key: 'themes', label: 'Themes', icon: <Palette size={15} /> },
    ],
  },
  {
    label: 'Localization',
    modules: [
      { key: 'localization', label: 'Localization', icon: <Globe size={15} /> },
      { key: 'languages', label: 'Languages', icon: <Languages size={15} /> },
      { key: 'timezones', label: 'Time Zones', icon: <Clock size={15} /> },
    ],
  },
  {
    label: 'Messaging',
    modules: [
      { key: 'email-templates', label: 'Email Templates', icon: <Mail size={15} />, badge: '12', badgeColor: 'primary' },
      { key: 'sms-templates', label: 'SMS Templates', icon: <MessageSquare size={15} />, badge: '6', badgeColor: 'primary' },
      { key: 'notifications', label: 'Notifications', icon: <Bell size={15} /> },
    ],
  },
  {
    label: 'Infrastructure',
    modules: [
      { key: 'storage', label: 'Storage', icon: <HardDrive size={15} /> },
      { key: 'api-keys', label: 'API Keys', icon: <Key size={15} />, badge: '3', badgeColor: 'warning' },
      { key: 'oauth', label: 'OAuth', icon: <Lock size={15} /> },
      { key: 'payment-gateways', label: 'Payment Gateways', icon: <CreditCard size={15} /> },
    ],
  },
  {
    label: 'Compliance',
    modules: [
      { key: 'security', label: 'Security', icon: <Shield size={15} />, badge: '!', badgeColor: 'danger' },
      { key: 'backup', label: 'Backup', icon: <Database size={15} /> },
      { key: 'audit-logs', label: 'Audit Logs', icon: <ScrollText size={15} /> },
    ],
  },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button" role="switch" aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${checked ? 'bg-primary' : 'bg-muted-foreground/30'}`}
    >
      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );
}

function Section({ title, subtitle, icon, children, action }: {
  title: string; subtitle?: string; icon?: React.ReactNode; children: React.ReactNode; action?: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          {icon && <span className="text-primary">{icon}</span>}
          <div>
            <h3 className="text-sm font-semibold text-foreground">{title}</h3>
            {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {action}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function FieldRow({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-6 py-3.5 border-b border-border last:border-0">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {hint && <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

/* ── GENERAL ── */
function GeneralModule() {
  const [siteName, setSiteName] = useState('GUIDESOFT IT SOLUTIONS');
  const [siteUrl, setSiteUrl] = useState('https://learnflow.ai');
  const [supportEmail, setSupportEmail] = useState('support@learnflow.ai');
  const [maintenance, setMaintenance] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [cookieBanner, setCookieBanner] = useState(true);

  return (
    <div className="space-y-6">
      <Section title="Platform Identity" subtitle="Core application branding and contact details" icon={<Building2 size={16} />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="label-text">Platform Name</label><input className="input-field" value={siteName} onChange={e => setSiteName(e.target.value)} /></div>
          <div><label className="label-text">Platform URL</label><input className="input-field" value={siteUrl} onChange={e => setSiteUrl(e.target.value)} /></div>
          <div><label className="label-text">Support Email</label><input className="input-field" type="email" value={supportEmail} onChange={e => setSupportEmail(e.target.value)} /></div>
          <div><label className="label-text">Default Timezone</label>
            <select className="input-field">
              <option>Asia/Kolkata (IST +05:30)</option>
              <option>America/New_York (EST -05:00)</option>
              <option>Europe/London (GMT +00:00)</option>
            </select>
          </div>
          <div><label className="label-text">Date Format</label>
            <select className="input-field">
              <option>DD/MM/YYYY</option><option>MM/DD/YYYY</option><option>YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </Section>
      <Section title="System Controls" icon={<Settings size={16} />}>
        <FieldRow label="Maintenance Mode" hint="Temporarily take the platform offline">
          <Toggle checked={maintenance} onChange={setMaintenance} />
        </FieldRow>
        <FieldRow label="Analytics & Telemetry" hint="Send anonymised usage data to improve the platform">
          <Toggle checked={analytics} onChange={setAnalytics} />
        </FieldRow>
        <FieldRow label="Cookie Consent Banner" hint="Display GDPR-compliant cookie consent to visitors">
          <Toggle checked={cookieBanner} onChange={setCookieBanner} />
        </FieldRow>
      </Section>
      <div className="flex justify-end gap-3">
        <button className="btn-outline text-sm px-5 py-2">Cancel</button>
        <button className="btn-primary text-sm px-5 py-2" onClick={() => toast.success('General settings saved.')}><Save size={14} /> Save Changes</button>
      </div>
    </div>
  );
}

/* ── BRANDING ── */
function BrandingModule() {
  const [primary, setPrimary] = useState('#6C47FF');
  const [accent, setAccent] = useState('#00C9A7');
  return (
    <div className="space-y-6">
      <Section title="Logo & Favicon" icon={<Image size={16} />}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {['Light Logo', 'Dark Logo', 'Favicon'].map(item => (
            <div key={item} className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer group">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/10 transition-colors">
                <Upload size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-xs font-semibold text-foreground">{item}</p>
              <p className="text-[10px] text-muted-foreground mt-1">SVG, PNG · Max 2MB</p>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Brand Colors" icon={<Palette size={16} />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[{ label: 'Primary Color', value: primary, onChange: setPrimary }, { label: 'Accent Color', value: accent, onChange: setAccent }].map(({ label, value, onChange }) => (
            <div key={label}>
              <label className="label-text">{label}</label>
              <div className="flex items-center gap-3">
                <input type="color" value={value} onChange={e => onChange(e.target.value)} className="w-10 h-10 rounded-lg border border-border cursor-pointer bg-transparent" />
                <input className="input-field font-mono" value={value} onChange={e => onChange(e.target.value)} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <p className="label-text">Color Preview</p>
          <div className="flex gap-3 mt-2">
            <div className="h-10 flex-1 rounded-xl" style={{ background: primary }} />
            <div className="h-10 flex-1 rounded-xl" style={{ background: accent }} />
            <div className="h-10 flex-1 rounded-xl" style={{ backgroundImage: `linear-gradient(135deg, ${primary}, ${accent})` }} />
          </div>
        </div>
      </Section>
      <Section title="Typography" icon={<Type size={16} />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="label-text">Heading Font</label>
            <select className="input-field"><option>Plus Jakarta Sans</option><option>Inter</option><option>Outfit</option><option>Sora</option></select>
          </div>
          <div><label className="label-text">Body Font</label>
            <select className="input-field"><option>Plus Jakarta Sans</option><option>Inter</option><option>DM Sans</option></select>
          </div>
        </div>
      </Section>
      <div className="flex justify-end gap-3">
        <button className="btn-outline text-sm px-5 py-2">Reset Default</button>
        <button className="btn-primary text-sm px-5 py-2" onClick={() => toast.success('Branding saved.')}><Save size={14} /> Save Branding</button>
      </div>
    </div>
  );
}

/* ── THEMES ── */
function ThemesModule() {
  const [active, setActive] = useState('dark-indigo');
  const [allowSwitch, setAllowSwitch] = useState(true);
  const [mode, setMode] = useState<'light' | 'dark' | 'system'>('dark');

  const themes = [
    { id: 'dark-indigo', name: 'Dark Indigo', primary: '#6C47FF', bg: '#0F0A1E', badge: 'Default' },
    { id: 'dark-ocean', name: 'Dark Ocean', primary: '#0EA5E9', bg: '#0C1A2E', badge: null },
    { id: 'dark-forest', name: 'Dark Forest', primary: '#10B981', bg: '#0A1F15', badge: null },
    { id: 'light-lavender', name: 'Light Lavender', primary: '#6C47FF', bg: '#F5F4FF', badge: null },
    { id: 'light-slate', name: 'Light Slate', primary: '#3B82F6', bg: '#F8FAFC', badge: null },
    { id: 'light-rose', name: 'Light Rose', primary: '#E11D48', bg: '#FFF1F3', badge: null },
  ];

  return (
    <div className="space-y-6">
      <Section title="Theme Gallery" subtitle="Select the default UI theme for your platform" icon={<Palette size={16} />}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {themes.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)}
              className={`relative rounded-xl overflow-hidden border-2 transition-all text-left ${active === t.id ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/40'}`}>
              <div className="h-20 p-3" style={{ background: t.bg }}>
                <div className="h-2 w-12 rounded-full mb-2" style={{ background: t.primary }} />
                <div className="h-1.5 w-16 rounded-full bg-white/20 mb-1" />
                <div className="h-1.5 w-10 rounded-full bg-white/10" />
              </div>
              <div className="px-3 py-2 bg-card border-t border-border flex items-center justify-between">
                <span className="text-xs font-medium text-foreground">{t.name}</span>
                {active === t.id && <Check size={12} className="text-primary" />}
              </div>
              {t.badge && <span className="absolute top-2 right-2 text-[9px] px-1.5 py-0.5 bg-primary text-white rounded-md font-bold">{t.badge}</span>}
            </button>
          ))}
        </div>
      </Section>
      <Section title="Theme Behaviour" icon={<Monitor size={16} />}>
        <FieldRow label="Allow User Theme Switch" hint="Let learners toggle between light and dark mode">
          <Toggle checked={allowSwitch} onChange={setAllowSwitch} />
        </FieldRow>
        <FieldRow label="Default Color Mode" hint="Platform default when user has no preference saved">
          <div className="flex gap-2">
            {(['light', 'dark', 'system'] as const).map(m => (
              <button key={m} onClick={() => setMode(m)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${mode === m ? 'bg-primary text-white border-primary' : 'border-border text-muted-foreground hover:border-primary/40'}`}>
                {m === 'light' && <Sun size={12} />}{m === 'dark' && <Moon size={12} />}{m === 'system' && <Monitor size={12} />}
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </button>
            ))}
          </div>
        </FieldRow>
      </Section>
      <div className="flex justify-end">
        <button className="btn-primary text-sm px-5 py-2" onClick={() => toast.success('Theme settings saved.')}><Save size={14} /> Apply Theme</button>
      </div>
    </div>
  );
}

/* ── LOCALIZATION ── */
function LocalizationModule() {
  const [rtl, setRtl] = useState(false);
  const [autoDetect, setAutoDetect] = useState(true);
  return (
    <div className="space-y-6">
      <Section title="Regional Settings" icon={<Globe size={16} />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="label-text">Default Language</label>
            <select className="input-field"><option>English (United States)</option><option>Hindi (India)</option><option>Arabic (Saudi Arabia)</option><option>French</option><option>German</option></select>
          </div>
          <div><label className="label-text">Default Currency</label>
            <select className="input-field"><option>INR — Indian Rupee (₹)</option><option>USD — US Dollar ($)</option><option>EUR — Euro (€)</option><option>GBP — Pound (£)</option></select>
          </div>
          <div><label className="label-text">Number Format</label>
            <select className="input-field"><option>1,23,456.78 (Indian)</option><option>1,234,567.89 (Western)</option><option>1.234.567,89 (European)</option></select>
          </div>
          <div><label className="label-text">First Day of Week</label>
            <select className="input-field"><option>Monday</option><option>Sunday</option><option>Saturday</option></select>
          </div>
        </div>
      </Section>
      <Section title="Text Direction & Detection" icon={<Languages size={16} />}>
        <FieldRow label="Enable RTL (Right-to-Left)" hint="Flip layout for Arabic, Hebrew, Urdu etc.">
          <Toggle checked={rtl} onChange={setRtl} />
        </FieldRow>
        <FieldRow label="Auto-detect User Locale" hint="Use browser locale to pre-select language">
          <Toggle checked={autoDetect} onChange={setAutoDetect} />
        </FieldRow>
      </Section>
      <div className="flex justify-end">
        <button className="btn-primary text-sm px-5 py-2" onClick={() => toast.success('Localization saved.')}><Save size={14} /> Save Localization</button>
      </div>
    </div>
  );
}

/* ── LANGUAGES ── */
function LanguagesModule() {
  const langs = [
    { code: 'en', name: 'English', native: 'English', completion: 100, status: 'published', isDefault: true },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी', completion: 87, status: 'published', isDefault: false },
    { code: 'ar', name: 'Arabic', native: 'العربية', completion: 72, status: 'draft', isDefault: false },
    { code: 'fr', name: 'French', native: 'Français', completion: 65, status: 'draft', isDefault: false },
    { code: 'de', name: 'German', native: 'Deutsch', completion: 40, status: 'draft', isDefault: false },
  ];
  const statusStyle: Record<string, string> = { published: 'bg-positive/10 text-positive', draft: 'bg-warning/10 text-warning' };
  return (
    <div className="space-y-6">
      <Section title="Installed Languages" subtitle="Manage translation coverage for all locales" icon={<Languages size={16} />}
        action={<button className="btn-primary text-xs px-3 py-1.5"><Plus size={13} /> Add Language</button>}>
        <div className="space-y-3">
          {langs.map(l => (
            <div key={l.code} className="flex items-center gap-4 p-3 rounded-xl border border-border hover:bg-muted/30 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary uppercase shrink-0">{l.code}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-sm font-medium text-foreground">{l.name}</span>
                  <span className="text-xs text-muted-foreground">· {l.native}</span>
                  {l.isDefault && <span className="text-[10px] px-1.5 py-0.5 bg-primary/10 text-primary rounded-md font-semibold">Default</span>}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold capitalize ${statusStyle[l.status]}`}>{l.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${l.completion}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground">{l.completion}%</span>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <button className="btn-ghost p-1.5"><Edit3 size={13} /></button>
                {!l.isDefault && <button className="btn-ghost p-1.5 text-danger"><Trash2 size={13} /></button>}
              </div>
            </div>
          ))}
        </div>
      </Section>
      <div className="p-4 rounded-xl bg-info/10 border border-info/20 flex gap-3">
        <Info size={16} className="text-info shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-foreground">Translations are managed via JSON files.</p>
          <div className="flex gap-2 mt-2">
            <button className="btn-outline text-xs px-3 py-1.5"><Download size={12} /> Export All</button>
            <button className="btn-outline text-xs px-3 py-1.5"><Upload size={12} /> Import Package</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── TIME ZONES ── */
function TimeZonesModule() {
  const [zone, setZone] = useState('Asia/Kolkata');
  const [multi, setMulti] = useState(true);
  const [dst, setDst] = useState(true);
  const zones = [
    { id: 'Asia/Kolkata', label: 'Asia/Kolkata', offset: '+05:30', region: 'South Asia' },
    { id: 'America/New_York', label: 'America/New_York', offset: '-05:00', region: 'North America' },
    { id: 'America/Los_Angeles', label: 'America/Los_Angeles', offset: '-08:00', region: 'North America' },
    { id: 'Europe/London', label: 'Europe/London', offset: '+00:00', region: 'Europe' },
    { id: 'Europe/Berlin', label: 'Europe/Berlin', offset: '+01:00', region: 'Europe' },
    { id: 'Asia/Singapore', label: 'Asia/Singapore', offset: '+08:00', region: 'South-East Asia' },
    { id: 'Asia/Dubai', label: 'Asia/Dubai', offset: '+04:00', region: 'Middle East' },
  ];
  return (
    <div className="space-y-6">
      <Section title="Default Time Zone" icon={<Clock size={16} />}>
        <div className="grid gap-2">
          {zones.map(z => (
            <button key={z.id} onClick={() => setZone(z.id)}
              className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${zone === z.id ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/30'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${zone === z.id ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
                <span className="text-sm font-medium text-foreground">{z.label}</span>
                <span className="text-xs text-muted-foreground">{z.region}</span>
              </div>
              <span className={`text-xs font-mono px-2 py-0.5 rounded-lg ${zone === z.id ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>UTC {z.offset}</span>
            </button>
          ))}
        </div>
      </Section>
      <Section title="Time Zone Policy" icon={<Settings size={16} />}>
        <FieldRow label="Multi-Timezone Support" hint="Allow users to set their personal timezone"><Toggle checked={multi} onChange={setMulti} /></FieldRow>
        <FieldRow label="DST Auto-adjustment" hint="Auto-adjust for Daylight Saving Time"><Toggle checked={dst} onChange={setDst} /></FieldRow>
      </Section>
      <div className="flex justify-end">
        <button className="btn-primary text-sm px-5 py-2" onClick={() => toast.success('Timezone settings saved.')}><Save size={14} /> Save Time Zones</button>
      </div>
    </div>
  );
}

/* ── EMAIL TEMPLATES ── */
function EmailTemplatesModule() {
  const templates = [
    { id: 'welcome', name: 'Welcome Email', trigger: 'User Registration', edited: '2 days ago', status: 'active' },
    { id: 'password-reset', name: 'Password Reset', trigger: 'Reset Request', edited: '1 week ago', status: 'active' },
    { id: 'course-enrolled', name: 'Course Enrolled', trigger: 'Enrollment Confirmed', edited: '3 days ago', status: 'active' },
    { id: 'certificate', name: 'Certificate Issued', trigger: 'Course Completed', edited: '5 days ago', status: 'active' },
    { id: 'payment-receipt', name: 'Payment Receipt', trigger: 'Payment Successful', edited: '1 day ago', status: 'active' },
    { id: 'subscription-renew', name: 'Renewal Reminder', trigger: 'Subscription Expiring', edited: '2 weeks ago', status: 'draft' },
    { id: 'trial-end', name: 'Trial Ending', trigger: 'Trial Period End', edited: '1 month ago', status: 'draft' },
    { id: 'account-suspended', name: 'Account Suspended', trigger: 'Admin Action', edited: '2 months ago', status: 'inactive' },
  ];
  const statusStyle: Record<string, string> = { active: 'bg-positive/10 text-positive', draft: 'bg-warning/10 text-warning', inactive: 'bg-muted text-muted-foreground' };
  return (
    <div className="space-y-6">
      <Section title="Email Templates" subtitle="Transactional email design and variable support" icon={<Mail size={16} />}
        action={<button className="btn-primary text-xs px-3 py-1.5"><Plus size={13} /> New Template</button>}>
        <div className="space-y-2">
          {templates.map(t => (
            <div key={t.id} className="flex items-center gap-4 p-3.5 rounded-xl border border-border hover:bg-muted/30 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><Mail size={14} className="text-primary" /></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">Trigger: {t.trigger} · {t.edited}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold capitalize ${statusStyle[t.status]}`}>{t.status}</span>
              <div className="flex gap-1">
                <button className="btn-ghost p-1.5" onClick={() => toast.success('Template opened.')}><Edit3 size={13} /></button>
                <button className="btn-ghost p-1.5"><Eye size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <div className="p-4 rounded-xl bg-muted/40 border border-border">
        <p className="text-xs font-semibold text-foreground mb-2">Available Template Variables</p>
        <div className="flex flex-wrap gap-2">
          {['{{user_name}}', '{{user_email}}', '{{course_title}}', '{{platform_name}}', '{{reset_link}}', '{{certificate_url}}', '{{amount}}', '{{expiry_date}}'].map(v => (
            <code key={v} className="text-[11px] px-2 py-0.5 bg-card border border-border rounded-md text-primary font-mono">{v}</code>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── SMS TEMPLATES ── */
function SmsTemplatesModule() {
  const templates = [
    { id: 'otp', name: 'OTP Verification', chars: 120, status: 'active', provider: 'Twilio' },
    { id: 'welcome', name: 'Welcome SMS', chars: 160, status: 'active', provider: 'Twilio' },
    { id: 'reminder', name: 'Course Reminder', chars: 140, status: 'active', provider: 'MSG91' },
    { id: 'payment', name: 'Payment Alert', chars: 155, status: 'draft', provider: 'MSG91' },
    { id: 'session', name: 'Live Session Alert', chars: 145, status: 'active', provider: 'Twilio' },
    { id: 'renewal', name: 'Subscription Renewal', chars: 160, status: 'draft', provider: 'MSG91' },
  ];
  const statusColor: Record<string, string> = { active: 'bg-positive/10 text-positive', draft: 'bg-warning/10 text-warning' };
  return (
    <div className="space-y-6">
      <Section title="SMS Templates" subtitle="TRAI-compliant transactional SMS templates" icon={<MessageSquare size={16} />}
        action={<button className="btn-primary text-xs px-3 py-1.5"><Plus size={13} /> New Template</button>}>
        <div className="space-y-2">
          {templates.map(t => (
            <div key={t.id} className="flex items-center gap-4 p-3.5 rounded-xl border border-border hover:bg-muted/30 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center shrink-0"><MessageSquare size={14} style={{ color: 'var(--accent)' }} /></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.chars} chars · {t.provider}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold capitalize ${statusColor[t.status]}`}>{t.status}</span>
              <div className="flex gap-1">
                <button className="btn-ghost p-1.5"><Edit3 size={13} /></button>
                <button className="btn-ghost p-1.5"><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="SMS Provider" icon={<Smartphone size={16} />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="label-text">Primary Provider</label>
            <select className="input-field"><option>Twilio</option><option>MSG91</option><option>Exotel</option><option>AWS SNS</option></select>
          </div>
          <div><label className="label-text">Sender ID</label><input className="input-field" defaultValue="LRNFLW" /></div>
        </div>
      </Section>
    </div>
  );
}

/* ── NOTIFICATIONS ── */
function NotificationsModule() {
  const channels = [
    { id: 'inapp', label: 'In-App Notifications', hint: 'Real-time alerts in the platform UI', on: true },
    { id: 'email', label: 'Email Notifications', hint: 'Transactional emails to users', on: true },
    { id: 'sms', label: 'SMS Notifications', hint: 'SMS alerts for critical events', on: false },
    { id: 'push', label: 'Push Notifications', hint: 'Mobile and browser push alerts', on: true },
    { id: 'slack', label: 'Slack Webhooks', hint: 'Post alerts to Slack channels', on: false },
    { id: 'teams', label: 'Microsoft Teams', hint: 'Post alerts to MS Teams', on: false },
  ];
  const [states, setStates] = useState<Record<string, boolean>>(Object.fromEntries(channels.map(c => [c.id, c.on])));
  const events = ['New User Registered', 'Course Enrollment', 'Payment Received', 'Course Completed', 'Certificate Issued', 'Support Ticket Opened', 'Trial Expiring', 'Subscription Renewed'];
  return (
    <div className="space-y-6">
      <Section title="Notification Channels" subtitle="Enable or disable individual delivery channels" icon={<Bell size={16} />}>
        {channels.map(ch => (
          <FieldRow key={ch.id} label={ch.label} hint={ch.hint}>
            <Toggle checked={states[ch.id]} onChange={v => setStates(s => ({ ...s, [ch.id]: v }))} />
          </FieldRow>
        ))}
      </Section>
      <Section title="Event Triggers" subtitle="Choose which events generate notifications" icon={<Zap size={16} />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {events.map(ev => (
            <label key={ev} className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-muted/30 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-[--primary]" />
              <span className="text-sm text-foreground">{ev}</span>
            </label>
          ))}
        </div>
      </Section>
      <Section title="Digest Settings" icon={<Mail size={16} />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="label-text">Daily Digest Time</label><input type="time" className="input-field" defaultValue="08:00" /></div>
          <div><label className="label-text">Digest Frequency</label>
            <select className="input-field"><option>Daily</option><option>Weekly</option><option>Bi-weekly</option><option>Disabled</option></select>
          </div>
        </div>
      </Section>
      <div className="flex justify-end">
        <button className="btn-primary text-sm px-5 py-2" onClick={() => toast.success('Notification settings saved.')}><Save size={14} /> Save Notifications</button>
      </div>
    </div>
  );
}

/* ── STORAGE ── */
function StorageModule() {
  const [provider, setProvider] = useState('s3');
  const usage = [
    { label: 'Video Content', used: 240, total: 500, color: '#6C47FF' },
    { label: 'Documents & PDFs', used: 45, total: 200, color: '#00C9A7' },
    { label: 'Images & Assets', used: 18, total: 100, color: '#F59E0B' },
    { label: 'Audio Files', used: 8, total: 50, color: '#3B82F6' },
  ];
  return (
    <div className="space-y-6">
      <Section title="Storage Overview" icon={<HardDrive size={16} />}>
        <div className="space-y-4">
          {usage.map(d => (
            <div key={d.label}>
              <div className="flex justify-between mb-1.5">
                <span className="text-sm font-medium text-foreground">{d.label}</span>
                <span className="text-xs text-muted-foreground font-mono">{d.used}GB / {d.total}GB</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${(d.used / d.total) * 100}%`, background: d.color }} />
              </div>
            </div>
          ))}
          <div className="pt-3 border-t border-border flex justify-between">
            <span className="text-sm font-semibold text-foreground">Total Storage</span>
            <span className="text-sm font-bold text-primary font-mono">311GB / 850GB</span>
          </div>
        </div>
      </Section>
      <Section title="Storage Provider" subtitle="Configure cloud storage backend" icon={<Database size={16} />}>
        <div className="flex gap-3 mb-5 flex-wrap">
          {[{ id: 's3', label: 'Amazon S3' }, { id: 'gcs', label: 'Google Cloud' }, { id: 'azure', label: 'Azure Blob' }, { id: 'local', label: 'Local Disk' }].map(p => (
            <button key={p.id} onClick={() => setProvider(p.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${provider === p.id ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/40'}`}>
              {p.label}
            </button>
          ))}
        </div>
        {provider === 's3' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="label-text">Bucket Name</label><input className="input-field" placeholder="my-learnflow-bucket" /></div>
            <div><label className="label-text">Region</label>
              <select className="input-field"><option>ap-south-1 (Mumbai)</option><option>us-east-1 (N. Virginia)</option><option>eu-west-1 (Ireland)</option></select>
            </div>
            <div><label className="label-text">Access Key ID</label><input className="input-field font-mono" type="password" placeholder="AKIA..." /></div>
            <div><label className="label-text">Secret Access Key</label><input className="input-field font-mono" type="password" placeholder="••••••••••••" /></div>
            <div className="sm:col-span-2"><label className="label-text">CDN URL (Optional)</label><input className="input-field" placeholder="https://cdn.yourdomain.com" /></div>
          </div>
        )}
        {provider === 'gcs' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="label-text">Project ID</label><input className="input-field" placeholder="my-gcp-project" /></div>
            <div><label className="label-text">Bucket Name</label><input className="input-field" placeholder="learnflow-assets" /></div>
            <div className="sm:col-span-2"><label className="label-text">Service Account JSON</label><textarea className="input-field h-24 font-mono text-xs" placeholder='{ "type": "service_account", ... }' /></div>
          </div>
        )}
        {provider === 'local' && <div><label className="label-text">Upload Path</label><input className="input-field" defaultValue="/var/www/uploads" /></div>}
        {provider === 'azure' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="label-text">Connection String</label><input className="input-field font-mono" type="password" placeholder="DefaultEndpointsProtocol=https..." /></div>
            <div><label className="label-text">Container Name</label><input className="input-field" placeholder="learnflow-assets" /></div>
          </div>
        )}
      </Section>
      <div className="flex justify-end gap-3">
        <button className="btn-outline text-sm px-5 py-2" onClick={() => toast.success('Connection test passed.')}><RefreshCw size={14} /> Test Connection</button>
        <button className="btn-primary text-sm px-5 py-2" onClick={() => toast.success('Storage settings saved.')}><Save size={14} /> Save Storage</button>
      </div>
    </div>
  );
}

/* ── API KEYS ── */
function ApiKeysModule() {
  const [show, setShow] = useState<string | null>(null);
  const keys = [
    { id: 'k1', name: 'Production API Key', prefix: 'lf_live_', value: 'lf_live_sk_8f3j2k9d7v1m5n4p3q2r1', scopes: ['read', 'write'], created: 'Jun 10 2026', lastUsed: '2 hours ago', status: 'active' },
    { id: 'k2', name: 'Staging Key', prefix: 'lf_test_', value: 'lf_test_sk_7a2b4c1e9f3g6h8i1j0k', scopes: ['read'], created: 'May 28 2026', lastUsed: '3 days ago', status: 'active' },
    { id: 'k3', name: 'Mobile App Key', prefix: 'lf_mob_', value: 'lf_mob_sk_1d4e7f2a9b3c6g8h0i1j', scopes: ['read', 'write', 'admin'], created: 'Apr 5 2026', lastUsed: 'Yesterday', status: 'active' },
    { id: 'k4', name: 'Legacy Integration', prefix: 'lf_v1_', value: 'lf_v1_sk_9p8o7n6m5l4k3j2i1h0g', scopes: ['read'], created: 'Jan 1 2026', lastUsed: '2 months ago', status: 'expired' },
  ];
  const scopeColor: Record<string, string> = { read: 'bg-info/10 text-info', write: 'bg-primary/10 text-primary', admin: 'bg-danger/10 text-danger' };
  return (
    <div className="space-y-6">
      <Section title="API Keys" subtitle="Manage programmatic access credentials" icon={<Key size={16} />}
        action={<button className="btn-primary text-xs px-3 py-1.5" onClick={() => toast.success('New API key generated.')}><Plus size={13} /> Generate Key</button>}>
        <div className="space-y-3">
          {keys.map(k => (
            <div key={k.id} className={`p-4 rounded-xl border transition-all ${k.status === 'expired' ? 'border-danger/30 bg-danger/5 opacity-70' : 'border-border hover:bg-muted/20'}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-foreground">{k.name}</span>
                    {k.status === 'expired' && <span className="text-[10px] px-1.5 py-0.5 bg-danger/10 text-danger rounded-md font-semibold">Expired</span>}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <code className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      {show === k.id ? k.value : `${k.prefix}${'•'.repeat(20)}`}
                    </code>
                    <button className="btn-ghost p-1" onClick={() => setShow(show === k.id ? null : k.id)}>
                      {show === k.id ? <EyeOff size={12} /> : <Eye size={12} />}
                    </button>
                    <button className="btn-ghost p-1" onClick={() => { navigator.clipboard.writeText(k.value); toast.success('Copied!'); }}><Copy size={12} /></button>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex gap-1">{k.scopes.map(s => <span key={s} className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${scopeColor[s]}`}>{s}</span>)}</div>
                    <span className="text-[10px] text-muted-foreground">Created {k.created} · Last used {k.lastUsed}</span>
                  </div>
                </div>
                <button className="btn-ghost p-1.5 text-muted-foreground hover:text-danger" onClick={() => toast.error('Key revoked.')}><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <div className="p-4 rounded-xl bg-warning/10 border border-warning/20 flex gap-3">
        <AlertTriangle size={16} className="text-warning shrink-0 mt-0.5" />
        <p className="text-sm text-foreground">Never expose API keys in client-side code. Use scoped keys with least-privilege and rotate them regularly.</p>
      </div>
    </div>
  );
}

/* ── OAUTH ── */
function OAuthModule() {
  const providers = [
    { id: 'google', name: 'Google', icon: 'G', color: '#4285F4', enabled: true },
    { id: 'github', name: 'GitHub', icon: '⬡', color: '#24292e', enabled: false },
    { id: 'microsoft', name: 'Microsoft', icon: 'M', color: '#00A4EF', enabled: true },
    { id: 'linkedin', name: 'LinkedIn', icon: 'in', color: '#0A66C2', enabled: false },
    { id: 'apple', name: 'Apple', icon: '⌘', color: '#000000', enabled: false },
  ];
  const [states, setStates] = useState<Record<string, boolean>>(Object.fromEntries(providers.map(p => [p.id, p.enabled])));
  return (
    <div className="space-y-6">
      <Section title="OAuth Providers" subtitle="Configure social sign-in for user authentication" icon={<Lock size={16} />}>
        <div className="space-y-4">
          {providers.map(p => (
            <div key={p.id} className="border border-border rounded-xl overflow-hidden">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: p.color }}>{p.icon}</div>
                  <span className="text-sm font-semibold text-foreground">{p.name}</span>
                  {states[p.id] && <span className="text-[10px] px-1.5 py-0.5 bg-positive/10 text-positive rounded-md font-semibold">Active</span>}
                </div>
                <Toggle checked={states[p.id]} onChange={v => setStates(s => ({ ...s, [p.id]: v }))} />
              </div>
              {states[p.id] && (
                <div className="px-4 pb-4 pt-0 border-t border-border bg-muted/20 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div><label className="label-text text-[11px]">Client ID</label><input className="input-field text-xs font-mono" placeholder={`${p.name} Client ID`} /></div>
                  <div><label className="label-text text-[11px]">Client Secret</label><input className="input-field text-xs font-mono" type="password" placeholder="••••••••••••••" /></div>
                  <div className="sm:col-span-2">
                    <label className="label-text text-[11px]">Redirect URI</label>
                    <div className="flex gap-2">
                      <input className="input-field text-xs font-mono" defaultValue={`https://learnflow.ai/auth/callback/${p.id}`} readOnly />
                      <button className="btn-outline px-3" onClick={() => toast.success('Copied!')}><Copy size={13} /></button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>
      <div className="flex justify-end">
        <button className="btn-primary text-sm px-5 py-2" onClick={() => toast.success('OAuth settings saved.')}><Save size={14} /> Save OAuth Config</button>
      </div>
    </div>
  );
}

/* ── PAYMENT GATEWAYS ── */
function PaymentGatewaysModule() {
  const gateways = [
    { id: 'razorpay', name: 'Razorpay', region: 'India', currencies: 'INR', enabled: true, live: true },
    { id: 'stripe', name: 'Stripe', region: 'Global', currencies: 'USD, EUR, GBP', enabled: true, live: false },
    { id: 'paypal', name: 'PayPal', region: 'Global', currencies: 'USD, EUR', enabled: false, live: false },
    { id: 'payu', name: 'PayU', region: 'India, Eastern Europe', currencies: 'INR', enabled: false, live: false },
  ];
  const [states, setStates] = useState<Record<string, boolean>>(Object.fromEntries(gateways.map(g => [g.id, g.enabled])));
  const [liveMode, setLiveMode] = useState<Record<string, boolean>>(Object.fromEntries(gateways.map(g => [g.id, g.live])));
  return (
    <div className="space-y-6">
      <Section title="Payment Gateways" subtitle="Configure payment processors for transactions" icon={<CreditCard size={16} />}>
        <div className="space-y-4">
          {gateways.map(gw => (
            <div key={gw.id} className="border border-border rounded-xl overflow-hidden">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center"><CreditCard size={14} className="text-muted-foreground" /></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{gw.name}</span>
                      {states[gw.id] && liveMode[gw.id] && <span className="text-[10px] px-1.5 py-0.5 bg-positive/10 text-positive rounded-md font-bold">Live</span>}
                      {states[gw.id] && !liveMode[gw.id] && <span className="text-[10px] px-1.5 py-0.5 bg-warning/10 text-warning rounded-md font-bold">Test</span>}
                    </div>
                    <p className="text-xs text-muted-foreground">{gw.region} · {gw.currencies}</p>
                  </div>
                </div>
                <Toggle checked={states[gw.id]} onChange={v => setStates(s => ({ ...s, [gw.id]: v }))} />
              </div>
              {states[gw.id] && (
                <div className="px-4 pb-4 border-t border-border bg-muted/20 space-y-3">
                  <div className="flex items-center justify-between pt-3">
                    <div><p className="text-xs font-medium text-foreground">Live Mode</p><p className="text-[11px] text-muted-foreground">Toggle between test and production keys</p></div>
                    <Toggle checked={liveMode[gw.id]} onChange={v => setLiveMode(s => ({ ...s, [gw.id]: v }))} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div><label className="label-text text-[11px]">{liveMode[gw.id] ? 'Live' : 'Test'} Key ID</label><input className="input-field text-xs font-mono" placeholder="Key ID" /></div>
                    <div><label className="label-text text-[11px]">{liveMode[gw.id] ? 'Live' : 'Test'} Secret</label><input className="input-field text-xs font-mono" type="password" placeholder="••••••••••" /></div>
                    <div><label className="label-text text-[11px]">Webhook Secret</label><input className="input-field text-xs font-mono" type="password" placeholder="whsec_..." /></div>
                    <div><label className="label-text text-[11px]">Currency</label><input className="input-field text-xs" defaultValue={gw.currencies.split(',')[0].trim()} /></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>
      <div className="flex justify-end">
        <button className="btn-primary text-sm px-5 py-2" onClick={() => toast.success('Payment gateway settings saved.')}><Save size={14} /> Save Gateways</button>
      </div>
    </div>
  );
}

/* ── SECURITY ── */
function SecurityModule() {
  const [mfa, setMfa] = useState(true);
  const [ssoOnly, setSsoOnly] = useState(false);
  const [ipWhitelist, setIpWhitelist] = useState(false);
  const [audit, setAudit] = useState(true);
  const [rateLimit, setRateLimit] = useState(true);
  const [encryptRest, setEncryptRest] = useState(true);
  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-danger/10 border border-danger/20 flex gap-3">
        <AlertTriangle size={16} className="text-danger shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-foreground">Security Recommendation</p>
          <p className="text-xs text-muted-foreground mt-0.5">MFA enforcement is recommended for all admin accounts. 2 items require attention.</p>
        </div>
      </div>
      <Section title="Authentication Security" icon={<Shield size={16} />}>
        <FieldRow label="Enforce MFA for Admins" hint="Require multi-factor authentication for all admin roles"><Toggle checked={mfa} onChange={setMfa} /></FieldRow>
        <FieldRow label="SSO-Only Login" hint="Disable password login; require SSO or OAuth"><Toggle checked={ssoOnly} onChange={setSsoOnly} /></FieldRow>
        <FieldRow label="Session Timeout" hint="Automatically log out inactive users">
          <select className="input-field w-28 text-xs">
            <option>15 min</option><option>30 min</option><option selected>60 min</option><option>8 hours</option>
          </select>
        </FieldRow>
        <FieldRow label="Password Policy" hint="Minimum complexity requirement for user passwords">
          <select className="input-field w-32 text-xs">
            <option>Basic (6+)</option><option>Medium (8+)</option><option selected>Strong (10+)</option><option>Enterprise</option>
          </select>
        </FieldRow>
      </Section>
      <Section title="Access Control" icon={<Lock size={16} />}>
        <FieldRow label="IP Whitelist" hint="Restrict admin panel to specific IP ranges"><Toggle checked={ipWhitelist} onChange={setIpWhitelist} /></FieldRow>
        {ipWhitelist && <div className="mt-3"><label className="label-text">Allowed IP Ranges (CIDR)</label><textarea className="input-field h-20 font-mono text-xs" placeholder="192.168.1.0/24&#10;10.0.0.0/8" /></div>}
        <FieldRow label="API Rate Limiting" hint="Throttle API requests to prevent abuse"><Toggle checked={rateLimit} onChange={setRateLimit} /></FieldRow>
        <FieldRow label="Audit All Actions" hint="Log every admin action to the audit trail"><Toggle checked={audit} onChange={setAudit} /></FieldRow>
        <FieldRow label="Data Encryption at Rest" hint="AES-256 encryption for all stored user data"><Toggle checked={encryptRest} onChange={setEncryptRest} /></FieldRow>
      </Section>
      <Section title="Compliance" subtitle="GDPR, CCPA and SOC 2 compliance settings" icon={<CheckCircle2 size={16} />}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[{ label: 'GDPR Mode', desc: 'Data subject rights & consent tracking', on: true }, { label: 'CCPA Mode', desc: 'California Consumer Privacy Act compliance', on: false }, { label: 'SOC 2 Logging', desc: 'Enhanced audit logging for SOC 2 Type II', on: true }].map(c => (
            <label key={c.label} className="flex flex-col gap-2 p-4 rounded-xl border border-border cursor-pointer hover:bg-muted/20 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">{c.label}</span>
                <input type="checkbox" defaultChecked={c.on} className="w-4 h-4 rounded accent-[--primary]" />
              </div>
              <p className="text-xs text-muted-foreground">{c.desc}</p>
            </label>
          ))}
        </div>
      </Section>
      <div className="flex justify-end">
        <button className="btn-primary text-sm px-5 py-2" onClick={() => toast.success('Security settings saved.')}><Save size={14} /> Save Security</button>
      </div>
    </div>
  );
}

/* ── BACKUP ── */
function BackupModule() {
  const backups = [
    { id: 'b1', name: 'Auto Backup – Jul 7, 2026', size: '2.4 GB', type: 'Automatic', status: 'success', time: '02:00 AM' },
    { id: 'b2', name: 'Auto Backup – Jul 6, 2026', size: '2.3 GB', type: 'Automatic', status: 'success', time: '02:00 AM' },
    { id: 'b3', name: 'Manual Backup – Jul 5, 2026', size: '2.2 GB', type: 'Manual', status: 'success', time: '11:42 AM' },
    { id: 'b4', name: 'Auto Backup – Jul 5, 2026', size: '0 GB', type: 'Automatic', status: 'failed', time: '02:00 AM' },
    { id: 'b5', name: 'Auto Backup – Jul 4, 2026', size: '2.1 GB', type: 'Automatic', status: 'success', time: '02:00 AM' },
  ];
  const statusStyle: Record<string, string> = { success: 'bg-positive/10 text-positive', failed: 'bg-danger/10 text-danger' };
  return (
    <div className="space-y-6">
      <Section title="Backup Schedule" subtitle="Configure automated database and file system backups" icon={<Database size={16} />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="label-text">Backup Frequency</label>
            <select className="input-field"><option>Daily</option><option>Twice Daily</option><option>Weekly</option><option>Hourly (Pro)</option></select>
          </div>
          <div><label className="label-text">Backup Time</label><input type="time" className="input-field" defaultValue="02:00" /></div>
          <div><label className="label-text">Retention Period</label>
            <select className="input-field"><option>7 days</option><option>14 days</option><option>30 days</option><option>90 days</option></select>
          </div>
          <div><label className="label-text">Storage Destination</label>
            <select className="input-field"><option>Amazon S3</option><option>Google Cloud Storage</option><option>Azure Blob</option></select>
          </div>
        </div>
        <div className="mt-4">
          <button className="btn-outline text-sm px-4 py-2" onClick={() => toast.success('Manual backup initiated...')}><RefreshCw size={14} /> Run Manual Backup</button>
        </div>
      </Section>
      <Section title="Backup History" subtitle="View and restore from previous snapshots" icon={<ScrollText size={16} />}>
        <div className="space-y-2">
          {backups.map(b => (
            <div key={b.id} className="flex items-center gap-4 p-3.5 rounded-xl border border-border hover:bg-muted/20 transition-colors">
              <div className={`w-2 h-2 rounded-full shrink-0 ${b.status === 'success' ? 'bg-positive' : 'bg-danger'}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{b.name}</p>
                <p className="text-xs text-muted-foreground">{b.type} · {b.time} · {b.size}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold capitalize ${statusStyle[b.status]}`}>{b.status}</span>
              <div className="flex gap-1">
                {b.status === 'success' && (
                  <>
                    <button className="btn-ghost p-1.5" title="Download"><Download size={13} /></button>
                    <button className="btn-ghost p-1.5" title="Restore" onClick={() => toast.success('Restore initiated.')}><RefreshCw size={13} /></button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ── AUDIT LOGS ── */
function AuditLogsModule() {
  const [search, setSearch] = useState('');
  const logs = [
    { id: 1, action: 'API Key Generated', actor: 'admin@learnflow.ai', resource: 'API Keys', severity: 'high', ip: '203.94.x.x', time: '20:31:04' },
    { id: 2, action: 'OAuth Provider Updated', actor: 'admin@learnflow.ai', resource: 'OAuth / Google', severity: 'medium', ip: '203.94.x.x', time: '20:28:47' },
    { id: 3, action: 'User Role Changed', actor: 'ops@learnflow.ai', resource: 'User: raj@test.com', severity: 'high', ip: '110.42.x.x', time: '20:15:22' },
    { id: 4, action: 'Payment Gateway Enabled', actor: 'admin@learnflow.ai', resource: 'Stripe Gateway', severity: 'medium', ip: '203.94.x.x', time: '19:58:11' },
    { id: 5, action: 'Backup Completed', actor: 'system', resource: 'Database', severity: 'info', ip: 'internal', time: '18:00:00' },
    { id: 6, action: 'Failed Login Attempt', actor: 'unknown', resource: 'Auth / Login', severity: 'danger', ip: '45.33.x.x', time: '17:42:33' },
    { id: 7, action: 'Email Template Edited', actor: 'content@learnflow.ai', resource: 'Welcome Email', severity: 'low', ip: '156.12.x.x', time: '16:30:05' },
    { id: 8, action: 'Settings Exported', actor: 'admin@learnflow.ai', resource: 'System Config', severity: 'high', ip: '203.94.x.x', time: '15:11:47' },
  ];
  const severityStyle: Record<string, string> = {
    danger: 'bg-danger/10 text-danger', high: 'bg-warning/10 text-warning',
    medium: 'bg-info/10 text-info', low: 'bg-muted text-muted-foreground', info: 'bg-positive/10 text-positive',
  };
  const filtered = logs.filter(l => !search || l.action.toLowerCase().includes(search.toLowerCase()) || l.actor.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="space-y-6">
      <Section title="Audit Log" subtitle="Immutable record of all administrative actions" icon={<ScrollText size={16} />}
        action={<button className="btn-outline text-xs px-3 py-1.5"><Download size={13} /> Export CSV</button>}>
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input className="input-field pl-9 text-sm" placeholder="Search by action, actor or resource..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="btn-outline text-xs px-3 py-2.5 flex items-center gap-1.5"><Filter size={12} /> Filter</button>
        </div>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-muted/40 border-b border-border">
                <th className="text-left px-4 py-3 text-muted-foreground font-semibold">Action</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-semibold hidden sm:table-cell">Actor</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-semibold hidden md:table-cell">Resource</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-semibold">Severity</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-semibold hidden lg:table-cell">IP</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-semibold">Time</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log, idx) => (
                <tr key={log.id} className={`border-b border-border last:border-0 hover:bg-muted/20 transition-colors ${idx % 2 === 0 ? '' : 'bg-muted/10'}`}>
                  <td className="px-4 py-3 font-medium text-foreground">{log.action}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell font-mono">{log.actor}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{log.resource}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-md font-semibold capitalize text-[10px] ${severityStyle[log.severity]}`}>{log.severity}</span></td>
                  <td className="px-4 py-3 text-muted-foreground font-mono hidden lg:table-cell">{log.ip}</td>
                  <td className="px-4 py-3 text-muted-foreground font-mono">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-muted-foreground">Showing {filtered.length} of {logs.length} entries today</p>
          <div className="flex gap-2">
            <button className="btn-outline text-xs px-3 py-1.5">Previous</button>
            <button className="btn-outline text-xs px-3 py-1.5">Next</button>
          </div>
        </div>
      </Section>
    </div>
  );
}

/* ── Render ── */
function renderModule(key: ModuleKey) {
  switch (key) {
    case 'general': return <GeneralModule />;
    case 'branding': return <BrandingModule />;
    case 'themes': return <ThemesModule />;
    case 'localization': return <LocalizationModule />;
    case 'languages': return <LanguagesModule />;
    case 'timezones': return <TimeZonesModule />;
    case 'email-templates': return <EmailTemplatesModule />;
    case 'sms-templates': return <SmsTemplatesModule />;
    case 'notifications': return <NotificationsModule />;
    case 'storage': return <StorageModule />;
    case 'api-keys': return <ApiKeysModule />;
    case 'oauth': return <OAuthModule />;
    case 'payment-gateways': return <PaymentGatewaysModule />;
    case 'security': return <SecurityModule />;
    case 'backup': return <BackupModule />;
    case 'audit-logs': return <AuditLogsModule />;
    default: return null;
  }
}

const MODULE_TITLES: Record<ModuleKey, { title: string; subtitle: string }> = {
  general: { title: 'General Settings', subtitle: 'Core platform identity and system controls' },
  branding: { title: 'Branding', subtitle: 'Logo, color palette and typography' },
  themes: { title: 'Themes', subtitle: 'UI theme gallery and color mode settings' },
  localization: { title: 'Localization', subtitle: 'Language, currency and regional formats' },
  languages: { title: 'Languages', subtitle: 'Translation coverage and locale management' },
  timezones: { title: 'Time Zones', subtitle: 'Server and user timezone configuration' },
  'email-templates': { title: 'Email Templates', subtitle: 'Transactional email design and variables' },
  'sms-templates': { title: 'SMS Templates', subtitle: 'TRAI-compliant SMS message templates' },
  notifications: { title: 'Notification Settings', subtitle: 'Channels, events and digest schedule' },
  storage: { title: 'Storage', subtitle: 'Cloud storage provider and bucket settings' },
  'api-keys': { title: 'API Keys', subtitle: 'Programmatic access key management' },
  oauth: { title: 'OAuth Providers', subtitle: 'Social and enterprise SSO configuration' },
  'payment-gateways': { title: 'Payment Gateways', subtitle: 'Payment processor keys and modes' },
  security: { title: 'Security', subtitle: 'Auth policies, access control and compliance' },
  backup: { title: 'Backup & Restore', subtitle: 'Automated snapshots and restore history' },
  'audit-logs': { title: 'Audit Logs', subtitle: 'Immutable trail of all system actions' },
};

/* ── PAGE ── */
export default function SystemSettingsPage() {
  const [active, setActive] = useState<ModuleKey>('general');
  const [searchQuery, setSearchQuery] = useState('');
  const { title, subtitle } = MODULE_TITLES[active];

  const badgeMap: Record<string, string> = {
    primary: 'bg-primary/10 text-primary',
    warning: 'bg-warning/10 text-warning',
    danger: 'bg-danger/10 text-danger',
  };

  return (
    <AppLayout>
      <div className="animate-fade-in">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
            <Settings size={12} /><ChevronRight size={10} />
            <span>System Settings</span><ChevronRight size={10} />
            <span className="text-foreground font-medium">{title}</span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">System Settings</h1>
              <p className="text-sm text-muted-foreground mt-1">Enterprise configuration management · 16 modules</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button className="btn-outline text-xs px-3 py-2 hidden sm:flex items-center gap-1.5" onClick={() => toast.success('Config exported.')}>
                <Download size={13} /> Export Config
              </button>
              <button className="btn-primary text-xs px-3 py-2 flex items-center gap-1.5" onClick={() => toast.success('All settings saved.')}>
                <Save size={13} /> Save All
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-6 min-h-[calc(100vh-220px)]">
          {/* Settings Sidebar */}
          <aside className="w-52 shrink-0 hidden lg:block">
            <div className="sticky top-24 space-y-1">
              <div className="relative mb-3">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="Search modules..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
              {MODULE_GROUPS.map(group => {
                const filtered = group.modules.filter(m => !searchQuery || m.label.toLowerCase().includes(searchQuery.toLowerCase()));
                if (filtered.length === 0) return null;
                return (
                  <div key={group.label} className="mb-3">
                    <p className="px-3 mb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{group.label}</p>
                    {filtered.map(mod => (
                      <button key={mod.key} onClick={() => setActive(mod.key)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 ${active === mod.key ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                        <span className="shrink-0">{mod.icon}</span>
                        <span className="flex-1 text-left truncate">{mod.label}</span>
                        {mod.badge && <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold shrink-0 ${badgeMap[mod.badgeColor || 'primary']}`}>{mod.badge}</span>}
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          </aside>

          {/* Mobile Selector */}
          <div className="lg:hidden mb-4 w-full">
            <select className="input-field text-sm" value={active} onChange={e => setActive(e.target.value as ModuleKey)}>
              {MODULE_GROUPS.map(g => (
                <optgroup key={g.label} label={g.label}>
                  {g.modules.map(m => <option key={m.key} value={m.key}>{m.label}</option>)}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Module Content */}
          <div className="flex-1 min-w-0">
            <div className="mb-6 pb-4 border-b border-border">
              <h2 className="text-lg font-bold text-foreground">{title}</h2>
              <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
            </div>
            {renderModule(active)}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
