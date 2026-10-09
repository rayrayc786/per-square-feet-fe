import type { ReactNode } from "react";
import { SiteNav } from "./nav";
import { SiteFooter } from "./footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
  variant = "light",
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  variant?: "light" | "dark";
  children?: ReactNode;
}) {
  const isDark = variant === "dark";
  
  return (
    <section 
      className={`border-b border-border ${isDark ? "bg-primary text-primary-foreground pt-36 pb-20 md:pt-44" : "bg-secondary/60 py-20 md:py-28"}`}
    >
      <div className="animate-rise mx-auto max-w-[1400px] px-6">
        <p className={`eyebrow ${isDark ? "text-primary-foreground/90" : "text-gold"}`}>{eyebrow}</p>
        <h1 className={`mt-5 max-w-none font-display text-4xl leading-[1.05] md:text-5xl lg:text-[3.4rem] tracking-tight ${isDark ? "text-primary-foreground" : "text-primary"}`}>
          {title}
        </h1>
        {intro && (
          <p className={`mt-6 max-w-xl text-sm leading-relaxed ${isDark ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
            {intro}
          </p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}

export function Section({
  eyebrow,
  title,
  children,
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-[1400px] px-6 py-16 md:py-20 ${className}`}>
      {eyebrow ? <p className="eyebrow text-gold">{eyebrow}</p> : null}
      {title ? (
        <h2 className="mt-4 max-w-2xl font-display text-3xl text-primary md:text-4xl">{title}</h2>
      ) : null}
      <div className={eyebrow || title ? "mt-10" : ""}>{children}</div>
    </section>
  );
}
