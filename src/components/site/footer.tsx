import { ArchLink } from "./transition";

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        {/* Footer grid — matches HTML footer-grid */}
        <div className="grid gap-14 py-20 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="eyebrow">Per Square Feet</p>
            <p className="mt-6 font-display text-2xl leading-snug" style={{ color: "color-mix(in oklch, var(--color-primary-foreground) 90%, transparent)" }}>
              Curated second homes.<br />Considered ownership.
            </p>
          </div>
          <nav aria-label="Explore" className="flex flex-col gap-3 text-sm" style={{ color: "color-mix(in oklch, var(--color-primary-foreground) 70%, transparent)" }}>
            <ArchLink to="/properties" className="hover:text-gold transition-colors">Properties</ArchLink>
            <ArchLink to="/neighbourhood-insights" className="hover:text-gold transition-colors">Neighbourhoods</ArchLink>
            <ArchLink to="/investment-estimator" className="hover:text-gold transition-colors">Investment</ArchLink>
            <ArchLink to="/ai-lifestyle" className="hover:text-gold transition-colors">AI Lifestyle</ArchLink>
            <ArchLink to="/about" className="hover:text-gold transition-colors">About</ArchLink>
            <ArchLink to="/contact" className="hover:text-gold transition-colors">Contact</ArchLink>
            <ArchLink to="/owner-community" className="hover:text-gold transition-colors">Owner Community</ArchLink>
          </nav>
          {/* Social Links */}
          <div>
            <p className="eyebrow text-gold mb-6">CONNECT</p>
            <div className="flex flex-wrap gap-4 items-center">
              {/* Instagram */}
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-gold transition-colors" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              {/* YouTube */}
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-gold transition-colors" aria-label="YouTube">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-gold transition-colors" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              {/* Facebook */}
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-gold transition-colors" aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              {/* Twitter / X */}
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-gold transition-colors" aria-label="Twitter">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col gap-4 border-t py-8 text-xs md:flex-row md:items-center md:justify-between" style={{ borderColor: "color-mix(in oklch, var(--color-primary-foreground) 15%, transparent)", color: "color-mix(in oklch, var(--color-primary-foreground) 50%, transparent)" }}>
          <p>© 2026 Per Square Feet</p>
          <div className="flex gap-6">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Disclaimer</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
