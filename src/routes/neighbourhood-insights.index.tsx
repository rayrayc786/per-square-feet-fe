import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, PageShell, Section } from "@/components/site/page";
import { neighbourhoods, properties } from "@/lib/site-data";

export const Route = createFileRoute("/neighbourhood-insights/")({
  head: () => ({
    meta: [
      { title: "Neighbourhood Insights — Per Square Feet" },
      {
        name: "description",
        content:
          "Locations, properties and street-level insight across India's established and emerging residential markets.",
      },
      { property: "og:title", content: "Neighbourhood Insights — Per Square Feet" },
      {
        property: "og:description",
        content: "Street-level context, pricing and growth across Indian residential markets.",
      },
    ],
  }),
  component: NeighbourhoodInsights,
});

function NeighbourhoodInsights() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Neighbourhood Insights"
        title="Read the street before the listing."
        intro="Illustrative research notes on the locations we cover — how they price, how they move, and what living there actually feels like."
        variant="dark"
      />

      <Section eyebrow="Locations" title="Where we currently have depth.">
        <div className="grid gap-px bg-border md:grid-cols-2">
          {neighbourhoods.map((n) => {
            const id = n.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            return (
              <article key={n.name} className="bg-background p-8 group">
                <Link to="/neighbourhood-insights/$id" params={{ id }} className="block w-full">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl text-primary group-hover:text-gold transition-colors">{n.name}</h3>
                    <span className="text-[0.6rem] uppercase tracking-[0.2em] text-gold">{n.tag}</span>
                  </div>
                </Link>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{n.note}</p>
              <dl className="mt-6 flex gap-10 text-sm">
                <div>
                  <dt className="text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                    Avg. per sq ft
                  </dt>
                  <dd className="mt-1 text-primary">{n.psf}</dd>
                </div>
                <div>
                  <dt className="text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                    Movement
                  </dt>
                  <dd className="mt-1 text-primary">{n.growth}</dd>
                </div>
              </dl>
            </article>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Properties" title="Homes in these neighbourhoods.">
        <div className="grid gap-8 md:grid-cols-3">
          {properties.slice(0, 3).map((p) => (
            <article key={p.id}>
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                width={1280}
                height={960}
                className="aspect-[4/3] w-full object-cover"
              />
              <h3 className="mt-4 font-display text-2xl text-primary">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.location}</p>
              <p className="mt-2 text-sm text-primary">{p.psf}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Insights" title="Notes from the desk.">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              t: "Metro lines reshape value slowly",
              d: "Corridors typically re-rate 18 to 30 months after a line opens, not on announcement.",
            },
            {
              t: "Low-rise streets hold resale",
              d: "Plot-led neighbourhoods with mature tree cover show the shallowest price dips in soft years.",
            },
            {
              t: "Rental yield is a local number",
              d: "Two streets in the same suburb can differ by 120 basis points. We price at street level.",
            },
          ].map((i) => (
            <article key={i.t} className="border-t border-gold/50 pt-6">
              <h3 className="font-display text-2xl text-primary">{i.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{i.d}</p>
            </article>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
