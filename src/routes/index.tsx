import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState, useRef } from "react";
import { PageShell, Section } from "@/components/site/page";
import { Entrance } from "@/components/site/entrance";
import { ArchLink, type AppRoute } from "@/components/site/transition";
import { properties } from "@/lib/site-data";
import { useSavedProperties } from "@/hooks/use-saved-properties";
import { Testimonials } from "@/components/site/testimonials";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "THE CASSTLE CO — Find a Place That Feels Like Yours" },
      {
        name: "description",
        content:
          "Curated second homes and private escapes across India's mountains, forests and countryside — verified projects with advisory-led guidance.",
      },
      { property: "og:title", content: "THE CASSTLE CO — Find a Place That Feels Like Yours" },
      {
        property: "og:description",
        content: "Curated second homes and private escapes, selected for the way you want to live.",
      },
    ],
  }),
  component: Home,
});

const collections: { image: string; label: string; places: string; count: string; price: string; to: AppRoute }[] = [
  {
    image: "/assets/cat-mountains.jpg",
    label: "The Mountains",
    places: "Nainital · Mussoorie · Kasauli · Shimla · Mukteshwar",
    count: "3 curated residences",
    price: "From ₹2.20 Cr",
    to: "/properties" as AppRoute,
  },
  {
    image: "/assets/prop-pool.jpg",
    label: "The Beach",
    places: "Goa · Alibaug · Gokarna",
    count: "Upcoming",
    price: "Coming soon",
    to: "/properties" as AppRoute,
  },
  {
    image: "/assets/cat-country.jpg",
    label: "The Countryside",
    places: "Sohna · Naugaon · Alwar · emerging NCR destinations",
    count: "2 curated residences",
    price: "From ₹1.85 Cr",
    to: "/properties" as AppRoute,
  },
  {
    image: "/assets/bungalow-exterior.jpg",
    label: "The Temple town",
    places: "Ayodhya · Varanasi · Mathura",
    count: "Upcoming",
    price: "Coming soon",
    to: "/properties" as AppRoute,
  },
  {
    image: "/assets/cat-wellness.jpg",
    label: "The Wellness Escape",
    places: "Rishikesh · Dhanaulti · wellness destinations",
    count: "2 curated residences",
    price: "From ₹3.95 Cr",
    to: "/properties" as AppRoute,
  },
  {
    image: "/assets/cat-forest.jpg",
    label: "The Forest",
    places: "Jim Corbett · emerging nature destinations",
    count: "1 curated residence",
    price: "From ₹4.75 Cr",
    to: "/properties" as AppRoute,
  },
];

const verifySteps = [
  { label: "Project verified", desc: "We visit the site and confirm the project as presented." },
  { label: "Documents reviewed", desc: "Available project documentation is read by our advisory team." },
  { label: "Land / title checks", desc: "Ownership structure and land records are examined before listing." },
  { label: "Curated for quality", desc: "Siting, construction and liveability are assessed on our criteria." },
  { label: "Advisor support", desc: "A specialist stays with you from first question to possession." },
];

const advisoryQuestions = [
  "Where do you want to escape?",
  "How often will you use it?",
  "Who will use it?",
  "What does your ideal weekend look like?",
  "What matters most — privacy, wellness, family, nature, hospitality, investment, legacy?",
];

