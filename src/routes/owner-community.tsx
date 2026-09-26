import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/site/page";
import { Testimonials } from "@/components/site/testimonials";

export const Route = createFileRoute("/owner-community")({
  head: () => ({
    meta: [
      { title: "Owner Community — A Community Beyond the Address | Per Square Feet" },
      {
        name: "description",
        content:
          "Private experiences, owner gatherings, hospitality and wellness partnerships, and discreet resale within the Per Square Feet owner network.",
      },
    ],
  }),
  component: OwnerCommunity,
});

function OwnerCommunity() {
  return (
    <PageShell>
      <section className="relative flex min-h-[78svh] flex-col justify-end overflow-hidden bg-primary text-primary-foreground pt-36">
        <img
          src="/assets/cat-wellness.jpg"
          alt="A quiet wellness retreat"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent pointer-events-none" />
        <div className="relative z-10 animate-rise max-w-[1440px] w-full mx-auto px-6 md:px-10 lg:px-16 pb-16 md:pb-24">
          <p className="eyebrow text-gold">Owner community</p>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] md:text-7xl max-w-3xl">
            A community<br />beyond the address.
          </h1>
        </div>
      </section>

      <Section className="flex flex-col items-center text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center animate-rise">
          <p className="text-xl md:text-2xl font-display text-primary leading-snug text-center">
            Ownership with Per Square Feet continues after possession. Owners are introduced to a private network of services, experiences and other owners across our destinations.
          </p>
          <span className="mt-10 block h-[1px] w-12 bg-gold"></span>
        </div>
      </Section>

      <Section>
        <div className="grid gap-px bg-border md:grid-cols-2 mt-16">
          <div className="bg-background p-8 animate-rise">
            <p className="eyebrow text-gold">Owner events</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Small seasonal gatherings hosted across our destinations.
            </p>
          </div>
          <div className="bg-background p-8 animate-rise" style={{ animationDelay: "100ms" }}>
            <p className="eyebrow text-gold">Private experiences</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Curated walks, tastings and estate visits for owners and guests.
            </p>
          </div>
          <div className="bg-background p-8 animate-rise" style={{ animationDelay: "200ms" }}>
            <p className="eyebrow text-gold">Hospitality partnerships</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Preferential access with partner properties and operators.
            </p>
          </div>
          <div className="bg-background p-8 animate-rise">
            <p className="eyebrow text-gold">Wellness experiences</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Practitioner-led retreats within the owner network.
            </p>
          </div>
          <div className="bg-background p-8 animate-rise" style={{ animationDelay: "100ms" }}>
            <p className="eyebrow text-gold">Community gatherings</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Introductions between owners in the same destination.
            </p>
          </div>
          <div className="bg-background p-8 animate-rise" style={{ animationDelay: "200ms" }}>
            <p className="eyebrow text-gold">Resale opportunities</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Discreet, advisor-managed exits inside the network first.
            </p>
          </div>
        </div>



        <div className="mt-20 flex flex-wrap items-center justify-center gap-4 animate-rise">
          <Link
            to="/properties"
            className="btn-base btn-solid"
          >
            Become an owner
          </Link>
          <a
            href="https://wa.me/919625225069"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-base btn-outline"
          >
            WhatsApp us
          </a>
        </div>
      </Section>
      <Testimonials />
    </PageShell>
  );
}
