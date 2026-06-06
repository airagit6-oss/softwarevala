import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, Building2, Store, PenTool, Package, Award, Repeat, ShoppingBag,
  GraduationCap, HeartPulse, ShoppingCart, Factory, HardHat, Hotel, Bus,
  Landmark, HandHeart, Home as HomeIcon, Scale, Shield, Brain, Sparkles,
  ArrowRight, Cpu, BarChart3, Bot, Headphones, Workflow,
} from 'lucide-react';

/* SECTION 02 — Quick Action Cards */
const quickActions = [
  { title: 'Become Reseller', desc: 'Sell 1000+ premium products', icon: Store, href: '/reseller-apply', tone: 'from-[hsl(188_100%_50%)] to-[hsl(258_100%_68%)]' },
  { title: 'Become Vendor', desc: 'List your software globally', icon: Building2, href: '/vendor-apply', tone: 'from-[hsl(258_100%_68%)] to-[hsl(320_90%_60%)]' },
  { title: 'Become Franchise', desc: 'Own a regional territory', icon: Award, href: '/franchise-apply', tone: 'from-[hsl(51_100%_50%)] to-[hsl(30_100%_55%)]' },
  { title: 'Become Author', desc: 'Publish & earn royalties', icon: PenTool, href: '/author-apply', tone: 'from-[hsl(145_70%_50%)] to-[hsl(188_100%_50%)]' },
];

export const QuickActionCards = () => (
  <section className="px-6 py-8">
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {quickActions.map(a => (
        <Link
          key={a.title}
          to={a.href}
          className="group relative h-[160px] overflow-hidden rounded-[18px] border border-white/10 bg-card p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-accent/40 hover:shadow-[0_20px_60px_-20px_hsl(var(--accent)/0.6)]"
        >
          <div className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${a.tone} opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40`} />
          <div className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${a.tone} shadow-lg`}>
            <a.icon className="h-6 w-6 text-background" />
          </div>
          <h3 className="font-display text-lg font-bold text-foreground">{a.title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{a.desc}</p>
          <ArrowRight className="absolute bottom-5 right-5 h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-accent" />
        </Link>
      ))}
    </div>
  </section>
);

