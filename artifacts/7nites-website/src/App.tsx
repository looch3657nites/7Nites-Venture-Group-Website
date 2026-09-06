import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Clapperboard,
  CircleDot,
  Cpu,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Minus,
  Music2,
  Newspaper,
  Palette,
  Plus,
  Route,
  Rocket,
  RadioTower,
  Send,
  WalletCards,
  X,
  Youtube,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route as WouterRoute, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const ventures = [
  {
    name: 'ROUTEFLOW',
    kind: 'Mobility Technology / SaaS',
    description: 'Digital infrastructure and operational technology modernising the minibus taxi ecosystem.',
    mark: Route,
    tone: 'orange',
    status: 'BUILDING',
    note: 'Digital infrastructure and operational technology for the minibus taxi ecosystem.',
  },
  {
    name: 'LOCALPLUG',
    kind: 'Media / Digital Marketing',
    description: 'A local discovery and content ecosystem connecting businesses, communities and audiences.',
    mark: CircleDot,
    tone: 'lime',
    status: 'BUILDING',
    note: 'A local discovery and content ecosystem for businesses, communities and audiences.',
  },
  {
    name: '7NITES MUSIC',
    kind: 'Music / Entertainment',
    description: 'Artist development, music experiences, entertainment partnerships and creative projects.',
    mark: Music2,
    tone: 'blue',
    status: 'ACTIVE',
    note: 'Artist development, music experiences, entertainment partnerships and creative projects.',
  },
];

const industries = [
  {
    label: 'Entertainment',
    kicker: '01 / CULTURE IN MOTION',
    title: 'Ideas people can feel.',
    description: 'We create experiences, partnerships and entertainment properties that turn attention into belonging.',
    tags: ['7NITES MUSIC', 'Experiences'],
    icon: Clapperboard,
  },
  {
    label: 'Media',
    kicker: '02 / STORIES THAT CONNECT',
    title: 'Make attention meaningful.',
    description: 'We connect businesses, communities and audiences through discovery, content and digital marketing.',
    tags: ['LOCALPLUG', 'Content'],
    icon: Newspaper,
  },
  {
    label: 'Technology',
    kicker: '03 / THE CONNECTIVE TISSUE',
    title: 'Useful beats shiny.',
    description: 'We turn real-world problems into products, platforms and systems that are clear, human and ready to scale.',
    tags: ['ROUTEFLOW', 'SaaS'],
    icon: Cpu,
  },
  {
    label: 'Telecommunications',
    kicker: '04 / ALWAYS CONNECTED',
    title: 'Make access move faster.',
    description: 'We explore the infrastructure and services that help people, businesses and ideas stay connected.',
    tags: ['Connectivity', 'Infrastructure'],
    icon: RadioTower,
  },
  {
    label: 'FinTech',
    kicker: '05 / VALUE IN MOTION',
    title: 'Build better exchange.',
    description: 'We look for new ways to make value, access and opportunity move through African markets.',
    tags: ['Access', 'Trust'],
    icon: WalletCards,
  },
  {
    label: 'Startups',
    kicker: '06 / NEW VENTURES',
    title: 'Start with the signal.',
    description: 'We identify opportunities, shape propositions and support founders turning a sharp insight into a real company.',
    tags: ['Ideas', 'Founders'],
    icon: Rocket,
  },
  {
    label: 'Creative Industries',
    kicker: '07 / CREATIVITY AS INFRASTRUCTURE',
    title: 'Make culture useful.',
    description: 'We build at the intersection of creative expression, technology and commerce — where new categories begin.',
    tags: ['Brands', 'Creative projects'],
    icon: Palette,
  },
];

const processSteps = [
  { number: '01', name: 'Discover', text: 'We stay close to culture, behaviour and the problems hiding in plain sight.' },
  { number: '02', name: 'Create', text: 'We turn a sharp observation into a clear point of view people can rally behind.' },
  { number: '03', name: 'Build', text: 'We make the smallest real thing, then keep making it better in public.' },
  { number: '04', name: 'Launch', text: 'We put it in the world with a story, a signal and a reason to come back.' },
  { number: '05', name: 'Scale', text: 'We grow what works — with patience, ambition and the right people around the table.' },
];

const journalEntries = [
  { category: 'Industry insight', title: 'Africa is not one market. That is the opportunity.', date: '06.02.25', read: '6 min read', accent: 'orange', visual: 'city' },
  { category: 'Founder story', title: 'The case for building closer to the culture.', date: '19.11.24', read: '4 min read', accent: 'lime', visual: 'signal' },
  { category: 'Company announcement', title: 'What we look for before we build.', date: '03.08.24', read: '8 min read', accent: 'blue', visual: 'orbit' },
];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="group flex items-center gap-2" data-testid="link-logo">
      <span className={`grid h-9 w-9 place-items-center rounded-full border ${light ? 'border-[#f6f0e6]/50 bg-[#f6f0e6]/10' : 'border-[#192b5b]/25 bg-[#192b5b]'}`}>
        <span className={`font-display text-[15px] font-bold tracking-[-0.1em] ${light ? 'text-[#f6f0e6]' : 'text-[#f6f0e6]'}`}>7N</span>
      </span>
      <span className={`font-display text-[17px] font-bold tracking-[-0.06em] ${light ? 'text-[#f6f0e6]' : 'text-[#192b5b]'}`}>7NITES</span>
    </a>
  );
}

