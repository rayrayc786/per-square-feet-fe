import interior from "@/assets/interior-hall.jpg";

const field =
  "w-full border-b border-border bg-transparent py-3 text-sm text-primary outline-none transition-colors placeholder:text-muted-foreground focus:border-gold";

export function AuthPanel({
  eyebrow,
  title,
  intro,
  cta,
  withName = false,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  cta: string;
  withName?: boolean;
}) {
  return (
    <section className="mx-auto grid max-w-[1400px] items-center gap-16 px-6 py-20 lg:grid-cols-2">
      <div className="animate-rise max-w-md">
        <p className="eyebrow text-gold">{eyebrow}</p>
        <h1 className="mt-5 font-display text-5xl text-primary">{title}</h1>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{intro}</p>
        <form className="mt-10 space-y-8" onSubmit={(e) => e.preventDefault()}>
          {withName ? <input className={field} placeholder="Full name" /> : null}
          <input className={field} type="email" placeholder="Email" />
          <input className={field} type="password" placeholder="Password" />
          <button
            type="submit"
            className="border border-primary bg-primary px-8 py-3.5 text-[0.68rem] uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-background hover:text-primary"
          >
            {cta}
          </button>
        </form>
        <p className="mt-6 text-xs text-muted-foreground">
          Demonstration form — no account is created.
        </p>
      </div>
      <img
        src={interior}
        alt="Entrance hall of a premium Indian bungalow"
        loading="lazy"
        width={1536}
        height={1024}
        className="hidden aspect-[4/5] w-full object-cover lg:block"
      />
    </section>
  );
}