const neighbourhoodTiles = [
  { name: "Jim Corbett", tag: "The Forest Corridor", drive: "5h 30m from Delhi NCR", image: "/assets/cat-forest.jpg", to: "/neighbourhood-insights/jim-corbett" as AppRoute },
  { name: "Mukteshwar", tag: "The Quiet Mountain", drive: "8h from Delhi NCR", image: "/assets/cat-mountains.jpg", to: "/neighbourhood-insights/mukteshwar" as AppRoute },
  { name: "Rishikesh", tag: "The Wellness Valley", drive: "5h from Delhi NCR", image: "/assets/cat-wellness.jpg", to: "/neighbourhood-insights/rishikesh" as AppRoute },
  { name: "Kasauli", tag: "The Near Hill", drive: "5h from Delhi NCR", image: "/assets/bungalow-exterior.jpg", to: "/neighbourhood-insights/kasauli" as AppRoute },
  { name: "Sohna", tag: "The Weekend Country", drive: "1h 15m from Gurugram", image: "/assets/cat-country.jpg", to: "/neighbourhood-insights/sohna" as AppRoute },
  { name: "Alwar", tag: "The Long Light", drive: "3h from Delhi NCR", image: "/assets/bungalow-interior.jpg", to: "/neighbourhood-insights/alwar" as AppRoute },
  { name: "Dhanaulti", tag: "The Cloud Line", drive: "6h 30m from Delhi NCR", image: "/assets/prop-pool.jpg", to: "/neighbourhood-insights/dhanaulti" as AppRoute },
];

const journeySteps = [
  { num: "01", label: "Discover", fill: "20%" },
  { num: "02", label: "Shortlist", fill: "40%" },
  { num: "03", label: "Visit", fill: "60%" },
  { num: "04", label: "Purchase", fill: "80%" },
  { num: "05", label: "Own & Manage", fill: "100%" },
];

const ownershipPillars = [
  { label: "Property setup", desc: "Furnishing, staffing and handover." },
  { label: "Property management", desc: "Upkeep and monitoring between visits." },
  { label: "Owner services", desc: "Documentation, compliance and renewals." },
  { label: "Community", desc: "Owner gatherings and private experiences." },
  { label: "Resale", desc: "Discreet exits within our network." },
  { label: "Lifestyle partnerships", desc: "Hospitality and wellness access." },
];

const PLACES = [
  "place",
  "second home",
  "vacation home",
  "villa",
  "farmhouse",
  "plot",
  "holiday home",
  "weekend home",
];

function shouldShowEntrance(): boolean {
  if (typeof window === "undefined") return true;
  try {
    if (window.sessionStorage.getItem("psf.entered") === "1") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  } catch {
    return false;
  }
  return true;
}

function TypewriterWord({ words, start = true }: { words: string[], start?: boolean }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState(words[0] || "");
  const [phase, setPhase] = useState<"initial" | "typing" | "deleting" | "pause">("initial");

  useEffect(() => {
    if (!start) return;

    if (phase === "initial") {
      const timer = setTimeout(() => setPhase("deleting"), 2000);
      return () => clearTimeout(timer);
    }

    const currentWord = words[wordIndex];

    if (phase === "deleting") {
      if (text === "") {
        setPhase("pause");
        setWordIndex((prev) => (prev + 1) % words.length);
        return;
      }
      const timer = setTimeout(() => {
        setText((prev) => prev.slice(0, -1));
      }, 30); // Fast, consistent deletion
      return () => clearTimeout(timer);
    }

    if (phase === "pause") {
      const timer = setTimeout(() => setPhase("typing"), 400); // Small pause before typing next word
      return () => clearTimeout(timer);
    }

    if (phase === "typing") {
      if (text === currentWord) {
        const timer = setTimeout(() => setPhase("deleting"), 2500); // Wait longer on full word
        return () => clearTimeout(timer);
      }
      const nextChar = currentWord.slice(0, text.length + 1);
      const typingSpeed = Math.random() * 50 + 70; // Human-like randomness
      const timer = setTimeout(() => {
        setText(nextChar);
      }, typingSpeed);
      return () => clearTimeout(timer);
    }
  }, [text, phase, wordIndex, words, start]);

  const isBlinking = !start || phase === "initial" || text === words[wordIndex] || phase === "pause";

  return (
    <span className="whitespace-nowrap">
      <span className="text-gold">{text}</span>
      <span 
        className={`inline-block border-r-[3px] border-gold h-[0.8em] align-middle ml-1 transition-opacity ${isBlinking ? 'animate-pulse' : ''}`}
        style={{ marginBottom: '0.1em' }} 
      />
    </span>
  );
}

