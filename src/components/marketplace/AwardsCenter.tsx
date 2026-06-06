import { useEffect, useRef, useState } from 'react';
import { Trophy, Award, Medal, Star, Sparkles, Crown, ShieldCheck, Flame } from 'lucide-react';

/* SECTION — Awards Center with 3D Trophy Wall */

type Tier = 'platinum' | 'gold' | 'silver' | 'bronze';

const tierStyles: Record<Tier, { ring: string; glow: string; chip: string; label: string }> = {
  platinum: {
    ring: 'from-[hsl(188_100%_70%)] via-[hsl(258_100%_80%)] to-[hsl(188_100%_70%)]',
    glow: 'hsl(188 100% 60% / 0.6)',
    chip: 'bg-[hsl(188_100%_60%/0.15)] text-[hsl(188_100%_75%)] border-[hsl(188_100%_60%/0.4)]',
    label: 'Platinum',
  },
  gold: {
    ring: 'from-[hsl(45_100%_60%)] via-[hsl(51_100%_70%)] to-[hsl(38_100%_55%)]',
    glow: 'hsl(45 100% 55% / 0.6)',
    chip: 'bg-[hsl(45_100%_55%/0.15)] text-[hsl(45_100%_75%)] border-[hsl(45_100%_55%/0.4)]',
    label: 'Gold',
  },
  silver: {
    ring: 'from-[hsl(220_15%_85%)] via-[hsl(220_10%_95%)] to-[hsl(220_15%_75%)]',
    glow: 'hsl(220 15% 80% / 0.5)',
    chip: 'bg-[hsl(220_15%_80%/0.12)] text-[hsl(220_15%_85%)] border-[hsl(220_15%_70%/0.4)]',
    label: 'Silver',
  },
  bronze: {
    ring: 'from-[hsl(28_70%_55%)] via-[hsl(32_80%_65%)] to-[hsl(20_65%_45%)]',
    glow: 'hsl(28 70% 50% / 0.55)',
    chip: 'bg-[hsl(28_70%_50%/0.12)] text-[hsl(28_80%_70%)] border-[hsl(28_70%_50%/0.4)]',
    label: 'Bronze',
  },
};

const awards: { title: string; org: string; year: string; tier: Tier; icon: React.ElementType }[] = [
  { title: 'Marketplace of the Year', org: 'SaaS Global Awards', year: '2026', tier: 'platinum', icon: Crown },
  { title: 'Best AI Software Hub', org: 'AI Excellence Council', year: '2026', tier: 'gold', icon: Sparkles },
  { title: 'Top Reseller Platform', org: 'Channel Partner Summit', year: '2025', tier: 'gold', icon: Trophy },
  { title: 'Innovation in Commerce', org: 'EnterpriseTech Forum', year: '2025', tier: 'platinum', icon: Flame },
  { title: 'Enterprise Trust Award', org: 'Global Security Alliance', year: '2025', tier: 'silver', icon: ShieldCheck },
  { title: 'Author Ecosystem Growth', org: 'Creator Economy Index', year: '2024', tier: 'gold', icon: Star },
  { title: 'Vendor Success Award', org: 'B2B Marketplace Council', year: '2024', tier: 'silver', icon: Award },
  { title: 'Rising Franchise Network', org: 'Franchise World 500', year: '2024', tier: 'bronze', icon: Medal },
];

const highlights = [
  '2400+ Premium Products',
  '184K+ Global Customers',
  '5200+ Active Resellers',
  '98% Renewal Rate',
  '870+ Verified Vendors',
  '32 Industry Verticals',
];