function ButtonLink({ children, href, inverted = false }: { children: ReactNode; href: string; inverted?: boolean }) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full px-5 py-3 text-[12px] font-extrabold uppercase tracking-[0.12em] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff663f] focus-visible:ring-offset-2 ${inverted ? 'bg-[#f6f0e6] text-[#192b5b]' : 'bg-[#ff663f] text-[#192b5b]'}`}
      data-testid={`link-${href.replace('#', '')}`}
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

function SectionIntro({ eyebrow, title, description, dark = false }: { eyebrow: string; title: string; description?: string; dark?: boolean }) {
  return (
    <div className="grid gap-5 md:grid-cols-[1fr_1.2fr] md:items-end">
      <p className={`font-mono-custom text-[10px] uppercase tracking-[0.2em] ${dark ? 'text-[#c8f169]' : 'text-[#ff663f]'}`}>{eyebrow}</p>
      <div>
        <h2 className={`font-display max-w-3xl text-balance text-[clamp(2.8rem,6vw,6.7rem)] font-bold leading-[0.9] tracking-[-0.07em] ${dark ? 'text-[#f6f0e6]' : 'text-[#192b5b]'}`}>{title}</h2>
        {description && <p className={`mt-6 max-w-xl text-[15px] leading-7 ${dark ? 'text-[#f6f0e6]/65' : 'text-[#192b5b]/68'}`}>{description}</p>}
      </div>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    ['Ventures', '#ventures'],
    ['Industries', '#industries'],
    ['About', '#about'],
    ['Media', '#journal'],
    ['Partners', '#partners'],
    ['Contact', '#contact'],
    ['Build With Us', '#build-with-us'],
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-[#192b5b]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Logo light />
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {links.map(([label, href]) => <a key={href} href={href} className="nav-link text-[11px] font-bold uppercase tracking-[0.11em] text-[#f6f0e6]/80 transition-colors hover:text-[#f6f0e6]" data-testid={`link-nav-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</a>)}
        </nav>
        <a href="#build-with-us" className="hidden rounded-full border border-[#f6f0e6]/50 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#f6f0e6] transition-colors hover:bg-[#c8f169] hover:text-[#192b5b] hover:border-[#c8f169] lg:inline-flex" data-testid="link-build-with-us">Build with us</a>
        <button type="button" className="grid h-11 w-11 place-items-center rounded-full border border-[#f6f0e6]/40 text-[#f6f0e6] lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} data-testid="button-mobile-menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="mx-4 rounded-2xl border border-[#f6f0e6]/20 bg-[#192b5b]/95 p-5 backdrop-blur-xl lg:hidden">
          <nav className="grid gap-1" aria-label="Mobile navigation">
            {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-[#f6f0e6]/10 py-3 text-sm font-bold text-[#f6f0e6]" data-testid={`link-mobile-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}<ArrowUpRight className="h-4 w-4 text-[#c8f169]" /></a>)}
          </nav>
        </div>
      )}
    </header>
  );
}

