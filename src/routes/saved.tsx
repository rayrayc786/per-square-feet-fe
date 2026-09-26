import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/site/page";
import { useSavedProperties } from "@/hooks/use-saved-properties";
import { properties } from "@/lib/site-data";
import { Trash2 } from "lucide-react"; // assuming lucide-react is installed

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Your Shortlist | Per Square Feet" },
      {
        name: "description",
        content:
          "Your saved residences, compared side by side — location, price, size, lifestyle, verification and indicative metrics.",
      },
    ],
  }),
  component: Saved,
});

function Saved() {
  const { savedIds, clearSaved, toggleSave, isLoaded } = useSavedProperties();

  if (!isLoaded) return null; // or a loading spinner

  const savedProperties = properties.filter((p) => savedIds.includes(p.id));

  return (
    <PageShell>
      <div className="mx-auto max-w-[1400px] px-6 pt-36 pb-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="animate-rise">
            <p className="eyebrow text-gold">Shortlist</p>
            <h1 className="mt-6 font-display text-5xl text-primary md:text-6xl">
              Your shortlist.
            </h1>
          </div>
          {savedProperties.length > 0 && (
            <button
              onClick={clearSaved}
              className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground hover:text-primary transition-colors animate-rise"
            >
              Clear all
            </button>
          )}
        </div>

        {savedProperties.length === 0 ? (
          <div className="py-28 animate-rise">
            <p className="max-w-md text-xl md:text-2xl font-display leading-snug text-primary">
              Nothing saved yet. Save a residence from the collection and it will appear here for comparison.
            </p>
            <Link
              to="/properties"
              className="mt-10 btn-base btn-solid"
            >
              Explore properties
            </Link>
          </div>
        ) : (
          <div className="animate-rise" style={{ animationDelay: "100ms" }}>
            <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {savedProperties.map((p) => (
                <article key={p.id} className="group relative">
                  <Link to={`/properties`} className="block w-full text-left">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="mt-5 flex items-baseline justify-between gap-4">
                      <h2 className="font-display text-2xl text-primary">{p.name}</h2>
                    </div>
                    <p className="text-sm text-muted-foreground">{p.location}</p>
                    <p className="mt-2 text-sm text-primary">{p.price}</p>
                  </Link>
                  <button
                    onClick={() => toggleSave(p.id)}
                    className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur hover:bg-background hover:text-red-500 transition-colors shadow-sm"
                    aria-label="Remove from shortlist"
                  >
                    <Trash2 size={14} />
                  </button>
                </article>
              ))}
            </div>

            <section className="mt-28 border-t border-border pt-16">
              <h2 className="font-display text-4xl text-primary mb-10">Compare.</h2>
              <div className="overflow-x-auto pb-4">
                <table className="w-full min-w-[800px] text-left text-sm">
                  <caption className="sr-only">Comparison of saved residences</caption>
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="py-4 font-normal text-muted-foreground w-1/4">Feature</th>
                      {savedProperties.map((p) => (
                        <th key={p.id} className="py-4 font-normal text-primary">
                          {p.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    <tr>
                      <td className="py-4 text-muted-foreground">Location</td>
                      {savedProperties.map((p) => (
                        <td key={p.id} className="py-4">{p.location}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-4 text-muted-foreground">Type</td>
                      {savedProperties.map((p) => (
                        <td key={p.id} className="py-4">{p.type}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-4 text-muted-foreground">Price</td>
                      {savedProperties.map((p) => (
                        <td key={p.id} className="py-4 font-medium">{p.price}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-4 text-muted-foreground">Per square foot</td>
                      {savedProperties.map((p) => (
                        <td key={p.id} className="py-4">{p.psf}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-4 text-muted-foreground">Built area</td>
                      {savedProperties.map((p) => (
                        <td key={p.id} className="py-4">{p.area}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-4 text-muted-foreground">Bedrooms</td>
                      {savedProperties.map((p) => (
                        <td key={p.id} className="py-4">{p.beds}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-8 text-xs text-muted-foreground">
                Indicative figures are illustrative and do not represent guaranteed returns.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex h-10 items-center justify-center rounded-sm bg-primary px-6 text-[0.65rem] uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Request a private viewing
                </Link>
                <a
                  href="https://wa.me/919625225069"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-sm border border-input bg-background px-6 text-[0.65rem] uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Speak to an advisor
                </a>
              </div>
            </section>
          </div>
        )}
      </div>
    </PageShell>
  );
}
