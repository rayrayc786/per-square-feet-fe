import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageShell, Section } from "@/components/site/page";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About THE CASSTLE CO — THE CASSTLE CO" },
      {
        name: "description",
        content:
          "Our story, approach, network and team — how THE CASSTLE CO advises on premium Indian property.",
      },
      { property: "og:title", content: "About THE CASSTLE CO — THE CASSTLE CO" },
      {
        property: "og:description",
        content: "How THE CASSTLE CO researches, advises and works with buyers and investors.",
      },
    ],
  }),
  component: About,
});

const blocks = [
  {
    t: "Our Story",
    d: "THE CASSTLE CO began as a research note passed between friends buying their first homes. It grew into a practice built on the same idea: a house is only as good as the street it sits on.",
  },
  {
    t: "Our Approach",
    d: "We take on fewer listings and study them properly. Every property is visited, photographed and benchmarked against comparable stock before it appears here.",
  },
  {
    t: "Our Network",
    d: "Architects, valuers, structural engineers and title lawyers across nine cities, retained so our clients never have to assemble a team from scratch.",
  },
  // {
  //   t: "How We Work",
  //   d: "A first conversation, a shortlist, three viewings, one recommendation. We are paid for the advice, not the transaction volume.",
  // },
  {
    t: "Why THE CASSTLE CO",
    d: "Because most searches begin with a filter and end with a compromise. Ours begins with how you want your week to feel.",
  },
];



function About() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="About"
        title="We believe where you live changes how you live."
        variant="dark"
      />

      {/* Full-bleed image — matches HTML about.html */}
      <div className="overflow-hidden">
        <img
          src="/assets/prop-living.jpg"
          alt="A living room opening onto forest"
          loading="lazy"
          width={1600}
          height={1000}
          className="w-full object-cover"
          style={{ height: "105vh" }}
        />
      </div>

      <Section>
        <div className="grid gap-px bg-border md:grid-cols-2">
          {blocks.map((b) => (
            <article key={b.t} className="bg-background p-10">
              <p className="eyebrow text-gold">{b.t}</p>
              <p className="mt-4 font-display text-2xl leading-snug text-primary">{b.d}</p>
            </article>
          ))}
        </div>
      </Section>


    </PageShell>
  );
}