function EcosystemGraphic() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[570px]" aria-label="A connected ecosystem around 7Nites">
      <div className="absolute inset-[9%] rounded-full border border-[#f6f0e6]/25" />
      <div className="orbital-ring absolute inset-[9%] rounded-full border border-dashed border-[#c8f169]/35" />
      <div className="orbital-ring-reverse absolute inset-[21%] rounded-full border border-[#f6f0e6]/20" />
      <div className="absolute inset-[30%] rounded-full bg-[#ff663f] shadow-[0_0_0_16px_rgba(255,102,63,.1)]">
        <div className="grid h-full place-items-center text-center">
          <span className="font-display text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[.75] tracking-[-0.1em] text-[#192b5b]">7N</span>
          <span className="-mt-5 font-mono-custom text-[9px] font-medium uppercase tracking-[.28em] text-[#192b5b]">The house</span>
        </div>
      </div>
      <div className="float-slow absolute left-[2%] top-[13%] rounded-full border border-[#f6f0e6]/35 bg-[#192b5b] px-4 py-3 text-[10px] font-bold uppercase tracking-[.14em] text-[#f6f0e6]">Ideas</div>
      <div className="float-slow absolute right-[0%] top-[28%] rounded-full border border-[#192b5b]/20 bg-[#c8f169] px-4 py-3 text-[10px] font-bold uppercase tracking-[.14em] text-[#192b5b]" style={{ animationDelay: '1.1s' }}>Businesses</div>
      <div className="float-slow absolute bottom-[17%] left-[5%] rounded-full border border-[#f6f0e6]/35 bg-[#ff663f] px-4 py-3 text-[10px] font-bold uppercase tracking-[.14em] text-[#192b5b]" style={{ animationDelay: '2s' }}>Brands</div>
      <div className="float-slow absolute bottom-[8%] right-[11%] rounded-full border border-[#f6f0e6]/35 bg-[#192b5b] px-4 py-3 text-[10px] font-bold uppercase tracking-[.14em] text-[#f6f0e6]" style={{ animationDelay: '.5s' }}>Experiences</div>
      <div className="absolute left-[12%] top-[49%] h-px w-[22%] rotate-[28deg] bg-[#c8f169]/60" />
      <div className="absolute right-[12%] top-[48%] h-px w-[22%] -rotate-[25deg] bg-[#c8f169]/60" />
      <div className="absolute bottom-[22%] left-[31%] h-px w-[18%] -rotate-[24deg] bg-[#c8f169]/60" />
      <div className="absolute bottom-[21%] right-[31%] h-px w-[18%] rotate-[24deg] bg-[#c8f169]/60" />
      <span className="absolute left-[19%] top-[28%] h-2 w-2 rounded-full bg-[#c8f169]" />
      <span className="absolute right-[20%] top-[38%] h-2 w-2 rounded-full bg-[#ff663f]" />
      <span className="absolute bottom-[34%] left-[21%] h-2 w-2 rounded-full bg-[#c8f169]" />
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[760px] overflow-hidden bg-[#192b5b] text-[#f6f0e6]">
      <div className="absolute -right-28 -top-28 h-[480px] w-[480px] rounded-full bg-[#ff663f]/10 blur-3xl" />
      <div className="relative mx-auto grid min-h-[760px] max-w-[1440px] items-center gap-8 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:px-12 lg:pb-20 lg:pt-36">
        <div className="relative z-10">
          <div className="reveal inline-flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[0.2em] text-[#c8f169]"><span className="h-2 w-2 rounded-full bg-[#ff663f]" /> Johannesburg / Everywhere</div>
          <h1 className="reveal reveal-delay-1 mt-7 max-w-4xl font-display text-[clamp(4rem,10vw,9.4rem)] font-bold leading-[.79] tracking-[-0.09em] text-[#f6f0e6]">WE BUILD<br /><span className="text-[#ff663f]">WHAT'S NEXT.</span></h1>
          <p className="reveal reveal-delay-2 mt-8 max-w-md text-base leading-7 text-[#f6f0e6]/70">7Nites Entertainment is a multi-sector venture group building businesses across entertainment, media, technology, telecommunications, fintech and digital platforms.</p>
          <div className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-4">
            <ButtonLink href="#ventures">Explore ventures</ButtonLink>
            <a href="#partners" className="group inline-flex items-center gap-2 px-1 py-3 text-[11px] font-bold uppercase tracking-[0.13em] text-[#f6f0e6]/80 hover:text-[#c8f169]" data-testid="link-partner-with-7nites">Partner with 7Nites <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" /></a>
          </div>
        </div>
        <div className="reveal reveal-delay-2 relative z-10 lg:-mr-8"><EcosystemGraphic /></div>
      </div>
      <div className="absolute inset-x-0 bottom-0 border-t border-[#f6f0e6]/15">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <p className="font-mono-custom text-[9px] uppercase tracking-[0.18em] text-[#f6f0e6]/50">A house of ideas</p>
          <p className="font-mono-custom text-[9px] uppercase tracking-[0.18em] text-[#f6f0e6]/50">Build. Create. Connect. Scale.</p>
        </div>
      </div>
    </section>
  );
}