/* SECTION 03 — Live Ecosystem Stats */
const stats = [
  { label: 'Products', value: 2400, suffix: '+', icon: Package, color: 'text-[hsl(188_100%_55%)]' },
  { label: 'Customers', value: 184000, suffix: '+', icon: Users, color: 'text-[hsl(258_100%_72%)]' },
  { label: 'Licenses', value: 612000, suffix: '+', icon: Shield, color: 'text-[hsl(51_100%_55%)]' },
  { label: 'Renewals', value: 98, suffix: '%', icon: Repeat, color: 'text-[hsl(145_70%_55%)]' },
  { label: 'Resellers', value: 5200, suffix: '+', icon: Store, color: 'text-[hsl(188_100%_55%)]' },
  { label: 'Vendors', value: 870, suffix: '+', icon: Building2, color: 'text-[hsl(258_100%_72%)]' },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    const dur = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.floor(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span className="tabular-nums">{n.toLocaleString()}{suffix}</span>;
};

export const LiveStats = () => (
  <section className="px-6 py-8">
    <div className="mb-5 flex items-end justify-between">
      <div>
        <p className="text-[11px] uppercase tracking-[0.25em] text-accent">Live Ecosystem</p>
        <h2 className="font-display text-2xl font-bold text-foreground">Real-time platform pulse</h2>
      </div>
      <span className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
        Updated just now
      </span>
    </div>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {stats.map(s => (
        <div key={s.label} className="rounded-[18px] border border-white/10 bg-card p-5 transition-all hover:-translate-y-1 hover:border-accent/40">
          <s.icon className={`mb-3 h-5 w-5 ${s.color}`} />
          <div className="font-display text-2xl font-bold text-foreground">
            <Counter value={s.value} suffix={s.suffix} />
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
        </div>
      ))}
    </div>
  </section>
);

/* SECTION 05 — Industry Marketplace 4×3 */
const industries = [
  { name: 'Education', icon: GraduationCap, count: '420+ apps' },
  { name: 'Healthcare', icon: HeartPulse, count: '310+ apps' },
  { name: 'Retail', icon: ShoppingCart, count: '280+ apps' },
  { name: 'Manufacturing', icon: Factory, count: '195+ apps' },
  { name: 'Construction', icon: HardHat, count: '140+ apps' },
  { name: 'Hotel', icon: Hotel, count: '220+ apps' },
  { name: 'Transport', icon: Bus, count: '95+ apps' },
  { name: 'Finance', icon: Landmark, count: '260+ apps' },
  { name: 'NGO', icon: HandHeart, count: '70+ apps' },
  { name: 'Real Estate', icon: HomeIcon, count: '180+ apps' },
  { name: 'Legal', icon: Scale, count: '90+ apps' },
  { name: 'Government', icon: Shield, count: '60+ apps' },
];

export const IndustryGrid = () => (
  <section className="px-6 py-8">
    <div className="mb-5">
      <p className="text-[11px] uppercase tracking-[0.25em] text-[hsl(258_100%_72%)]">Industries</p>
      <h2 className="font-display text-2xl font-bold text-foreground">Built for every industry</h2>
    </div>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {industries.map(ind => (
        <Link
          key={ind.name}
          to={`/category/${ind.name.toLowerCase().replace(/\s+/g, '-')}`}
          className="group relative overflow-hidden rounded-[18px] border border-white/10 bg-card p-6 transition-all hover:-translate-y-2 hover:border-accent/40 hover:shadow-[0_20px_60px_-20px_hsl(188_100%_50%/0.5)]"
        >
          <div className="pointer-events-none absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-gradient-to-br from-[hsl(188_100%_50%)] to-[hsl(258_100%_68%)] opacity-10 blur-2xl transition-opacity group-hover:opacity-25" />
          <ind.icon className="mb-4 h-8 w-8 text-accent transition-transform group-hover:scale-110" />
          <h3 className="font-display text-base font-bold text-foreground">{ind.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{ind.count}</p>
          <ArrowRight className="absolute right-5 top-5 h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
        </Link>
      ))}
    </div>
  </section>
);

/* SECTION 09 — AI Software Zone */
const aiCards = [
  { name: 'AI CRM', desc: 'Predictive lead scoring', icon: Brain },
  { name: 'AI ERP', desc: 'Autonomous operations', icon: Cpu },
  { name: 'AI HRMS', desc: 'Smart talent matching', icon: Users },
  { name: 'AI Analytics', desc: 'Conversational BI', icon: BarChart3 },
  { name: 'AI Automation', desc: 'No-code workflows', icon: Workflow },
  { name: 'AI Support', desc: '24/7 agent copilots', icon: Headphones },
];

export const AIZone = () => (
  <section className="relative mx-6 my-10 overflow-hidden rounded-[24px] border border-[hsl(258_100%_68%/0.3)] bg-gradient-to-br from-[hsl(258_100%_15%/0.6)] via-card to-[hsl(188_100%_15%/0.5)] p-8">
    <div className="pointer-events-none absolute -top-20 left-1/2 h-80 w-[120%] -translate-x-1/2 rounded-full bg-[hsl(258_100%_68%/0.18)] blur-3xl" />
    <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-[hsl(188_100%_50%/0.2)] blur-3xl" />
    <div className="relative mb-6 flex items-center justify-between">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(258_100%_68%/0.4)] bg-[hsl(258_100%_68%/0.1)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[hsl(258_100%_82%)]">
          <Bot className="h-3 w-3" /> AI Powered
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold text-foreground">AI Software Zone</h2>
        <p className="mt-1 text-sm text-muted-foreground">Next-gen intelligent suites for the AI-native enterprise.</p>
      </div>
      <Link to="/category/ai" className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-foreground transition-colors hover:border-accent/40 md:inline-flex">
        Explore all <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
    <div className="relative grid grid-cols-2 gap-4 md:grid-cols-3">
      {aiCards.map(c => (
        <div key={c.name} className="group rounded-[18px] border border-white/10 bg-background/60 p-5 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-[hsl(258_100%_68%/0.5)] hover:shadow-[0_0_40px_-10px_hsl(258_100%_68%/0.7)]">
          <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(258_100%_68%)] to-[hsl(188_100%_50%)] shadow-lg">
            <c.icon className="h-5 w-5 text-background" />
          </div>
          <h3 className="font-display text-base font-bold text-foreground">{c.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{c.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

/* SECTION 20 — Final CTA */
export const FinalCTA = () => (
  <section className="relative mx-6 my-12 overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-card via-[hsl(258_60%_12%)] to-card p-10">
    <div className="pointer-events-none absolute inset-0 opacity-30" style={{
      backgroundImage: 'linear-gradient(to right, hsl(188 100% 50% / 0.15) 1px, transparent 1px), linear-gradient(to bottom, hsl(188 100% 50% / 0.15) 1px, transparent 1px)',
      backgroundSize: '48px 48px',
    }} />
    <div className="pointer-events-none absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-[hsl(258_100%_68%/0.25)] blur-3xl" />
    <div className="pointer-events-none absolute -bottom-32 right-1/4 h-72 w-72 rounded-full bg-[hsl(188_100%_50%/0.25)] blur-3xl" />
    <div className="relative text-center">
      <Sparkles className="mx-auto mb-4 h-8 w-8 text-[hsl(51_100%_55%)]" />
      <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
        Ready to scale with <span className="bg-gradient-to-r from-[hsl(188_100%_55%)] via-[hsl(258_100%_72%)] to-[hsl(51_100%_55%)] bg-clip-text text-transparent">Software Vala</span>?
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
        The world's first AI-native enterprise marketplace. 2400+ products, 184k+ customers, 1 unified platform.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link to="/marketplace" className="rounded-xl bg-gradient-to-r from-[hsl(188_100%_50%)] to-[hsl(258_100%_68%)] px-6 py-3 text-sm font-semibold text-background shadow-[0_10px_40px_-10px_hsl(188_100%_50%/0.7)] transition-transform hover:scale-105">
          Explore Marketplace
        </Link>
        <Link to="/demo" className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-md transition-colors hover:border-accent/40">
          Book a Demo
        </Link>
        <Link to="/reseller-apply" className="rounded-xl border border-[hsl(51_100%_55%/0.4)] bg-[hsl(51_100%_55%/0.1)] px-6 py-3 text-sm font-medium text-[hsl(51_100%_70%)] transition-colors hover:bg-[hsl(51_100%_55%/0.15)]">
          Become Partner
        </Link>
        <Link to="/contact" className="rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/5">
          Contact Team
        </Link>
      </div>
    </div>
  </section>
);