function FadeInStep({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
      }}
      className="relative flex gap-4"
    >
      {children}
    </div>
  );
}

function Home() {
  const [intro, setIntro] = useState(shouldShowEntrance);
  const { toggleSave, isSaved } = useSavedProperties();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const nScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    checkScroll();
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const done = useCallback(() => {
    setIntro(false);
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -window.innerWidth / 2, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: window.innerWidth / 2, behavior: 'smooth' });
    }
  };

  const scrollNRight = () => {
    if (nScrollRef.current) {
      nScrollRef.current.scrollBy({ left: window.innerWidth / 2, behavior: 'smooth' });
    }
  };

  return (
    <>
      {intro ? <Entrance onDone={done} /> : null}
      <PageShell>
        {/* ==================== HERO ==================== */}
        <section className="hero-image">
          <img
            src="/assets/bungalow-interior.jpg"
            alt="Interior of a curated second home opening onto forest"
            width={1920}
            height={1088}
          />
          <div className="shell">
            <h1 className="display-xl rise mt-8 w-full px-4" style={{ animationDelay: "120ms" }}>
              <span className="block">Find a <TypewriterWord words={PLACES} start={!intro} /></span>
              <span className="block">that feels like yours.</span>
            </h1>
            <p className="rise mt-8 text-sm leading-relaxed" style={{ animationDelay: "240ms" }}>
              Curated second homes and private escapes, selected for the way you want to live.
            </p>
            <div className="rise mt-12 flex flex-wrap items-center justify-center gap-4" style={{ animationDelay: "360ms" }}>
              <ArchLink to="/properties" className="btn-base btn-ghost-light">
                Explore properties
              </ArchLink>
              <a
                href="https://wa.me/919310698305"
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow link-underline"
              >
                Speak to an advisor
              </a>
            </div>
          </div>
        </section>

        {/* ==================== OUR APPROACH ==================== */}
        <section className="pt-28 pb-0 md:pt-36">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
            <div className="grid gap-12 md:grid-cols-2" style={{ alignItems: "end" }}>
              <div>
                <p className="eyebrow text-gold">Our approach</p>
                <h2 className="display-lg mt-6">More than<br />a second home.</h2>
              </div>
              <div className="max-w-[28rem]">
                <p className="body-lede">
                  Sometimes, all you need is a few days away from the noise. Somewhere with fresh air, open space and slower mornings. A place to reconnect and enjoy time with the people who matter.
                </p>
                <ArchLink to="/about" className="eyebrow link-underline mt-10 inline-block text-foreground">
                  Discover the THE CASSTLE CO approach
                </ArchLink>
              </div>
            </div>
          </div>
          <div className="mt-20 overflow-hidden relative group">
            <img
              src="/assets/prop-pool.jpg"
              alt="A private pool deck above a misty valley at dusk"
              loading="lazy"
              width={1600}
              height={1000}
              className="w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              style={{ height: "95vh" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent flex flex-col items-center justify-end pb-32 px-6 text-center">
              <h3 className="font-display text-4xl md:text-5xl text-white mb-8">
                Ready to find your escape?
              </h3>
              <ArchLink to="/contact" className="btn-base bg-white text-primary hover:bg-gold hover:text-white transition-colors border-none">
                Begin a conversation
              </ArchLink>
            </div>
          </div>
        </section>

        {/* ==================== DISCOVER (Collection Tiles) ==================== */}
        <section className="bg-primary text-primary-foreground py-28 md:py-36">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
            <p className="eyebrow text-gold">Discover</p>
            <h2 className="display-lg mt-6">Find your kind of escape.</h2>

            <div className="group relative mt-16">
              <div
                ref={scrollContainerRef}
                className="hairline-grid collection-scroll"
                style={{
                  border: "1px solid color-mix(in oklch, var(--primary-foreground) 10%, transparent)",
                  display: "flex",
                  overflowX: "auto",
                  scrollbarWidth: "none",
                  scrollSnapType: "x mandatory",
                }}
              >
                {collections.map((c) => (
                  <ArchLink key={c.label} to={c.to} className="collection-tile">
                    <img src={c.image} alt={c.label} loading="lazy" width={1024} height={1280} />
                    <div className="content">
                      <span className="gold-rule rule" aria-hidden="true" />
                      <h3>{c.label}</h3>
                      <p className="places">{c.places}</p>
                      <div className="hover-info">
                        <p className="eyebrow text-gold">{c.count}</p>
                        <p style={{ marginTop: "0.5rem", fontSize: "0.875rem" }}>{c.price}</p>
                      </div>
                    </div>
                  </ArchLink>
                ))}
              </div>
              
              <button
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 hidden h-12 w-12 items-center justify-center rounded-full bg-primary/90 border border-gold/30 text-gold shadow-lg backdrop-blur transition-all hover:bg-primary hover:border-gold hover:scale-105 group-hover:flex disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-primary/90 disabled:hover:border-gold/30"
                aria-label="Scroll left"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              
              <button
                onClick={scrollRight}
                disabled={!canScrollRight}
                className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 hidden h-12 w-12 items-center justify-center rounded-full bg-primary/90 border border-gold/30 text-gold shadow-lg backdrop-blur transition-all hover:bg-primary hover:border-gold hover:scale-105 group-hover:flex disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-primary/90 disabled:hover:border-gold/30"
                aria-label="Scroll right"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        </section>

        {/* ==================== THE COLLECTION (Featured Properties) ==================== */}
        <section className="py-28 md:py-36">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
            <div className="flex items-end justify-between gap-8">
              <div>
                <p className="eyebrow text-gold">The collection</p>
                <h2 className="display-lg mt-6">A few worth knowing.</h2>
              </div>
              <ArchLink to="/properties" className="eyebrow link-underline hidden md:inline-block">
                Discover the collection
              </ArchLink>
            </div>
            <div className="mt-16 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {properties.slice(0, 3).map((p) => (
                <ProductCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        </section>

        {/* ==================== CONFIDENCE (Verification) ==================== */}
        <section className="bg-secondary py-28 md:py-36">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
            <div className="grid gap-16 lg:grid-cols-2" style={{ alignItems: "start" }}>
              <div>
                <p className="eyebrow text-gold">Confidence</p>
                <h2 className="display-lg mt-6">Buy with<br />confidence.</h2>
                <p className="body-lede mt-8 max-w-[28rem]">
                  We do not publish inventory. Every project passes through a review before it reaches you and an advisor stays with you afterwards.
                </p>
              </div>
              <div className="relative flex flex-col gap-8">
                {/* Vertical connecting line */}
                <span className="absolute left-[6px] top-[14px] bottom-[14px] w-px bg-border" />
                {verifySteps.map((v, i) => (
                  <FadeInStep key={v.label} delay={i * 150}>
                    <span className="z-10 mt-1 flex h-[14px] w-[14px] shrink-0 items-center justify-center border border-gold/50 bg-secondary transition-colors duration-500"><span className="block h-[4px] w-[4px] bg-gold" /></span>
                    <div>
                      <p className="eyebrow text-foreground">{v.label}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
                    </div>
                  </FadeInStep>
                ))}
                <ArchLink to="/about" className="eyebrow link-underline mt-4 inline-block text-foreground ml-[30px]">
                  How we verify
                </ArchLink>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== ADVISORY (Questions) ==================== */}
        <section className="py-28 md:py-36">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
            <div className="grid gap-16 lg:grid-cols-2" style={{ alignItems: "start" }}>
              <div>
                <p className="eyebrow text-gold">Advisory</p>
                <h2 className="display-lg mt-6">The right property<br />starts with the right questions.</h2>
              </div>
              <div className="advisory-box">
                <p className="eyebrow text-gold">A short conversation</p>
                <ul className="mt-8 flex flex-col gap-5">
                  {advisoryQuestions.map((q) => (
                    <li key={q} className="flex gap-4 text-sm text-foreground">
                      <span className="gold-rule" style={{ width: "1.25rem", marginTop: "0.6rem", flexShrink: 0 }} />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
                <ArchLink to="/ai-lifestyle" className="btn-base btn-solid mt-10">
                  Build my shortlist
                </ArchLink>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== NEIGHBOURHOODS (Horizontal Scroll) ==================== */}
        <section className="py-16 md:py-20 border-t border-border">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
            <div className="flex items-end justify-between gap-8">
              <div>
                <p className="eyebrow text-gold">Neighbourhoods</p>
                <h2 className="display-lg mt-6">Know the place before you own it.</h2>
              </div>
              <ArchLink to="/neighbourhood-insights" className="eyebrow link-underline hidden md:inline-block">
                Discover the neighbourhood
              </ArchLink>
            </div>
          </div>
          <div className="relative mt-12 group">
            <div className="scroll-row pl-6 md:pl-10 lg:pl-16 pr-16" ref={nScrollRef}>
              {neighbourhoodTiles.map((n) => (
                <ArchLink key={n.name} to={n.to} className="neighbourhood-tile relative">
                  <div className="overflow-hidden">
                    <img src={n.image} alt={n.name} loading="lazy" width={590} height={500} />
                  </div>
                  <div className="info">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3>{n.name}</h3>
                      <span className="eyebrow text-muted-foreground">{n.tag}</span>
                    </div>
                    <p className="drive">{n.drive}</p>
                  </div>
                </ArchLink>
              ))}
            </div>
            
            {/* Right fade and scroll arrow overlay */}
            <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-background to-transparent pointer-events-none flex items-center justify-end pr-6 md:pr-10 lg:pr-16">
              <button
                onClick={scrollNRight}
                className="pointer-events-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary/90 border border-gold/30 text-gold shadow-lg backdrop-blur hover:bg-primary hover:border-gold hover:scale-105 transition-all opacity-0 group-hover:opacity-100"
                aria-label="Scroll right"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        </section>

        {/* ==================== CONCIERGE JOURNEY ==================== */}
        <section className="bg-primary text-primary-foreground py-28 md:py-36">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
            <p className="eyebrow text-gold">Concierge</p>
            <h2 className="display-lg mt-6">From discovery<br />to doorstep.</h2>
            <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 lg:gap-12">
              {journeySteps.map((s) => (
                <div key={s.num} className="journey-step">
                  <p className="eyebrow num">{s.num}</p>
                  <div className="track"><span className="fill" style={{ width: s.fill }} /></div>
                  <h3>{s.label}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== OWNERSHIP / POST-PURCHASE ==================== */}
        <section className="py-28 md:py-36">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <p className="eyebrow text-gold">Ownership</p>
                <h2 className="display-lg mt-6">Our relationship<br />doesn't end at the sale.</h2>
                <ArchLink to="/owner-community" className="btn-base btn-outline mt-10">
                  Enter the owner community
                </ArchLink>
              </div>
              <div className="grid gap-px bg-border sm:grid-cols-2">
                {ownershipPillars.map((p) => (
                  <div key={p.label} className="pillar">
                    <p className="eyebrow text-gold">{p.label}</p>
                    <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== CLOSING CTA ==================== */}
        <section className="bg-secondary py-28 md:py-36">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
            <div className="mx-auto max-w-[48rem] text-center">
              <p className="eyebrow text-gold">Begin</p>
              <h2 className="display-lg mt-6">Some places are better experienced than explained.</h2>
              <div className="mt-12 flex flex-wrap justify-center gap-4">
                <ArchLink to="/properties" className="btn-base btn-solid">Explore properties</ArchLink>
                <ArchLink to="/contact" className="btn-base btn-outline">Begin a conversation</ArchLink>
              </div>
            </div>
          </div>
        </section>
        
        {/* ==================== TESTIMONIALS ==================== */}
        <Testimonials />
      </PageShell>
    </>
  );
}