function VenturesSection() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <section id="ventures" className="bg-[#f6f0e6] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <SectionIntro eyebrow="01 / The house" title="One house. Many ventures." description="We are building a portfolio of distinct companies and experiences — each with its own pulse, all connected by a shared point of view." />
        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {ventures.map((venture, index) => {
            const Icon = venture.mark;
            const isActive = active === venture.name;
            return (
              <article key={venture.name} className={`group relative flex min-h-[430px] flex-col justify-between overflow-hidden rounded-[1.5rem] border p-6 transition-all duration-300 hover:-translate-y-1 sm:p-8 ${venture.tone === 'orange' ? 'border-[#ff663f] bg-[#ff663f]' : venture.tone === 'lime' ? 'border-[#c8f169] bg-[#c8f169]' : 'border-[#192b5b] bg-[#192b5b] text-[#f6f0e6]'}`} data-testid={`card-venture-${venture.name.toLowerCase().replaceAll(' ', '-')}`}>
                <div className="flex items-start justify-between">
                  <span className={`grid h-12 w-12 place-items-center rounded-full border ${venture.tone === 'blue' ? 'border-[#f6f0e6]/30 bg-[#f6f0e6]/10' : 'border-[#192b5b]/20 bg-[#192b5b]/10'}`}><Icon className="h-5 w-5" /></span>
                  <span className="font-mono-custom text-[9px] uppercase tracking-[.15em] opacity-60">{venture.status}</span>
                </div>
                <div>
                  <p className="font-mono-custom text-[10px] uppercase tracking-[.15em] opacity-60">{venture.kind}</p>
                  <h3 className="mt-3 font-display text-[clamp(2.5rem,5vw,4.6rem)] font-bold leading-[.83] tracking-[-.08em]">{venture.name}</h3>
                  <p className="mt-6 max-w-sm text-sm leading-6 opacity-75">{venture.description}</p>
                </div>
                <div className="mt-8">
                  <button type="button" onClick={() => setActive(isActive ? null : venture.name)} className="flex w-full items-center justify-between border-t border-current/20 pt-4 text-left text-[10px] font-bold uppercase tracking-[.14em]" aria-expanded={isActive} data-testid={`button-venture-details-${venture.name.toLowerCase().replaceAll(' ', '-')}`}>
                    <span>{isActive ? 'Close note' : 'Inside the build'}</span>{isActive ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </button>
                  {isActive && <p className="pt-3 text-xs leading-5 opacity-70">{venture.note}</p>}
                </div>
                <span className="pointer-events-none absolute -bottom-12 -right-8 font-display text-[190px] font-bold leading-none opacity-[.09]">{String(index + 1).padStart(2, '0')}</span>
              </article>
            );
          })}
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {['An idea in incubation', 'More to be announced'].map((label) => (
            <div key={label} className="flex min-h-[145px] items-center justify-between rounded-[1.5rem] border border-dashed border-[#192b5b]/35 bg-[#eee7dc] p-6 sm:p-8" data-testid={`placeholder-venture-${label.toLowerCase().replaceAll(' ', '-')}`}>
              <div><p className="font-mono-custom text-[9px] uppercase tracking-[.17em] text-[#ff663f]">Unconfirmed / not yet public</p><p className="mt-3 font-display text-2xl font-bold tracking-[-.06em] text-[#192b5b]">{label}</p></div>
              <span className="grid h-11 w-11 place-items-center rounded-full border border-[#192b5b]/25 text-[#192b5b]/60"><Plus className="h-4 w-4" /></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IndustriesSection() {
  const [active, setActive] = useState(0);
  const industry = industries[active];
  const Icon = industry.icon;
  return (
    <section id="industries" className="bg-[#c8f169] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <SectionIntro eyebrow="02 / Where we build" title="Where we build." description="We are not limited by a category. We are pulled by a signal: a cultural shift, an unmet need, a new way people want to live." />
        <div className="mt-16 grid gap-10 lg:grid-cols-[.65fr_1.35fr] lg:gap-20">
          <div className="flex flex-col border-t border-[#192b5b]/30">
            {industries.map((item, index) => <button key={item.label} type="button" onClick={() => setActive(index)} className={`group flex items-center justify-between border-b border-[#192b5b]/30 py-5 text-left transition-all ${active === index ? 'pl-3' : ''}`} aria-pressed={active === index} data-testid={`button-industry-${item.label.toLowerCase()}`}><span className={`font-display text-2xl font-bold tracking-[-.06em] ${active === index ? 'text-[#ff663f]' : 'text-[#192b5b]/55 group-hover:text-[#192b5b]'}`}>{item.label}</span><ArrowUpRight className={`h-5 w-5 transition-transform ${active === index ? 'text-[#ff663f]' : 'text-[#192b5b]/40 group-hover:-translate-y-0.5 group-hover:translate-x-0.5'}`} /></button>)}
          </div>
          <div className="relative min-h-[360px] overflow-hidden rounded-[1.5rem] bg-[#192b5b] p-7 text-[#f6f0e6] sm:p-10">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#c8f169]/20" /><div className="absolute -right-7 -top-7 h-40 w-40 rounded-full border border-dashed border-[#ff663f]/50" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-start justify-between"><p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[#ff663f]">{industry.kicker}</p><Icon className="h-7 w-7 text-[#c8f169]" /></div>
              <div><h3 className="max-w-lg font-display text-[clamp(2.7rem,6vw,5.5rem)] font-bold leading-[.87] tracking-[-.08em]">{industry.title}</h3><p className="mt-6 max-w-lg text-sm leading-7 text-[#f6f0e6]/65">{industry.description}</p><div className="mt-7 flex flex-wrap gap-2">{industry.tags.map((tag) => <span key={tag} className="rounded-full border border-[#f6f0e6]/20 px-3 py-1.5 font-mono-custom text-[9px] uppercase tracking-[.13em] text-[#f6f0e6]/75">{tag}</span>)}</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const [active, setActive] = useState(2);
  return (
    <section className="bg-[#ff663f] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <SectionIntro eyebrow="03 / How we work" title="From idea to impact." description="We move with conviction, not a fixed formula. The work changes; the discipline stays." />
        <div className="mt-16 grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
          <div className="grid border-t border-[#192b5b]/25 sm:grid-cols-5">
            {processSteps.map((step, index) => <button key={step.number} type="button" onClick={() => setActive(index)} className={`group border-b border-[#192b5b]/25 px-1 py-5 text-left sm:border-b-0 sm:border-r sm:px-4 sm:py-3 ${active === index ? 'bg-[#f6f0e6]/20' : ''}`} aria-pressed={active === index} data-testid={`button-process-${step.name.toLowerCase()}`}><span className="font-mono-custom text-[10px] text-[#192b5b]/60">{step.number}</span><span className={`mt-8 block font-display text-2xl font-bold tracking-[-.06em] ${active === index ? 'text-[#192b5b]' : 'text-[#192b5b]/45 group-hover:text-[#192b5b]'}`}>{step.name}</span></button>)}
          </div>
          <div className="flex min-h-[235px] flex-col justify-between border-t border-[#192b5b]/25 pt-5">
            <p className="font-mono-custom text-[10px] uppercase tracking-[.17em] text-[#192b5b]/55">The 7Nites method / {processSteps[active].number}</p>
            <p className="max-w-md font-display text-[clamp(1.8rem,3.4vw,3.2rem)] font-bold leading-[.95] tracking-[-.07em] text-[#192b5b]">{processSteps[active].text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="bg-[#f6f0e6] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[.8fr_1.2fr] lg:gap-28">
        <div className="relative min-h-[410px] overflow-hidden rounded-[1.5rem] bg-[#192b5b] p-7 text-[#f6f0e6] sm:p-10">
          <div className="absolute inset-6 rounded-full border border-[#f6f0e6]/15" /><div className="absolute inset-20 rounded-full border border-dashed border-[#c8f169]/35" />
          <div className="absolute left-1/2 top-1/2 grid h-36 w-36 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#c8f169] text-center"><span className="font-display text-5xl font-bold leading-[.75] tracking-[-.1em] text-[#192b5b]">7N</span></div>
          <div className="absolute left-8 top-8 font-mono-custom text-[9px] uppercase tracking-[.15em] text-[#ff663f]">The long view</div>
          <div className="absolute bottom-8 right-8 font-mono-custom text-[9px] uppercase tracking-[.15em] text-[#f6f0e6]/45">Since the beginning</div>
        </div>
        <div>
          <SectionIntro eyebrow="04 / About 7Nites" title="We're building more than companies." description="7Nites began in entertainment and creative industries and is evolving into a broader venture group at the intersection of culture, technology and commerce." />
          <div className="mt-10 rounded-2xl border border-[#192b5b]/20 bg-[#eee7dc] p-5 sm:p-6">
            <p className="font-mono-custom text-[9px] uppercase tracking-[.17em] text-[#ff663f]">Brand architecture</p>
            <div className="mt-5 grid gap-2 text-sm font-bold uppercase tracking-[.08em] text-[#192b5b] sm:grid-cols-4 sm:items-center">
              <span>7Nites Entertainment</span><ArrowUpRight className="hidden h-4 w-4 text-[#ff663f] sm:block" /><span>Venture Group</span><ArrowUpRight className="hidden h-4 w-4 text-[#ff663f] sm:block" /><span>Ventures</span><ArrowUpRight className="hidden h-4 w-4 text-[#ff663f] sm:block" /><span>Products &amp; Services</span>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-7 border-t border-[#192b5b]/20 pt-7 sm:grid-cols-4">
            {['[X]+ Projects', '[X] Ventures', '[X] Industries', '[X] Markets'].map((stat) => <div key={stat}><p className="font-display text-3xl font-bold tracking-[-.07em] text-[#192b5b]">{stat.split(' ')[0]}</p><p className="mt-2 font-mono-custom text-[9px] uppercase tracking-[.15em] text-[#192b5b]/55">{stat.split(' ').slice(1).join(' ')}</p></div>)}
          </div>
          <div className="mt-10 grid gap-6 border-t border-[#192b5b]/20 pt-7 sm:grid-cols-2">
            <div><p className="font-mono-custom text-[10px] uppercase tracking-[.15em] text-[#ff663f]">Our belief</p><p className="mt-3 text-sm leading-6 text-[#192b5b]/70">The best companies feel inevitable in hindsight — and impossible to ignore in the moment.</p></div>
            <div><p className="font-mono-custom text-[10px] uppercase tracking-[.15em] text-[#ff663f]">Our role</p><p className="mt-3 text-sm leading-6 text-[#192b5b]/70">We bring the point of view, the people and the patient work between first spark and real-world scale.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorldSection() {
  return (
    <section className="relative overflow-hidden bg-[#192b5b] px-5 py-24 text-[#f6f0e6] sm:px-8 lg:px-12 lg:py-36">
      <div className="absolute -bottom-48 -left-20 h-[500px] w-[500px] rounded-full border border-[#ff663f]/30" /><div className="absolute -bottom-32 -left-4 h-[330px] w-[330px] rounded-full border border-dashed border-[#c8f169]/35" />
      <div className="relative mx-auto max-w-[1440px]">
        <div className="grid gap-16 lg:grid-cols-[.8fr_1.2fr] lg:gap-28">
          <div><p className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#ff663f]">05 / Point of origin</p><p className="mt-5 max-w-xs font-display text-2xl font-bold leading-tight tracking-[-.06em] text-[#f6f0e6]">Context is not a constraint. It is an unfair advantage.</p></div>
          <div><h2 className="font-display max-w-5xl text-balance text-[clamp(3.7rem,9vw,9.5rem)] font-bold leading-[.78] tracking-[-.1em]">Built from Africa.<br /><span className="text-[#c8f169]">Designed for the World.</span></h2><p className="mt-9 max-w-xl text-base leading-7 text-[#f6f0e6]/65">We build with the texture of where we are — and the ambition of where we want to go. Our ventures are born in Africa, made for movement and open to the world.</p><div className="mt-10 flex flex-wrap gap-3"><span className="rounded-full border border-[#f6f0e6]/20 px-4 py-2 font-mono-custom text-[10px] uppercase tracking-[.13em]">South African roots</span><span className="rounded-full border border-[#f6f0e6]/20 px-4 py-2 font-mono-custom text-[10px] uppercase tracking-[.13em]">Global ambition</span></div></div>
        </div>
      </div>
    </section>
  );
}

function JournalSection() {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <section id="journal" className="bg-[#f6f0e6] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <SectionIntro eyebrow="06 / The journal" title="Signals worth sharing." description="Notes from the work: the questions we ask, the patterns we notice and the ideas we cannot stop thinking about." />
        <div className="mt-16 border-t border-[#192b5b]/25">
          {journalEntries.map((entry, index) => {
            const isOpen = expanded === index;
            return (
              <article key={entry.title} className="group border-b border-[#192b5b]/25" data-testid={`article-journal-${index}`}>
                <button type="button" className="grid w-full gap-5 py-7 text-left transition-colors hover:bg-[#eee7dc] sm:grid-cols-[180px_1fr_.2fr_auto] sm:items-center sm:px-4" onClick={() => setExpanded(isOpen ? null : index)} aria-expanded={isOpen} data-testid={`button-journal-${index}`}>
                  <div className={`relative h-24 overflow-hidden rounded-xl ${entry.visual === 'city' ? 'bg-[#192b5b]' : entry.visual === 'signal' ? 'bg-[#ff663f]' : 'bg-[#c8f169]'}`} role="img" aria-label={`${entry.category}: ${entry.title}`}>
                    <div className="absolute inset-3 rounded-lg border border-[#f6f0e6]/30" />
                    <div className="absolute -right-6 -top-10 h-28 w-28 rounded-full border border-[#f6f0e6]/40" />
                    <div className="absolute bottom-3 left-3 font-mono-custom text-[8px] uppercase tracking-[.16em] text-[#f6f0e6]/70">7N / Journal</div>
                  </div>
                  <span><span className="font-mono-custom text-[9px] uppercase tracking-[.15em] text-[#ff663f]">{entry.category}</span><span className="mt-2 block max-w-3xl font-display text-[clamp(1.65rem,3vw,3.3rem)] font-bold leading-[.95] tracking-[-.06em] text-[#192b5b]">{entry.title}</span></span>
                  <span className="font-mono-custom text-[10px] uppercase tracking-[.12em] text-[#192b5b]/50">{entry.date}</span>
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-[#192b5b]/25 text-[#192b5b] transition-transform group-hover:-translate-y-0.5">{isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}</span>
                </button>
                {isOpen && <div className="pb-7 pl-8 sm:pl-[calc(180px+1rem)]"><p className="max-w-xl text-sm leading-7 text-[#192b5b]/65">This piece is part of the 7Nites journal and will be published soon. {entry.read}.</p><a href="#contact" className="mt-4 inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.14em] text-[#192b5b] underline decoration-[#ff663f] decoration-2 underline-offset-4" data-testid={`link-journal-read-more-${index}`}>Read more <ArrowUpRight className="h-3 w-3" /></a></div>}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PartnersSection() {
  return (
    <section id="partners" className="bg-[#eee7dc] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] items-end gap-10 lg:grid-cols-[1fr_1fr]">
        <div><p className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#ff663f]">07 / Build with us</p><h2 className="mt-5 max-w-2xl font-display text-[clamp(3rem,6vw,6.5rem)] font-bold leading-[.82] tracking-[-.09em] text-[#192b5b]">Good things get built together.</h2></div>
        <div className="lg:pl-16"><p className="max-w-md text-base leading-7 text-[#192b5b]/68">We work with people who bring a sharp point of view, a useful problem, a daring idea or the resources to make it real.</p><a href="#contact" className="group mt-8 inline-flex items-center gap-3 border-b-2 border-[#ff663f] pb-2 text-[11px] font-extrabold uppercase tracking-[.14em] text-[#192b5b]" data-testid="link-partner-with-us">Partner with 7Nites <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a></div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [selected, setSelected] = useState('');
  const options = ['Investment', 'Strategic Partnership', 'Technology', 'Media', 'Entertainment', 'Venture Opportunity', 'General Enquiry'];
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };
  return (
    <section id="build-with-us" className="bg-[#c8f169] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[.75fr_1.25fr] lg:gap-28">
          <div id="contact"><p className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#ff663f]">08 / Contact</p><h2 className="mt-5 font-display text-[clamp(3.4rem,7vw,7.5rem)] font-bold leading-[.8] tracking-[-.1em] text-[#192b5b]">HAVE AN IDEA?<br /><span className="text-[#ff663f]">LET'S BUILD IT.</span></h2><p className="mt-8 max-w-sm text-sm leading-7 text-[#192b5b]/70">Tell us what you are building, what you are seeing or where you think we should look next.</p><div className="mt-10 flex items-center gap-3 text-sm font-bold text-[#192b5b]"><Mail className="h-4 w-4 text-[#ff663f]" /> hello@7nites.co.za</div></div>
        <div className="rounded-[1.5rem] bg-[#192b5b] p-6 text-[#f6f0e6] sm:p-9">
          {submitted ? <div className="flex min-h-[450px] flex-col items-start justify-center"><span className="grid h-14 w-14 place-items-center rounded-full bg-[#c8f169] text-[#192b5b]"><Check className="h-6 w-6" /></span><h3 className="mt-7 font-display text-4xl font-bold leading-none tracking-[-.07em]">Message received.</h3><p className="mt-4 max-w-sm text-sm leading-6 text-[#f6f0e6]/65">Thanks for reaching out. The right person at 7Nites will be in touch.</p><button type="button" onClick={() => setSubmitted(false)} className="mt-8 text-[10px] font-bold uppercase tracking-[.15em] text-[#c8f169] underline underline-offset-4" data-testid="button-send-another">Send another message</button></div> : <form onSubmit={handleSubmit} className="space-y-7" aria-label="Contact 7Nites"><div className="grid gap-7 sm:grid-cols-2"><div><label htmlFor="name" className="font-mono-custom text-[9px] uppercase tracking-[.16em] text-[#f6f0e6]/50">Name</label><input id="name" name="name" required type="text" placeholder="Your name" className="mt-2 w-full border-b border-[#f6f0e6]/25 bg-transparent px-0 py-3 text-base text-[#f6f0e6] outline-none placeholder:text-[#f6f0e6]/30 focus:border-[#c8f169]" data-testid="input-name" /></div><div><label htmlFor="company" className="font-mono-custom text-[9px] uppercase tracking-[.16em] text-[#f6f0e6]/50">Company</label><input id="company" name="company" required type="text" placeholder="Your company" className="mt-2 w-full border-b border-[#f6f0e6]/25 bg-transparent px-0 py-3 text-base text-[#f6f0e6] outline-none placeholder:text-[#f6f0e6]/30 focus:border-[#c8f169]" data-testid="input-company" /></div></div><div className="grid gap-7 sm:grid-cols-2"><div><label htmlFor="email" className="font-mono-custom text-[9px] uppercase tracking-[.16em] text-[#f6f0e6]/50">Email</label><input id="email" name="email" required type="email" placeholder="you@company.com" className="mt-2 w-full border-b border-[#f6f0e6]/25 bg-transparent px-0 py-3 text-base text-[#f6f0e6] outline-none placeholder:text-[#f6f0e6]/30 focus:border-[#c8f169]" data-testid="input-email" /></div><div><label htmlFor="phone" className="font-mono-custom text-[9px] uppercase tracking-[.16em] text-[#f6f0e6]/50">Phone</label><input id="phone" name="phone" required type="tel" placeholder="+27 ..." className="mt-2 w-full border-b border-[#f6f0e6]/25 bg-transparent px-0 py-3 text-base text-[#f6f0e6] outline-none placeholder:text-[#f6f0e6]/30 focus:border-[#c8f169]" data-testid="input-phone" /></div></div><div><label htmlFor="partnership-type" className="font-mono-custom text-[9px] uppercase tracking-[.16em] text-[#f6f0e6]/50">Partnership type</label><select id="partnership-type" name="partnershipType" required value={selected} onChange={(event) => setSelected(event.target.value)} className="mt-2 w-full border-b border-[#f6f0e6]/25 bg-[#192b5b] px-0 py-3 text-base text-[#f6f0e6] outline-none focus:border-[#c8f169]" data-testid="select-partnership-type"><option value="" disabled>Select an option</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></div><div><label htmlFor="message" className="font-mono-custom text-[9px] uppercase tracking-[.16em] text-[#f6f0e6]/50">Message</label><textarea id="message" name="message" required rows={4} placeholder="Tell us what you are building..." className="mt-2 w-full resize-none border-b border-[#f6f0e6]/25 bg-transparent px-0 py-3 text-base text-[#f6f0e6] outline-none placeholder:text-[#f6f0e6]/30 focus:border-[#c8f169]" data-testid="input-message" /></div><button type="submit" disabled={!selected} className="group inline-flex items-center gap-3 rounded-full bg-[#ff663f] px-5 py-3 text-[11px] font-extrabold uppercase tracking-[.14em] text-[#192b5b] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40" data-testid="button-submit-contact">Send enquiry <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button></form>}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#192b5b] px-5 pb-8 pt-16 text-[#f6f0e6] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 border-b border-[#f6f0e6]/15 pb-14 md:grid-cols-[1fr_auto_auto] md:gap-20">
          <div><Logo light /><p className="mt-6 max-w-xs text-sm leading-6 text-[#f6f0e6]/55">A South African house of ideas, businesses, technology, brands and experiences.</p></div>
          <div><p className="font-mono-custom text-[9px] uppercase tracking-[.17em] text-[#c8f169]">Explore</p><div className="mt-5 grid gap-3 text-sm text-[#f6f0e6]/70"><a href="#ventures" className="hover:text-[#c8f169]" data-testid="link-footer-ventures">Ventures</a><a href="#industries" className="hover:text-[#c8f169]" data-testid="link-footer-industries">Industries</a><a href="#about" className="hover:text-[#c8f169]" data-testid="link-footer-about">About</a><a href="#journal" className="hover:text-[#c8f169]" data-testid="link-footer-media">Media</a><a href="#partners" className="hover:text-[#c8f169]" data-testid="link-footer-partners">Partners</a><a href="#contact" className="hover:text-[#c8f169]" data-testid="link-footer-contact">Contact</a></div></div>
          <div><p className="font-mono-custom text-[9px] uppercase tracking-[.17em] text-[#c8f169]">Find us</p><div className="mt-5 flex gap-3"><a href="#" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-full border border-[#f6f0e6]/20 hover:border-[#c8f169] hover:text-[#c8f169]" data-testid="link-social-linkedin"><Linkedin className="h-4 w-4" /></a><a href="#" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-[#f6f0e6]/20 hover:border-[#c8f169] hover:text-[#c8f169]" data-testid="link-social-instagram"><Instagram className="h-4 w-4" /></a><a href="#" aria-label="YouTube" className="grid h-10 w-10 place-items-center rounded-full border border-[#f6f0e6]/20 hover:border-[#c8f169] hover:text-[#c8f169]" data-testid="link-social-youtube"><Youtube className="h-4 w-4" /></a></div><p className="mt-5 flex items-center gap-2 text-xs text-[#f6f0e6]/55"><MapPin className="h-3 w-3 text-[#ff663f]" /> Johannesburg, South Africa</p></div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 border-b border-[#f6f0e6]/15 py-5 text-[10px] uppercase tracking-[.12em] text-[#f6f0e6]/45"><a href="#privacy" className="hover:text-[#c8f169]" data-testid="link-footer-privacy">Privacy policy</a><a href="#terms" className="hover:text-[#c8f169]" data-testid="link-footer-terms">Terms of use</a></div>
        <div className="flex flex-col justify-between gap-3 pt-7 text-[10px] uppercase tracking-[.12em] text-[#f6f0e6]/40 sm:flex-row"><p>© 2026 7Nites Entertainment (Pty) Ltd. All rights reserved.</p><a href="#top" className="inline-flex items-center gap-2 hover:text-[#c8f169]" data-testid="link-back-to-top">Back to top <ArrowDown className="h-3 w-3 rotate-180" /></a></div>
      </div>
    </footer>
  );
}

function Home() {
  useEffect(() => {
    document.title = '7Nites — We Build What’s Next.';
    const description = '7Nites is a South African parent company, venture builder and innovation group building the ideas, businesses, technology, brands and experiences of tomorrow.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta); }
    meta.setAttribute('content', description);
  }, []);
  return <div className="min-h-[100dvh] bg-[#f6f0e6]"><div className="site-noise" /><Header /><main><Hero /><VenturesSection /><IndustriesSection /><ProcessSection /><AboutSection /><WorldSection /><JournalSection /><PartnersSection /><ContactSection /></main><Footer /></div>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><WouterRoute path="/" component={Home} /><WouterRoute component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;