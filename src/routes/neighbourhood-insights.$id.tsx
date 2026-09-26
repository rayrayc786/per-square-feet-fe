import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/site/page";
import { neighbourhoods } from "@/lib/site-data";

export const Route = createFileRoute("/neighbourhood-insights/$id")({
  loader: ({ params }) => {
    // Basic conversion of name to id e.g. "Indiranagar, Bengaluru" -> "indiranagar-bengaluru"
    const nh = neighbourhoods.find(
      (n) => n.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === params.id
    );
    if (!nh) throw notFound();
    return { neighbourhood: nh };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.neighbourhood) return {};
    return {
      meta: [
        { title: `${loaderData.neighbourhood.name} | Per Square Feet` },
        { name: "description", content: loaderData.neighbourhood.note },
      ],
    };
  },
  component: NeighbourhoodDetail,
});

function NeighbourhoodDetail() {
  const { neighbourhood } = Route.useLoaderData();

  return (
    <PageShell>
      <Section className="pt-32 min-h-[60svh]">
        <Link
          to="/neighbourhood-insights"
          className="text-[0.65rem] uppercase tracking-[0.22em] text-gold hover:text-primary transition-colors mb-8 inline-block"
        >
          ← Back to insights
        </Link>
        <div className="max-w-3xl animate-rise">
          <p className="eyebrow text-gold">{neighbourhood.tag}</p>
          <h1 className="mt-4 font-display text-5xl text-primary md:text-6xl">{neighbourhood.name}</h1>
          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
            {neighbourhood.note}
          </p>
          
          <dl className="mt-12 flex gap-16 text-sm border-t border-border pt-8">
            <div>
              <dt className="text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                Avg. per sq ft
              </dt>
              <dd className="mt-2 text-2xl font-display text-primary">{neighbourhood.psf}</dd>
            </div>
            <div>
              <dt className="text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                Movement
              </dt>
              <dd className="mt-2 text-2xl font-display text-primary">{neighbourhood.growth}</dd>
            </div>
          </dl>
        </div>
      </Section>
    </PageShell>
  );
}
