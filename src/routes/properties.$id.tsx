import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/site/page";
import { properties } from "@/lib/site-data";
import { useSavedProperties } from "@/hooks/use-saved-properties";
import { Bookmark, BookmarkCheck } from "lucide-react";

export const Route = createFileRoute("/properties/$id")({
  loader: ({ params }) => {
    const property = properties.find((p) => p.id === params.id);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.property) return {};
    const { property } = loaderData;
    return {
      meta: [
        { title: `${property.name} | Per Square Feet` },
        { name: "description", content: property.blurb },
      ],
    };
  },
  component: PropertyDetail,
});

function PropertyDetail() {
  const { property } = Route.useLoaderData();
  const { isSaved, toggleSave, isLoaded } = useSavedProperties();
  const saved = isLoaded ? isSaved(property.id) : false;

  return (
    <PageShell>
      <Section className="pt-32">
        <div className="flex items-center justify-between">
          <Link
            to="/properties"
            className="text-[0.65rem] uppercase tracking-[0.22em] text-gold hover:text-primary transition-colors"
          >
            ← Back to listing
          </Link>
          <button
            onClick={() => toggleSave(property.id)}
            className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground hover:text-primary transition-colors"
          >
            {saved ? (
              <>
                <BookmarkCheck size={14} className="text-gold" />
                <span>Saved to shortlist</span>
              </>
            ) : (
              <>
                <Bookmark size={14} />
                <span>Save to shortlist</span>
              </>
            )}
          </button>
        </div>
        
        <div className="mt-8 grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <img
            src={property.image}
            alt={property.name}
            width={1280}
            height={960}
            className="aspect-[4/3] w-full object-cover"
          />
          <div className="animate-rise">
            <p className="eyebrow text-gold">{property.type}</p>
            <h1 className="mt-4 font-display text-5xl text-primary md:text-6xl">{property.name}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{property.location}</p>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {property.blurb}
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-8 text-sm">
              {[
                ["Guide price", property.price],
                ["Per square foot", property.psf],
                ["Built area", property.area],
                ["Bedrooms", String(property.beds)],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                    {k}
                  </dt>
                  <dd className="mt-1 text-primary">{v}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-8 space-y-2 text-sm text-muted-foreground">
              {property.highlights.map((h) => (
                <li key={h} className="border-l border-gold pl-3">
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
