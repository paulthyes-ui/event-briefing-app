import React, { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const APP_FONT_STACK = 'Inter, Geist, "SF Pro Display", "SF Pro Text", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const MOBILE_NAV_HEIGHT = 88;
const BRAND = {
  yellow: "#E6E766",
  yellowSoft: "rgba(230,231,102,0.14)",
  yellowBorder: "rgba(230,231,102,0.38)",
  black: "#060606",
};
const BRAND_LOGO = null;

const IconWrap = ({ children, className = "" }) => (
  <span className={`inline-flex h-4 w-4 items-center justify-center ${className}`}>{children}</span>
);
const Building2 = ({ className = "" }) => <IconWrap className={className}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M3 21h18"/><path d="M5 21V7l7-4v18"/><path d="M19 21V11l-7-4"/><path d="M9 9h.01"/><path d="M9 13h.01"/><path d="M9 17h.01"/><path d="M13 13h.01"/><path d="M13 17h.01"/></svg></IconWrap>;
const CalendarDays = ({ className = "" }) => <IconWrap className={className}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M8 2v4"/><path d="M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/></svg></IconWrap>;
const ChevronLeft = ({ className = "" }) => <IconWrap className={className}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="m15 18-6-6 6-6"/></svg></IconWrap>;
const ChevronRight = ({ className = "" }) => <IconWrap className={className}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="m9 18 6-6-6-6"/></svg></IconWrap>;
const ClipboardList = ({ className = "" }) => <IconWrap className={className}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2"/><path d="M9 12h6"/><path d="M9 16h6"/></svg></IconWrap>;
const FileText = ({ className = "" }) => <IconWrap className={className}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h8"/></svg></IconWrap>;
const Loader2 = ({ className = "" }) => <IconWrap className={`${className} animate-spin`}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg></IconWrap>;
const MapPin = ({ className = "" }) => <IconWrap className={className}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M12 21s-6-4.35-6-11a6 6 0 1 1 12 0c0 6.65-6 11-6 11Z"/><circle cx="12" cy="10" r="2"/></svg></IconWrap>;
const Plus = ({ className = "" }) => <IconWrap className={className}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M12 5v14"/><path d="M5 12h14"/></svg></IconWrap>;
const Save = ({ className = "" }) => <IconWrap className={className}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/></svg></IconWrap>;
const ShieldCheck = ({ className = "" }) => <IconWrap className={className}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg></IconWrap>;
const TriangleAlert = ({ className = "" }) => <IconWrap className={className}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></IconWrap>;
const RefreshCcw = ({ className = "" }) => <IconWrap className={className}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M3 2v6h6"/><path d="M21 12A9 9 0 0 0 6 5.3L3 8"/><path d="M21 22v-6h-6"/><path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"/></svg></IconWrap>;
const Search = ({ className = "" }) => <IconWrap className={className}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></IconWrap>;
const FolderOpen = ({ className = "" }) => <IconWrap className={className}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-7l-2-2H5a2 2 0 0 0-2 2z"/></svg></IconWrap>;
const Upload = ({ className = "" }) => <IconWrap className={className}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M20 16v4H4v-4"/></svg></IconWrap>;
const LayoutDashboard = ({ className = "" }) => <IconWrap className={className}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg></IconWrap>;
const Eye = ({ className = "" }) => <IconWrap className={className}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg></IconWrap>;
const Pencil = ({ className = "" }) => <IconWrap className={className}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></IconWrap>;
const Trash2 = ({ className = "" }) => <IconWrap className={className}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="m19 6-1 14H6L5 6"/></svg></IconWrap>;
const CheckCircle2 = ({ className = "" }) => <IconWrap className={className}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg></IconWrap>;
const Clock3 = ({ className = "" }) => <IconWrap className={className}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></IconWrap>;
const LogIn = ({ className = "" }) => <IconWrap className={className}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="m10 17 5-5-5-5"/><path d="M15 12H3"/></svg></IconWrap>;
const LogOut = ({ className = "" }) => <IconWrap className={className}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/></svg></IconWrap>;
const Mail = ({ className = "" }) => <IconWrap className={className}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg></IconWrap>;
const Lock = ({ className = "" }) => <IconWrap className={className}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 1 1 8 0v3"/></svg></IconWrap>;
const Settings = ({ className = "" }) => <IconWrap className={className}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M12 3a2 2 0 0 1 2 2v.2a7.7 7.7 0 0 1 1.8.8l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1c.3.6.6 1.2.8 1.8H19a2 2 0 1 1 0 4h-.2a7.7 7.7 0 0 1-.8 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a7.7 7.7 0 0 1-1.8.8V19a2 2 0 1 1-4 0v-.2a7.7 7.7 0 0 1-1.8-.8l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a7.7 7.7 0 0 1-.8-1.8H5a2 2 0 1 1 0-4h.2c.2-.6.5-1.2.8-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1c.6-.3 1.2-.6 1.8-.8V5a2 2 0 0 1 2-2Z"/><circle cx="12" cy="12" r="3"/></svg></IconWrap>;
const UserCircle = ({ className = "" }) => <IconWrap className={className}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><circle cx="12" cy="8" r="4"/><path d="M6 20a6 6 0 0 1 12 0"/></svg></IconWrap>;

const Card = ({ className = "", children }) => <div className={`rounded-[36px] border border-white/60 bg-white/68 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.2)] backdrop-blur-3xl ${className}`}>{children}</div>;
const CardHeader = ({ children, className = "" }) => <div className={`px-8 py-7 ${className}`}>{children}</div>;
const CardContent = ({ className = "", children }) => <div className={`px-8 py-7 ${className}`}>{children}</div>;
const CardTitle = ({ children, className = "" }) => <h3 className={`font-semibold tracking-[-0.03em] text-slate-950 ${className}`}>{children}</h3>;
const CardDescription = ({ children, className = "" }) => <p className={`text-sm leading-6 text-slate-500 ${className}`}>{children}</p>;
const Button = ({ children, className = "", variant = "default", disabled, ...props }) => {
  const variants = {
    default: "border-transparent text-black shadow-[0_10px_25px_-10px_rgba(15,23,42,0.45)] hover:brightness-[0.98]",
    outline: "border-white/60 bg-white/50 text-slate-700 hover:bg-white/70",
    ghost: "border-transparent bg-transparent text-slate-500 hover:bg-white/50",
  };
  return <button style={variant === "default" ? { backgroundColor: BRAND.yellow } : undefined} className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium tracking-[-0.01em] transition-all duration-200 backdrop-blur ${variants[variant] || variants.default} ${disabled ? "opacity-40" : ""} ${className}`} disabled={disabled} {...props}>{children}</button>;
};
const Input = ({ className = "", ...props }) => <input className={`h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-900 shadow-[0_8px_20px_-14px_rgba(15,23,42,0.18)] outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-200/70 ${className}`} {...props} />;
const Textarea = ({ className = "", ...props }) => <textarea className={`w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-[0_8px_20px_-14px_rgba(15,23,42,0.18)] outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-200/70 ${className}`} {...props} />;
const Label = ({ children, className = "" }) => <label className={`text-sm font-medium text-slate-700 ${className}`}>{children}</label>;
const Progress = ({ value }) => <div className="h-2 w-full overflow-hidden rounded-full bg-white/70"><div className="h-2 rounded-full bg-gradient-to-r from-sky-400 via-sky-500 to-indigo-500 transition-all duration-300" style={{ width: `${value}%` }} /></div>;
const Badge = ({ children }) => <span className="inline-flex items-center rounded-full border border-slate-200/80 bg-white/80 px-2.5 py-1 text-xs font-medium text-slate-700 backdrop-blur">{children}</span>;
const Checkbox = ({ checked, onCheckedChange }) => <input type="checkbox" checked={checked} onChange={(e) => onCheckedChange(e.target.checked)} className="h-4 w-4 rounded border-slate-300 accent-sky-500" />;
const Separator = ({ className = "" }) => <div className={`border-t border-white/40 ${className}`} />;
const Alert = ({ children, className = "" }) => <div className={`rounded-[28px] border border-amber-200/70 bg-amber-50/90 px-5 py-4 backdrop-blur ${className}`}>{children}</div>;
const AlertTitle = ({ children }) => <div className="font-semibold text-amber-900">{children}</div>;
const AlertDescription = ({ children }) => <div className="text-sm text-amber-800">{children}</div>;

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const STORAGE_KEY = "event-briefing-prod-v2";
const hasSupabaseConfig = typeof SUPABASE_URL === "string" && SUPABASE_URL.startsWith("https://") && typeof SUPABASE_ANON_KEY === "string" && !!SUPABASE_ANON_KEY;
const supabase = hasSupabaseConfig ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

const serviceOptions = ["Invitation management","Registration / signup","Graphic design","Catering","Technical production","Furniture","Decoration","Staff / hosts","Entertainment","Photo / video","Client gifts","Logistics / transport","Security","Shuttle"];
const eventTypes = ["Corporate event", "Gala", "Conference", "Launch", "Roadshow", "Employee event"];
const moods = ["Elegant", "Relaxed", "Modern", "Festive", "Exclusive"];
const steps = [
  { id: "customer", label: "Client", icon: Building2 },
  { id: "event", label: "Event", icon: CalendarDays },
  { id: "location", label: "Venue", icon: MapPin },
  { id: "services", label: "Services", icon: ClipboardList },
  { id: "general", label: "Notes", icon: TriangleAlert },
  { id: "summary", label: "Summary", icon: FileText },
];
const initialData = {
  id: null, status: "draft", createdAt: null, updatedAt: null, attachments: [], activity: [],
  customer: { companyName: "", companyAddress: "", contactName: "", contactEmail: "", contactPhone: "", budget: "" },
  event: { title: "", type: "Corporate event", date: "", startTime: "", endTime: "", setupDate: "", setupTime: "", teardownTime: "", guests: "", mood: "", notes: "" },
  location: { venueName: "", address: "", capacity: "", size: "", restrictions: { nebel: false, konfetti: false, offeneFlamme: false, rigging: false }, extraRules: "" },
  services: {},
  general: { customerDislikes: "", blockedVendors: "", specialNotes: "" },
};

const schemaSQL = `create table if not exists public.event_briefings (
  id uuid primary key,
  title text,
  customer_name text,
  event_date date,
  status text,
  owner_id uuid references auth.users(id),
  payload jsonb not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);`;

function SectionHeader({ title, description }) {
  return (
    <div className="space-y-3">
      <h2 className="text-[2.2rem] font-semibold tracking-[-0.06em] text-slate-900 md:text-[2.6rem]">{title}</h2>
      <p className="max-w-xl text-[15px] leading-7 text-slate-500">{description}</p>
    </div>
  );
}
function NavButton({ icon: Icon, label, active, onClick, compact = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center ${compact ? "justify-center" : "gap-2.5"} rounded-[14px] px-2.5 py-2 text-[13px] transition-all duration-200 ${active ? "bg-white/80 text-slate-900 shadow" : "text-slate-400 hover:text-white hover:bg-white/10"}`}
    >
      <span className={`inline-flex h-7 w-7 items-center justify-center rounded-[10px] ${active ? "bg-slate-100 text-slate-900" : "bg-white/10 text-white"}`}>
        <Icon className="h-4 w-4" />
      </span>
      {compact ? null : <span className="font-medium">{label}</span>}
    </button>
  );
}
function StepPill({ step, active, done, onClick }) {
  const Icon = step.icon;
  return <button type="button" onClick={onClick} className={`flex items-center gap-3 rounded-[24px] border px-4 py-3 text-sm font-medium transition ${active ? "border-sky-200 bg-white text-slate-900 shadow-[0_16px_30px_-22px_rgba(59,130,246,0.55)]" : done ? "border-white/80 bg-white/70 text-slate-800" : "border-transparent bg-white/40 text-slate-500 hover:bg-white/65"}`}><span className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl ${active ? "bg-sky-50 text-sky-600" : done ? "bg-slate-100 text-slate-700" : "bg-white text-slate-400"}`}><Icon className="h-4 w-4" /></span><span>{step.label}</span></button>;
}
function OptionChips({ options, value, onChange }) {
  return <div className="flex flex-wrap gap-2">{options.map((option) => <button key={option} type="button" onClick={() => onChange(option)} className={`rounded-full border px-4 py-2 text-sm font-medium transition ${value === option ? "border-sky-200 bg-sky-50 text-sky-700" : "border-white/80 bg-white/75 text-slate-700 hover:bg-white"}`}>{option}</button>)}</div>;
}
function StatCard({ label, value, meta }) {
  return <Card className="border-white/10 bg-white/10 text-white backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5"><CardContent className="p-4"><div className="text-slate-300">{label}</div><div className="mt-1 text-2xl font-semibold tracking-[-0.04em]">{value}</div>{meta ? <div className="mt-2 text-xs text-slate-400">{meta}</div> : null}</CardContent></Card>;
}
function TopStat({ label, value, meta }) {
  return (
    <div className="rounded-[24px] border border-[rgba(230,231,102,0.18)] bg-white/75 p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.18)]">
      <div className="text-xs uppercase tracking-[0.16em] text-slate-400">{label}</div>
      <div className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-slate-950">{value}</div>
      {meta ? <div className="mt-1 text-sm text-slate-500">{meta}</div> : null}
    </div>
  );
}
function FormField({ label, children, hint = "" }) { return <div className="space-y-2.5 rounded-[24px] border border-slate-200/80 bg-slate-50/70 p-4 md:p-5"><Label>{label}</Label>{hint ? <p className="text-xs leading-5 text-slate-400">{hint}</p> : null}{children}</div>; }
function SummaryCard({ title, rows }) { return <Card className="h-full border-slate-200/80"><CardHeader className="border-b border-slate-100"><CardTitle className="text-lg">{title}</CardTitle></CardHeader><CardContent className="space-y-3 text-sm text-slate-600">{rows.map(([k, v]) => <div key={k} className="flex items-start justify-between gap-4"><span className="text-slate-400">{k}</span><span className="text-right font-medium text-slate-900">{v || "—"}</span></div>)}</CardContent></Card>; }
function LemonLogo({ compact = false, className = "" }) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div className={`overflow-hidden border-[6px] border-black bg-black ${compact ? "rounded-xl" : "rounded-2xl"}`} style={{ borderColor: BRAND.black }}>
        <div
          className={`px-3 py-1.5 font-black uppercase leading-none tracking-[-0.08em] text-black ${compact ? "text-2xl" : "text-4xl md:text-5xl"}`}
          style={{ backgroundColor: BRAND.yellow, color: BRAND.black }}
        >
          LEMON
        </div>
      </div>
      <div className={`font-medium uppercase leading-[0.92] tracking-[-0.04em] ${compact ? "text-lg" : "text-3xl md:text-4xl"}`} style={{ color: BRAND.yellow }}>
        <div>Event</div>
        <div>Support</div>
      </div>
    </div>
  );
}

function deriveValidation(data, selectedServices) {
  const required = [];
  if (!data.customer.companyName.trim()) required.push("Firmenname fehlt");
  if (!data.customer.contactName.trim()) required.push("Ansprechperson fehlt");
  if (!data.event.title.trim()) required.push("Eventname fehlt");
  if (!data.event.date) required.push("Eventdatum fehlt");
  if (!data.event.guests) required.push("Gästezahl fehlt");
  if (!data.location.venueName.trim()) required.push("Location fehlt");
  if (selectedServices.length === 0) required.push("Keine Agenturleistungen ausgewählt");
  const warnings = [];
  if (data.location.restrictions.nebel) warnings.push("Nebel in der Location nicht erlaubt");
  if (data.location.restrictions.konfetti) warnings.push("Konfetti in der Location nicht erlaubt");
  if (data.location.restrictions.offeneFlamme) warnings.push("Offene Flamme in der Location nicht erlaubt");
  if (!data.customer.contactEmail.trim()) warnings.push("E-Mail der Kontaktperson fehlt");
  return { required, warnings, isValid: required.length === 0 };
}
const normalizeForStorage = (data) => ({ ...data, updatedAt: new Date().toISOString() });
const appendActivity = (data, message) => ({ ...data, activity: [{ id: crypto.randomUUID(), message, timestamp: new Date().toISOString() }, ...(data.activity || [])].slice(0, 30) });
async function saveBriefingRecord(data) {
  const payload = normalizeForStorage(data);
  if (supabase) {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error("Kein eingeloggter Benutzer gefunden.");
    const row = { id: payload.id || undefined, title: payload.event.title || "Untitled event", customer_name: payload.customer.companyName || "Unbekannter Kunde", event_date: payload.event.date || null, status: payload.status, owner_id: user.id, payload };
    const { data: saved, error } = await supabase.from("event_briefings").upsert(row).select("id, created_at, updated_at").single();
    if (error) throw error;
    return { ...payload, id: saved.id, createdAt: payload.createdAt || saved.created_at, updatedAt: saved.updated_at };
  }
  const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const id = payload.id || crypto.randomUUID();
  const saved = { ...payload, id, createdAt: payload.createdAt || new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([saved, ...all.filter((item) => item.id !== id)]));
  return saved;
}
async function loadBriefings() {
  if (supabase) {
    const { data, error } = await supabase.from("event_briefings").select("id, payload, created_at, updated_at, status, title, customer_name, event_date").order("updated_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((row) => ({ ...initialData, ...row.payload, id: row.id, status: row.status || row.payload?.status || "draft", createdAt: row.payload?.createdAt || row.created_at, updatedAt: row.updated_at }));
  }
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}
async function deleteBriefing(id) {
  if (supabase) { const { error } = await supabase.from("event_briefings").delete().eq("id", id); if (error) throw error; return; }
  const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all.filter((item) => item.id !== id)));
}
const formatDateTime = (value) => !value ? "—" : new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
const formatDateOnly = (value) => !value ? "—" : new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(new Date(value));
const getStatusBadge = (status) => status === "submitted" ? "Completed" : "Draft";

function LoginScreen({
  loginMode,
  setLoginMode,
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  handleLogin,
  isLoading,
  authMessage,
}) {
  return (
    <div
      className="min-h-screen relative bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.96),_rgba(248,250,237,0.92)_18%,_rgba(241,243,198,0.52)_38%,_rgba(233,240,248,0.94)_100%),linear-gradient(180deg,_#f3f6df_0%,_#e8edf5_100%)] p-4 md:p-6 lg:p-8"
      style={{ fontFamily: APP_FONT_STACK }}
    >
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-6xl gap-6 lg:grid-cols-[1.15fr,0.85fr] lg:items-center">
        <Card className="overflow-hidden border-[rgba(230,231,102,0.26)] bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(255,255,255,0.66))] backdrop-blur-3xl">
          <CardContent className="space-y-8 p-8 md:p-12">
            <div className="overflow-hidden rounded-[28px] border border-[rgba(230,231,102,0.34)] bg-black p-5 shadow-[0_18px_40px_-22px_rgba(0,0,0,0.45)]">
              <LemonLogo className="w-full justify-between" />
            </div>

            <div className="space-y-3">
              <h1 className="text-[2.35rem] font-semibold leading-none tracking-[-0.08em] text-slate-950 md:text-[3.2rem]">
                Event Briefing Workspace
              </h1>
              
            </div>
          </CardContent>
        </Card>

        <Card className="border-[rgba(230,231,102,0.24)] bg-white/80 backdrop-blur-3xl">
          <CardContent className="space-y-6 p-8 md:p-10">
            <div className="space-y-2">
              <div
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-black shadow-[0_10px_25px_-10px_rgba(15,23,42,0.35)]"
                style={{ backgroundColor: BRAND.yellow }}
              >
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h2 className="text-[2rem] font-semibold tracking-[-0.06em] text-slate-950">Sign in</h2>
              <p className="text-sm leading-6 text-slate-500">
                Sign in to create, save, and continue working on briefings with your team.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 rounded-full border border-slate-200/80 bg-slate-50 p-1">
              <button
                type="button"
                onClick={() => setLoginMode("password")}
                className={`rounded-full px-4 py-2.5 text-sm font-medium transition ${loginMode === "password" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"}`}
              >
                Email + password
              </button>
              <button
                type="button"
                onClick={() => setLoginMode("magic")}
                className={`rounded-full px-4 py-2.5 text-sm font-medium transition ${loginMode === "magic" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"}`}
              >
                Magic Link
              </button>
            </div>

            <div className="space-y-4">
              <FormField label="Email">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <Input
                    className="pl-11"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="name@firma.com"
                  />
                </div>
              </FormField>

              {loginMode === "password" ? (
                <FormField label="Password">
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <Input
                      className="pl-11"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Passwort"
                    />
                  </div>
                </FormField>
              ) : null}
            </div>

            <Button className="w-full justify-center" onClick={handleLogin} disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
              {loginMode === "magic" ? "Send magic link" : "Sign in"}
            </Button>

            {authMessage ? <p className="text-sm text-slate-500">{authMessage}</p> : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function EventBriefingProductionAppV2() {
  const [isMobileView, setIsMobileView] = useState(typeof window !== "undefined" ? window.innerWidth < 1024 : false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [view, setView] = useState("dashboard");
  const [data, setData] = useState(initialData);
  const [briefings, setBriefings] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [showSchema, setShowSchema] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginMode, setLoginMode] = useState("password");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");

  const progress = ((currentStep + 1) / steps.length) * 100;
  const selectedServices = useMemo(
    () => Object.entries(data.services).filter(([, checked]) => checked).map(([name]) => name),
    [data.services]
  );
  const validation = useMemo(() => deriveValidation(data, selectedServices), [data, selectedServices]);
  const filteredBriefings = useMemo(
    () =>
      briefings.filter((item) => {
        const matchesSearch = [item.customer?.companyName, item.event?.title, item.location?.venueName]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" ? true : item.status === statusFilter;
        return matchesSearch && matchesStatus;
      }),
    [briefings, searchTerm, statusFilter]
  );
  const dashboardStats = useMemo(
    () => ({
      total: briefings.length,
      drafts: briefings.filter((item) => item.status === "draft").length,
      submitted: briefings.filter((item) => item.status === "submitted").length,
      customers: new Set(briefings.map((item) => item.customer?.companyName).filter(Boolean)).size,
    }),
    [briefings]
  );

  const refreshBriefings = async () => {
    if (supabase && !session) {
      setBriefings([]);
      return;
    }
    setIsLoading(true);
    try {
      setBriefings(await loadBriefings());
    } catch (error) {
      setStatusMessage(`Fehler beim Laden: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    const initAuth = async () => {
      if (!supabase) {
        setAuthLoading(false);
        return;
      }
      const { data: sessionData } = await supabase.auth.getSession();
      if (mounted) {
        setSession(sessionData.session);
        setAuthLoading(false);
      }
    };
    initAuth();
    const { data: { subscription } } = supabase
      ? supabase.auth.onAuthStateChange((_event, nextSession) => {
          setSession(nextSession);
          setAuthLoading(false);
        })
      : { data: { subscription: null } };
    return () => {
      mounted = false;
      subscription?.unsubscribe?.();
    };
  }, []);

  useEffect(() => {
    if (!authLoading) refreshBriefings();
  }, [authLoading, session]);

  useEffect(() => {
    const onResize = () => setIsMobileView(window.innerWidth < 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const setField = (group, field, value) => {
    setData((prev) => ({ ...prev, [group]: { ...prev[group], [field]: value } }));
  };
  const setRestriction = (field, value) => {
    setData((prev) => ({
      ...prev,
      location: { ...prev.location, restrictions: { ...prev.location.restrictions, [field]: value } },
    }));
  };
  const toggleService = (service) => {
    setData((prev) => ({ ...prev, services: { ...prev.services, [service]: !prev.services[service] } }));
  };

  const handleLogin = async () => {
    if (!supabase) return setAuthMessage("Supabase is not configured.");
    if (!loginEmail.trim()) return setAuthMessage("Please enter your email.");
    setAuthMessage("");
    setIsLoading(true);
    try {
      if (loginMode === "magic") {
        const { error } = await supabase.auth.signInWithOtp({
          email: loginEmail,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        setAuthMessage("Magic link was sent by email.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: loginEmail,
          password: loginPassword,
        });
        if (error) throw error;
        setAuthMessage("Signed in successfully.");
      }
    } catch (error) {
      setAuthMessage(`Login failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) return setAuthMessage(`Sign out failed: ${error.message}`);
    setView("dashboard");
    setBriefings([]);
    setData(initialData);
    setAuthMessage("Signed out successfully.");
  };

  const handleNewBriefing = () => {
    setData(appendActivity(initialData, "New briefing created"));
    setCurrentStep(0);
    setView("editor");
    setStatusMessage("New briefing started.");
  };
  const handleEditBriefing = (briefing) => {
    setData({ ...initialData, ...briefing });
    setCurrentStep(0);
    setView("editor");
    setStatusMessage("Briefing opened for editing.");
  };
  const handleViewBriefing = (briefing) => {
    setData({ ...initialData, ...briefing });
    setView("detail");
    setStatusMessage("");
  };
  const handleSave = async (nextStatus = data.status) => {
    setIsSaving(true);
    setStatusMessage("");
    try {
      const payloadWithActivity = appendActivity(
        { ...data, status: nextStatus },
        nextStatus === "submitted" ? "Briefing completed" : "Draft saved"
      );
      const saved = await saveBriefingRecord(payloadWithActivity);
      setData(saved);
      await refreshBriefings();
      setStatusMessage(nextStatus === "submitted" ? "Briefing completed successfully." : "Draft saved successfully.");
    } catch (error) {
      setStatusMessage(`Error while saving: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteBriefing(id);
      if (data.id === id) {
        setData(initialData);
        setView("dashboard");
      }
      await refreshBriefings();
      setStatusMessage("Briefing deleted.");
    } catch (error) {
      setStatusMessage(`Error while deleting: ${error.message}`);
    }
  };
  const handleAttachments = (event) => {
    const files = Array.from(event.target.files || []).map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: `${Math.round(file.size / 1024)} KB`,
      type: file.type || "Datei",
      uploadedAt: new Date().toISOString(),
    }));
    if (files.length === 0) return;
    setData((prev) => appendActivity({ ...prev, attachments: [...(prev.attachments || []), ...files] }, `${files.length} file(s) added`));
  };

  const upcomingCount = briefings.filter((item) => item.event?.date && new Date(item.event.date) >= new Date()).length;
  const wowMetrics = {
    velocity: dashboardStats.total ? `${Math.max(8, Math.min(32, dashboardStats.total * 4))}% schneller` : "Ready to start",
    focusLabel: selectedServices.length ? `${selectedServices.length} services selected` : "services pending",
  };
  const currentViewLabel = view === "dashboard" ? "Briefings" : view === "editor" ? "New briefing" : view === "detail" ? "Details" : "Profile";
  const desktopSettingsMenu = (
    <div className="absolute right-0 top-14 z-[120] w-56 rounded-[24px] border border-black/5 bg-white/95 p-2.5 text-sm text-slate-700 shadow-[0_24px_50px_-24px_rgba(15,23,42,0.4)] backdrop-blur-2xl">
      <button type="button" onClick={() => { setShowSettingsMenu(false); setView("profile"); }} className="flex w-full items-center gap-2 rounded-2xl px-3 py-2.5 text-left hover:bg-slate-100"><UserCircle className="h-4 w-4" /> Profile</button>
      <button type="button" onClick={() => { setShowSettingsMenu(false); handleNewBriefing(); }} className="flex w-full items-center gap-2 rounded-2xl px-3 py-2.5 text-left hover:bg-slate-100"><Plus className="h-4 w-4" /> New briefing</button>
      <button type="button" onClick={() => { setShowSettingsMenu(false); refreshBriefings(); }} className="flex w-full items-center gap-2 rounded-2xl px-3 py-2.5 text-left hover:bg-slate-100"><RefreshCcw className="h-4 w-4" /> Refresh</button>
      {hasSupabaseConfig && session?.user ? <button type="button" onClick={() => { setShowSettingsMenu(false); handleSignOut(); }} className="flex w-full items-center gap-2 rounded-2xl px-3 py-2.5 text-left hover:bg-slate-100"><LogOut className="h-4 w-4" /> Sign out</button> : null}
    </div>
  );

  const mobileSettingsSheet = (
    <>
      <button type="button" aria-label="Close settings" onClick={() => setShowSettingsMenu(false)} className="fixed inset-0 z-[110] bg-slate-950/30 backdrop-blur-[2px] lg:hidden" />
      <div className="fixed inset-x-3 top-16 z-[120] lg:hidden">
        <div className="rounded-[28px] border border-black/5 bg-white/96 p-3 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.35)] backdrop-blur-2xl">
          <div className="mb-2 flex items-center justify-between px-2 py-1">
            <div>
              <div className="text-sm font-semibold text-slate-950">Settings</div>
              <div className="text-xs text-slate-500">Quick actions and account</div>
            </div>
            <button type="button" onClick={() => setShowSettingsMenu(false)} className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600">✕</button>
          </div>
          <div className="grid gap-2">
            <button type="button" onClick={() => { setShowSettingsMenu(false); setView("profile"); }} className="flex w-full items-center gap-3 rounded-[20px] px-4 py-3 text-left text-sm font-medium text-slate-800 hover:bg-slate-100"><UserCircle className="h-4 w-4" /> Profile</button>
            <button type="button" onClick={() => { setShowSettingsMenu(false); handleNewBriefing(); }} className="flex w-full items-center gap-3 rounded-[20px] px-4 py-3 text-left text-sm font-medium text-slate-800 hover:bg-slate-100"><Plus className="h-4 w-4" /> New briefing</button>
            <button type="button" onClick={() => { setShowSettingsMenu(false); refreshBriefings(); }} className="flex w-full items-center gap-3 rounded-[20px] px-4 py-3 text-left text-sm font-medium text-slate-800 hover:bg-slate-100"><RefreshCcw className="h-4 w-4" /> Refresh</button>
            {hasSupabaseConfig && session?.user ? <button type="button" onClick={() => { setShowSettingsMenu(false); handleSignOut(); }} className="flex w-full items-center gap-3 rounded-[20px] px-4 py-3 text-left text-sm font-medium text-slate-800 hover:bg-slate-100"><LogOut className="h-4 w-4" /> Sign out</button> : null}
          </div>
        </div>
      </div>
    </>
  );

  const summaryCards = [
    { title: "Kunde", rows: [["Firma", data.customer.companyName], ["Kontakt", data.customer.contactName], ["E-Mail", data.customer.contactEmail], ["Budget", data.customer.budget]] },
    { title: "Event", rows: [["Name", data.event.title], ["Datum", formatDateOnly(data.event.date)], ["Gäste", data.event.guests], ["Stimmung", data.event.mood]] },
    { title: "Location", rows: [["Name", data.location.venueName], ["Adresse", data.location.address], ["Kapazität", data.location.capacity], ["Größe", data.location.size]] },
  ];

  const renderEditorStep = () => {
    if (currentStep === 0) {
      return (
        <div className="grid gap-6">
          <Card className="border-slate-200/80 bg-white/80">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-lg">Client details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-5 md:grid-cols-2">
              <FormField label="Company name *"><Input value={data.customer.companyName} onChange={(e) => setField("customer", "companyName", e.target.value)} /></FormField>
              <FormField label="Company address"><Input value={data.customer.companyAddress} onChange={(e) => setField("customer", "companyAddress", e.target.value)} /></FormField>
              <FormField label="Primary contact *"><Input value={data.customer.contactName} onChange={(e) => setField("customer", "contactName", e.target.value)} /></FormField>
              <FormField label="Email"><Input type="email" value={data.customer.contactEmail} onChange={(e) => setField("customer", "contactEmail", e.target.value)} /></FormField>
              <FormField label="Phone"><Input value={data.customer.contactPhone} onChange={(e) => setField("customer", "contactPhone", e.target.value)} /></FormField>
              <FormField label="Budget range"><Input value={data.customer.budget} onChange={(e) => setField("customer", "budget", e.target.value)} placeholder="e.g. EUR 50,000" /></FormField>
            </CardContent>
          </Card>
        </div>
      );
    }
    if (currentStep === 1) {
      return (
        <div className="grid gap-6">
          <Card className="border-slate-200/80 bg-white/80">
            <CardHeader className="border-b border-slate-100"><CardTitle className="text-lg">Event overview</CardTitle></CardHeader>
            <CardContent className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2"><FormField label="Event name *"><Input value={data.event.title} onChange={(e) => setField("event", "title", e.target.value)} /></FormField></div>
              <div className="md:col-span-2"><FormField label="Event type"><OptionChips options={eventTypes} value={data.event.type} onChange={(value) => setField("event", "type", value)} /></FormField></div>
              <FormField label="Event date *"><Input type="date" value={data.event.date} onChange={(e) => setField("event", "date", e.target.value)} /></FormField>
              <FormField label="Guest count *"><Input type="number" min="0" value={data.event.guests} onChange={(e) => setField("event", "guests", e.target.value)} /></FormField>
              <FormField label="Start time"><Input type="time" value={data.event.startTime} onChange={(e) => setField("event", "startTime", e.target.value)} /></FormField>
              <FormField label="End time"><Input type="time" value={data.event.endTime} onChange={(e) => setField("event", "endTime", e.target.value)} /></FormField>
              <FormField label="Setup date"><Input type="date" value={data.event.setupDate || ""} onChange={(e) => setField("event", "setupDate", e.target.value)} /></FormField>
              <FormField label="Setup time"><Input type="time" value={data.event.setupTime} onChange={(e) => setField("event", "setupTime", e.target.value)} /></FormField>
              <FormField label="Teardown time"><Input type="time" value={data.event.teardownTime} onChange={(e) => setField("event", "teardownTime", e.target.value)} /></FormField>
              <div className="md:col-span-2"><FormField label="Desired mood"><OptionChips options={moods} value={data.event.mood} onChange={(value) => setField("event", "mood", value)} /></FormField></div>
              <div className="md:col-span-2"><FormField label="Agenda / notes"><Textarea rows={5} value={data.event.notes} onChange={(e) => setField("event", "notes", e.target.value)} /></FormField></div>
            </CardContent>
          </Card>
        </div>
      );
    }
    if (currentStep === 2) {
      return (
        <div className="space-y-6">
          <Card className="border-slate-200/80 bg-white/80">
            <CardHeader className="border-b border-slate-100"><CardTitle className="text-lg">Venue</CardTitle></CardHeader>
            <CardContent className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2"><FormField label="Venue name *"><Input value={data.location.venueName} onChange={(e) => setField("location", "venueName", e.target.value)} /></FormField></div>
              <div className="md:col-span-2"><FormField label="Address"><Input value={data.location.address} onChange={(e) => setField("location", "address", e.target.value)} /></FormField></div>
              <FormField label="Capacity"><Input value={data.location.capacity} onChange={(e) => setField("location", "capacity", e.target.value)} /></FormField>
              <FormField label="Size in m²"><Input value={data.location.size} onChange={(e) => setField("location", "size", e.target.value)} /></FormField>
            </CardContent>
          </Card>
          <Card className="border-white/80 bg-white/60 backdrop-blur-xl">
            <CardHeader className="border-b border-slate-100"><CardTitle className="text-lg">Restrictions</CardTitle></CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2">
              {[["nebel", "No haze allowed"], ["konfetti", "No confetti allowed"], ["offeneFlamme", "No open flame allowed"], ["rigging", "Rigging not allowed"]].map(([key, label]) => (
                <label key={key} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                  <Checkbox checked={data.location.restrictions[key]} onCheckedChange={(checked) => setRestriction(key, Boolean(checked))} />
                  <span className="text-sm font-medium text-slate-700">{label}</span>
                </label>
              ))}
            </CardContent>
          </Card>
          <div className="grid gap-5 md:grid-cols-[1fr,320px]">
            <FormField label="Additional rules"><Textarea rows={5} value={data.location.extraRules} onChange={(e) => setField("location", "extraRules", e.target.value)} placeholder="e.g. volume until 22:00, delivery slot 08:00–11:00" /></FormField>
            <Card className="border-white/80 bg-white/70 backdrop-blur-xl">
              <CardHeader className="border-b border-white/60"><CardTitle className="text-lg">Documents & photos</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-600"><Upload className="h-4 w-4" /> Select files<input type="file" multiple onChange={handleAttachments} className="hidden" /></label>
                <div className="flex flex-wrap gap-2">{data.attachments?.map((file) => <Badge key={file.id}>{file.name}</Badge>)}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }
    if (currentStep === 3) {
      return (
        <div className="space-y-6">
          <Card className="border-slate-200/80 bg-white/80">
            <CardHeader className="border-b border-slate-100"><CardTitle className="text-lg">Agency services</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {serviceOptions.map((service) => {
                  const active = Boolean(data.services[service]);
                  return (
                    <button key={service} type="button" onClick={() => toggleService(service)} className={`rounded-3xl border p-5 text-left transition ${active ? "border-slate-950 bg-slate-950 text-white shadow-[0_18px_40px_-24px_rgba(15,23,42,0.8)]" : "border-slate-200 bg-white hover:bg-slate-50"}`}>
                      <div className="flex items-center justify-between gap-3"><span className="font-medium">{service}</span><div className={`h-5 w-5 rounded-full border ${active ? "border-white bg-white" : "border-slate-300"}`} /></div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }
    if (currentStep === 4) {
      return (
        <div className="grid gap-6">
          <Card className="border-slate-200/80 bg-white/80">
            <CardHeader className="border-b border-slate-100"><CardTitle className="text-lg">Notes</CardTitle></CardHeader>
            <CardContent className="grid gap-5">
              <FormField label="Client dislikes"><Textarea rows={4} value={data.general.customerDislikes} onChange={(e) => setField("general", "customerDislikes", e.target.value)} placeholder="e.g. no loud music, no bright colours" /></FormField>
              <FormField label="Blocked vendors / partners"><Textarea rows={4} value={data.general.blockedVendors} onChange={(e) => setField("general", "blockedVendors", e.target.value)} placeholder="e.g. Caterer X, AV company Y" /></FormField>
              <FormField label="Additional notes"><Textarea rows={5} value={data.general.specialNotes} onChange={(e) => setField("general", "specialNotes", e.target.value)} placeholder="e.g. CEO wants a premium welcome, sustainability is important" /></FormField>
            </CardContent>
          </Card>
        </div>
      );
    }
    return (
      <div className="space-y-6">
        {!validation.isValid ? <Alert><div className="flex gap-3"><TriangleAlert className="mt-0.5 h-4 w-4" /><div><AlertTitle>Required information missing</AlertTitle><AlertDescription><ul className="mt-2 space-y-1">{validation.required.map((item) => <li key={item}>• {item}</li>)}</ul></AlertDescription></div></div></Alert> : null}
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{summaryCards.map((card) => <SummaryCard key={card.title} title={card.title} rows={card.rows} />)}</div>
        <Card className="border-amber-200 bg-amber-50"><CardHeader className="border-b border-amber-200/70"><CardTitle className="text-lg text-amber-900">Risks & notes</CardTitle></CardHeader><CardContent>{validation.warnings.length > 0 ? <ul className="space-y-2 text-sm text-amber-900">{validation.warnings.map((risk) => <li key={risk} className="flex items-start gap-2"><TriangleAlert className="mt-0.5 h-4 w-4" /><span>{risk}</span></li>)}</ul> : <p className="text-sm text-amber-900">No additional warnings detected.</p>}</CardContent></Card>
      </div>
    );
  };

  if (hasSupabaseConfig && !authLoading && !session?.user) {
    return <LoginScreen loginMode={loginMode} setLoginMode={setLoginMode} loginEmail={loginEmail} setLoginEmail={setLoginEmail} loginPassword={loginPassword} setLoginPassword={setLoginPassword} handleLogin={handleLogin} isLoading={isLoading} authMessage={authMessage} />;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.95),_rgba(240,246,255,0.9)_18%,_rgba(226,238,255,0.7)_38%,_rgba(233,240,248,0.92)_100%),linear-gradient(180deg,_#eef3f8_0%,_#e7edf5_100%)] p-3 md:p-6 lg:p-8" style={{ fontFamily: APP_FONT_STACK, paddingBottom: isMobileView ? `${MOBILE_NAV_HEIGHT + 20}px` : undefined }}>
      <div className="mx-auto relative z-10 flex max-w-7xl flex-col gap-6">
        <Card className="overflow-visible border-[rgba(230,231,102,0.18)] bg-[linear-gradient(180deg,rgba(10,10,10,0.98),rgba(24,24,24,0.97))] text-white shadow-[0_28px_70px_-34px_rgba(15,23,42,0.72)]">
          <CardContent className="overflow-visible flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between md:p-6">
            <div className="flex min-w-0 items-center gap-3">
              <LemonLogo compact className="shrink-0 scale-[0.52] origin-left md:scale-100" />
              <div className="min-w-0"><div className="text-[10px] uppercase tracking-[0.18em] text-slate-400 md:text-xs">{currentViewLabel}</div><div className="truncate text-[13px] font-semibold tracking-[-0.04em] text-white md:text-xl">Event Briefing Workspace</div></div>
              
            </div>
            <div className="hidden md:flex flex-col gap-3 md:flex-row md:items-center">
              <div className="relative min-w-[240px]"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" /><input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search client, event or venue" className="h-11 w-full rounded-full border border-white/10 bg-white/5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-500 backdrop-blur transition focus:border-[rgba(230,231,102,0.28)]" /></div>
              
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 lg:gap-6 lg:grid-cols-[220px,minmax(0,1fr)] xl:grid-cols-[232px,minmax(0,1fr)] items-start">
          <Card className="hidden lg:block self-start overflow-hidden border-[rgba(230,231,102,0.14)] bg-[linear-gradient(180deg,rgba(10,10,10,0.98),rgba(24,24,24,0.97))] text-white shadow-[0_24px_70px_-34px_rgba(15,23,42,0.7)] lg:sticky lg:top-6">
            <CardHeader className="px-4 py-4"><div className="flex items-center gap-3"><div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur overflow-hidden"><LemonLogo compact className="scale-[0.52] origin-center" /></div><div className="min-w-0"><CardTitle className="text-sm text-white tracking-[-0.02em]">Workspace</CardTitle><CardDescription className="truncate text-[11px] leading-4 text-slate-400">Dashboard, editor, profile</CardDescription></div></div></CardHeader>
            <CardContent className="space-y-3 px-4 py-4 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))]">
              <div className="rounded-[18px] border border-[rgba(230,231,102,0.12)] bg-white/5 p-2 space-y-1 backdrop-blur-3xl">
  <NavButton icon={Plus} label="New" active={view === "editor"} onClick={() => handleNewBriefing()} />
  <NavButton icon={FolderOpen} label="Briefings" active={view === "dashboard"} onClick={() => setView("dashboard")} />
  <NavButton icon={UserCircle} label="Profile" active={view === "profile"} onClick={() => setView("profile")} />
</div>
              {statusMessage ? <p className="text-sm text-slate-300">{statusMessage}</p> : null}
            </CardContent>
          </Card>

          <div className="min-w-0 space-y-6">
            {view === "dashboard" ? (
              <Card className="relative z-0 overflow-hidden border-[rgba(230,231,102,0.22)] bg-white/72 backdrop-blur-2xl shadow-[0_18px_40px_-28px_rgba(15,23,42,0.16)]">
                <CardContent className="space-y-4 p-4 md:p-6">
                  <SectionHeader title="Briefings" description="Search, filter & open existing projects" />
                  <div className="grid gap-3 md:grid-cols-[1fr,190px]"><div className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><Input className="pl-11" placeholder="Search client, event or venue" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div><select className="h-12 rounded-2xl border border-white/80 bg-white/80 px-4 text-sm text-slate-700 outline-none backdrop-blur focus:border-sky-200 focus:ring-4 focus:ring-sky-100" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="all">All statuses</option><option value="draft">Drafts only</option><option value="submitted">Completed only</option></select></div>
                  <div className="grid gap-4">{filteredBriefings.length === 0 ? <Card className="border-dashed border-white/80 bg-white/60 backdrop-blur"><CardContent className="flex min-h-[280px] flex-col items-center justify-center gap-4 text-center"><div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-100 text-slate-500"><FolderOpen className="h-6 w-6" /></div><div className="space-y-1"><p className="text-lg font-semibold text-slate-900">No briefings found yet</p><p className="text-sm text-slate-500">Create your first project or adjust your search.</p></div><Button onClick={handleNewBriefing}><Plus className="h-4 w-4" /> Start new briefing</Button></CardContent></Card> : filteredBriefings.map((item) => <Card key={item.id} className="border-white/80 bg-white/76 transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-28px_rgba(15,23,42,0.22)] backdrop-blur-xl"><CardContent className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between"><div className="space-y-3"><div className="flex flex-wrap items-center gap-2"><h3 className="text-lg font-semibold text-slate-900">{item.event?.title || "Untitled event"}</h3><Badge>{getStatusBadge(item.status)}</Badge></div><div className="flex flex-wrap gap-4 text-sm text-slate-600"><span className="flex items-center gap-2"><Building2 className="text-slate-400" /> {item.customer?.companyName || "—"}</span><span className="flex items-center gap-2"><CalendarDays className="text-slate-400" /> {formatDateOnly(item.event?.date)}</span><span className="flex items-center gap-2"><MapPin className="text-slate-400" /> {item.location?.venueName || "—"}</span></div><p className="text-xs text-slate-500">Updated: {formatDateTime(item.updatedAt)}</p></div><div className="flex flex-wrap gap-2"><Button variant="outline" onClick={() => handleViewBriefing(item)}><Eye className="h-4 w-4" /> View</Button><Button variant="outline" onClick={() => handleEditBriefing(item)}><Pencil className="h-4 w-4" /> Edit</Button><Button variant="outline" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4" /> Delete</Button></div></CardContent></Card>)}</div>
                </CardContent>
              </Card>
            ) : null}

            {view === "profile" ? <Card className="relative z-0 overflow-hidden border-[rgba(230,231,102,0.22)] bg-white/72 backdrop-blur-2xl shadow-[0_18px_40px_-28px_rgba(15,23,42,0.16)]"><CardContent className="space-y-6 p-4 md:p-6"><div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"><SectionHeader title="Profile" description="Personal information, account status, and quick actions." /><Button variant="outline" onClick={() => setView("dashboard")}>Back</Button></div><div className="grid gap-4 xl:grid-cols-[0.9fr,1.1fr]"><Card className="border-slate-200/80 bg-white/85"><CardHeader className="border-b border-slate-100"><CardTitle className="text-lg">Account</CardTitle></CardHeader><CardContent className="space-y-4"><div className="flex items-center gap-4"><div className="inline-flex h-16 w-16 items-center justify-center rounded-full text-black" style={{ backgroundColor: BRAND.yellow }}><UserCircle className="h-8 w-8" /></div><div><div className="text-lg font-semibold text-slate-950">{session?.user?.email || "Demo mode"}</div><div className="text-sm text-slate-500">{hasSupabaseConfig ? "Authenticated team account" : "Local mode without Supabase"}</div></div></div><div className="grid gap-3 sm:grid-cols-2"><TopStat label="Briefings" value={dashboardStats.total} meta="all projects" /><TopStat label="Drafts" value={dashboardStats.drafts} meta="open items" /></div></CardContent></Card><Card className="border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(248,250,237,0.76))]"><CardHeader className="border-b border-slate-100"><CardTitle className="text-lg">Quick actions</CardTitle><CardDescription>Everything important in one place.</CardDescription></CardHeader><CardContent className="grid gap-3 sm:grid-cols-2"><Button className="w-full" onClick={handleNewBriefing}><Plus className="h-4 w-4" /> New briefing</Button><Button variant="outline" className="w-full" onClick={refreshBriefings}><RefreshCcw className="h-4 w-4" /> Refresh</Button><Button variant="outline" className="w-full" onClick={() => setView("editor")}><Pencil className="h-4 w-4" /> Open editor</Button>{hasSupabaseConfig && session?.user ? <Button variant="outline" className="w-full" onClick={handleSignOut}><LogOut className="h-4 w-4" /> Sign out</Button> : <Button variant="outline" className="w-full" onClick={() => setView("dashboard")}><LayoutDashboard className="h-4 w-4" /> Dashboard</Button>}</CardContent></Card></div></CardContent></Card> : null}

            {view === "detail" ? <Card className="relative z-0 overflow-hidden border-[rgba(230,231,102,0.22)] bg-white/72 backdrop-blur-2xl shadow-[0_18px_40px_-28px_rgba(15,23,42,0.16)]"><CardContent className="space-y-6 p-6 md:p-8"><div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"><SectionHeader title={data.event.title || "Details"} description="Complete briefing with attachments and activity history." /><div className="flex flex-wrap gap-2"><Button variant="outline" onClick={() => handleEditBriefing(data)}><Pencil className="h-4 w-4" /> Edit</Button><Button variant="outline" onClick={() => setView("dashboard")}>Back to list</Button></div></div><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{summaryCards.map((card) => <SummaryCard key={card.title} title={card.title} rows={card.rows} />)}</div><div className="grid gap-3 xl:grid-cols-2"><Card><CardHeader className="border-b border-slate-100"><CardTitle className="text-lg">Notes & services</CardTitle></CardHeader><CardContent className="space-y-4 text-sm text-slate-600"><div><p className="mb-2 font-medium text-slate-900">Services</p><div className="flex flex-wrap gap-2">{selectedServices.length ? selectedServices.map((service) => <Badge key={service}>{service}</Badge>) : <span>—</span>}</div></div><div className="space-y-2"><p><strong>Client dislikes:</strong> {data.general.customerDislikes || "—"}</p><p><strong>Exclusions:</strong> {data.general.blockedVendors || "—"}</p><p><strong>Additional notes:</strong> {data.general.specialNotes || "—"}</p></div></CardContent></Card><Card><CardHeader className="border-b border-slate-100"><CardTitle className="text-lg">Venue rules</CardTitle></CardHeader><CardContent className="space-y-4 text-sm text-slate-600"><div className="flex flex-wrap gap-2">{Object.entries(data.location.restrictions).filter(([, value]) => value).map(([key]) => <Badge key={key}>{key}</Badge>)}</div><p><strong>Additional rules:</strong> {data.location.extraRules || "—"}</p></CardContent></Card></div><div className="grid gap-3 xl:grid-cols-2"><Card><CardHeader className="border-b border-slate-100"><CardTitle className="text-lg">Attachments</CardTitle></CardHeader><CardContent className="space-y-3 text-sm text-slate-600">{data.attachments?.length ? data.attachments.map((file) => <div key={file.id} className="rounded-2xl border border-slate-200 p-4"><div className="font-medium text-slate-900">{file.name}</div><div>{file.type} · {file.size}</div><div className="text-xs text-slate-500">Uploaded: {formatDateTime(file.uploadedAt)}</div></div>) : <p>No attachments yet.</p>}</CardContent></Card><Card><CardHeader className="border-b border-slate-100"><CardTitle className="text-lg">Activity log</CardTitle></CardHeader><CardContent className="space-y-3 text-sm text-slate-600">{data.activity?.length ? data.activity.map((entry) => <div key={entry.id} className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4"><div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-slate-600"><Clock3 className="h-4 w-4" /></div><div><div className="font-medium text-slate-900">{entry.message}</div><div className="text-xs text-slate-500">{formatDateTime(entry.timestamp)}</div></div></div>) : <p>No activity yet.</p>}</CardContent></Card></div></CardContent></Card> : null}

            {view === "editor" ? <Card className="relative z-0 overflow-hidden border-[rgba(230,231,102,0.22)] bg-white/72 backdrop-blur-2xl shadow-[0_18px_40px_-28px_rgba(15,23,42,0.16)]"><CardContent className="space-y-8 p-5 md:p-6 xl:p-8"><div className="space-y-5">
                  <div className="flex items-center gap-3">
                    {steps.map((step, index) => (
                      <div key={step.id} className="flex-1">
                        <div className={`h-1.5 rounded-full transition-all duration-300 ${index < currentStep ? "bg-slate-900" : index === currentStep ? "bg-slate-500" : "bg-slate-200"}`} />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Step {currentStep + 1} of {steps.length}</div>
                    <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${data.status === "submitted" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                      {data.status === "submitted" ? <CheckCircle2 className="h-4 w-4" /> : <Clock3 className="h-4 w-4" />}
                    </span>
                  </div>
                </div>{renderEditorStep()}<div className="sticky bottom-3 z-20 rounded-[24px] border border-white/80 bg-white/90 px-3 py-3 md:px-5 md:py-4 shadow-[0_20px_40px_-28px_rgba(15,23,42,0.28)] backdrop-blur-xl"><div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:justify-end sm:gap-3"><Button variant="outline" className="w-full sm:w-auto rounded-full border-slate-200 bg-white text-slate-900 hover:bg-slate-50" onClick={() => setCurrentStep((s) => Math.max(s - 1, 0))} disabled={currentStep === 0}><ChevronLeft className="h-4 w-4" /> Back</Button>{currentStep === steps.length - 1 ? <Button className="w-full sm:w-auto rounded-full" onClick={() => handleSave("submitted")} disabled={isSaving || !validation.isValid}>Next <ChevronRight className="h-4 w-4" /></Button> : <Button className="w-full sm:w-auto rounded-full" onClick={() => setCurrentStep((s) => Math.min(s + 1, steps.length - 1))}>Next <ChevronRight className="h-4 w-4" /></Button>}</div></div></CardContent></Card> : null}
          </div>
        </div>
        {isMobileView ? (
          <div className="fixed inset-x-3 bottom-3 z-[60] lg:hidden">
            <div className="grid grid-cols-3 gap-2 rounded-[26px] border border-black/10 bg-white/90 p-2 shadow-[0_18px_40px_-20px_rgba(15,23,42,0.35)] backdrop-blur-2xl">
              <button type="button" onClick={handleNewBriefing} className={`flex flex-col items-center justify-center gap-0.5 rounded-[18px] px-2 py-2 text-[11px] font-medium ${view === "editor" ? "bg-slate-950 text-white" : "text-slate-500"}`}><Plus className="h-4 w-4" /><span>NEW</span></button>
              <button type="button" onClick={() => setView("dashboard")} className={`flex flex-col items-center justify-center gap-1 rounded-[18px] px-2 py-2 text-[11px] font-medium ${view === "dashboard" ? "bg-slate-950 text-white" : "text-slate-500"}`}><FolderOpen className="h-4 w-4" /><span>Briefings</span></button>
              <button type="button" onClick={() => setView("profile")} className={`flex flex-col items-center justify-center gap-1 rounded-[18px] px-2 py-2 text-[11px] font-medium ${view === "profile" ? "bg-slate-950 text-white" : "text-slate-500"}`}><UserCircle className="h-4 w-4" /><span>Profile</span></button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
