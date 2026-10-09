import { useState, useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { ArchLink, type AppRoute } from "./transition";
import { useSavedProperties } from "@/hooks/use-saved-properties";

/* Match HTML nav order exactly: Home, Properties, Neighbourhoods, Investment, AI Lifestyle, About */
const links: { to: AppRoute; label: string; exact?: boolean }[] = [
  { to: "/", label: "Home", exact: true },
  { to: "/properties", label: "Properties" },
  { to: "/neighbourhood-insights", label: "Neighbourhoods" },
  { to: "/investment-estimator", label: "Investment" },
  { to: "/ai-lifestyle", label: "AI Lifestyle" },
  { to: "/about", label: "About" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { savedCount, isLoaded } = useSavedProperties();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const darkRoutes = [
    "/",
    "/properties",
    "/properties/",
    "/neighbourhood-insights",
    "/neighbourhood-insights/",
    "/about",
    "/investment-estimator",
    "/ai-lifestyle",
    "/owner-community"
  ];
  const isDarkHeroRoute = darkRoutes.includes(location.pathname);
  const isTransparent = isDarkHeroRoute && !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] border-b ${
        isTransparent
          ? "site-nav-transparent border-transparent bg-transparent py-6"
          : "border-border bg-background/95 backdrop-blur py-3"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-6 md:px-10 lg:px-16">
        {/* Brand */}
        <ArchLink to="/" exact className="shrink-0">
          <span className={`eyebrow nav-brand block transition-colors tracking-[0.34em] ${isTransparent ? "text-white" : "text-primary"}`}>
            THE CASSTLE CO
          </span>
        </ArchLink>

        {/* Primary nav — visible at lg (1024px), matching HTML */}
        <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex">
          {links.map((l) => (
            <ArchLink
              key={l.to}
              to={l.to}
              exact={l.exact}
              className={`link-underline text-[0.6875rem] uppercase tracking-[0.28em] transition-colors ${
                isTransparent
                  ? "text-white hover:text-gold data-[active]:text-gold"
                  : "text-muted-foreground hover:text-primary data-[active]:text-gold"
              }`}
            >
              {l.label}
            </ArchLink>
          ))}
        </nav>

        {/* Secondary nav — matches HTML: Sign in, Saved, Contact */}
        <div className="hidden items-center gap-5 lg:flex">
          {/* <ArchLink
            to="/signin"
            className={`link-underline text-[0.6875rem] uppercase tracking-[0.28em] transition-colors ${
              isTransparent
                ? "text-white hover:text-gold data-[active]:text-gold"
                : "text-muted-foreground hover:text-primary data-[active]:text-gold"
            }`}
          >
            Sign in
          </ArchLink> */}
          <ArchLink
            to="/saved"
            className={`link-underline text-[0.6875rem] uppercase tracking-[0.28em] transition-colors ${
              isTransparent
                ? "text-white hover:text-gold data-[active]:text-gold"
                : "text-muted-foreground hover:text-primary data-[active]:text-gold"
            }`}
          >
            Saved{isLoaded && savedCount > 0 ? ` (${savedCount})` : ""}
          </ArchLink>
          <ArchLink
            to="/contact"
            className={`link-underline text-[0.6875rem] uppercase tracking-[0.28em] transition-colors ${
              isTransparent
                ? "text-white hover:text-gold data-[active]:text-gold"
                : "text-muted-foreground hover:text-primary data-[active]:text-gold"
            }`}
          >
            Contact
          </ArchLink>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className={`text-[0.6875rem] uppercase tracking-[0.28em] lg:hidden ${
            isTransparent ? "text-white" : "text-primary"
          }`}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile menu */}
      {open ? (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-[1440px] flex-col px-6 py-4">
            {[
              ...links,
              { to: "/signin" as AppRoute, label: "Sign in" },
              { to: "/saved" as AppRoute, label: `Saved${isLoaded && savedCount > 0 ? ` (${savedCount})` : ""}` },
              { to: "/contact" as AppRoute, label: "Contact" },
            ].map((l) => (
              <ArchLink
                key={l.label}
                to={l.to}
                className="border-b border-border/60 py-3 text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground data-[active]:text-primary"
              >
                {l.label}
              </ArchLink>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