const TrophyCard = ({ a, i }: { a: typeof awards[number]; i: number }) => {
  const t = tierStyles[a.tier];
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -y * 14, ry: x * 14 });
  };
  const reset = () => setTilt({ rx: 0, ry: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ perspective: '1200px', animationDelay: `${i * 80}ms` }}
      className="group relative animate-fade-in"
    >
      <div
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: 'transform 220ms ease-out',
          transformStyle: 'preserve-3d',
        }}
        className="relative rounded-[22px] border border-white/10 bg-gradient-to-b from-[hsl(230_40%_10%)] to-[hsl(230_50%_6%)] p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]"
      >
        {/* glow halo */}
        <div
          className="pointer-events-none absolute -inset-px rounded-[22px] opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `radial-gradient(circle at 50% 0%, ${t.glow}, transparent 60%)` }}
        />
        {/* tier ring around trophy */}
        <div className="relative mx-auto mb-5 flex h-28 w-28 items-center justify-center" style={{ transform: 'translateZ(40px)' }}>
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${t.ring} opacity-90 blur-[2px]`} />
          <div className="absolute inset-[3px] rounded-full bg-gradient-to-b from-[hsl(230_45%_8%)] to-[hsl(230_60%_4%)]" />
          <div
            className={`absolute inset-[3px] rounded-full bg-gradient-to-br ${t.ring} opacity-40 animate-pulse`}
            style={{ filter: 'blur(8px)' }}
          />
          <a.icon
            className="relative h-12 w-12 text-foreground drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
            style={{ color: 'transparent', stroke: 'url(#trophy-grad)' as unknown as string }}
          />
          {/* fallback colored icon */}
          <a.icon className={`absolute h-12 w-12 bg-gradient-to-br ${t.ring} bg-clip-text`} style={{ color: 'transparent' }} />
        </div>

        {/* base pedestal */}
        <div
          className="relative mx-auto mb-5 h-3 w-24 rounded-full opacity-70 blur-md"
          style={{ background: `linear-gradient(90deg, transparent, ${t.glow}, transparent)` }}
        />

        <div className="relative text-center" style={{ transform: 'translateZ(20px)' }}>
          <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] ${t.chip}`}>
            {t.label} · {a.year}
          </span>
          <h3 className="mt-3 font-display text-base font-bold text-foreground">{a.title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{a.org}</p>
        </div>
      </div>
    </div>
  );
};

export const AwardsCenter = () => {
  return (
    <section className="relative mx-6 my-12 overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-[hsl(230_60%_6%)] via-card to-[hsl(230_60%_4%)] p-8 md:p-12">
      {/* ambient backdrops */}
      <div className="pointer-events-none absolute -top-32 left-1/3 h-80 w-80 rounded-full bg-[hsl(45_100%_55%/0.18)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 h-80 w-80 rounded-full bg-[hsl(258_100%_68%/0.18)] blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(to right, hsl(45 100% 55% / 0.4) 1px, transparent 1px), linear-gradient(to bottom, hsl(45 100% 55% / 0.4) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      {/* header */}
      <div className="relative mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(45_100%_55%/0.4)] bg-[hsl(45_100%_55%/0.1)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[hsl(45_100%_72%)]">
            <Trophy className="h-3 w-3" /> Awards Center
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
            A wall of{' '}
            <span className="bg-gradient-to-r from-[hsl(45_100%_60%)] via-[hsl(51_100%_72%)] to-[hsl(38_100%_55%)] bg-clip-text text-transparent">
              global recognition
            </span>
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Honoring the milestones that shaped Software Vala into the world's most trusted enterprise marketplace.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-muted-foreground backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(45_100%_60%)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(45_100%_60%)]" />
          </span>
          24 honors · 8 featured below
        </div>
      </div>

      {/* animated highlights marquee */}
      <div className="relative mb-10 overflow-hidden rounded-2xl border border-white/10 bg-background/40 py-3 backdrop-blur-md">
        <div className="flex w-max animate-[scroll-x_28s_linear_infinite] gap-12 px-6">
          {[...highlights, ...highlights].map((h, i) => (
            <div key={i} className="flex items-center gap-2 whitespace-nowrap text-sm text-foreground/80">
              <Sparkles className="h-4 w-4 text-[hsl(45_100%_65%)]" />
              <span className="font-medium">{h}</span>
              <span className="text-muted-foreground">·</span>
            </div>
          ))}
        </div>
      </div>

      {/* trophy wall */}
      <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {awards.map((a, i) => (
          <TrophyCard key={a.title} a={a} i={i} />
        ))}
      </div>

      <style>{`
        @keyframes scroll-x {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default AwardsCenter;
