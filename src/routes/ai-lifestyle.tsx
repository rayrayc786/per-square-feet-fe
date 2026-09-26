import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, PageShell, Section } from "@/components/site/page";
import { properties } from "@/lib/site-data";

export const Route = createFileRoute("/ai-lifestyle")({
  head: () => ({
    meta: [
      { title: "AI Lifestyle — Per Square Feet" },
      {
        name: "description",
        content:
          "Answer six questions and receive an AI lifestyle match with a personalised shortlist of Indian homes.",
      },
      { property: "og:title", content: "AI Lifestyle — Per Square Feet" },
      {
        property: "og:description",
        content: "A shortlist shaped around how you actually live, not just what you can afford.",
      },
    ],
  }),
  component: AiLifestyle,
});

const questions = [
  { q: "What are you looking for?", a: ["A home to live in", "A second home", "An investment"] },
  { q: "Where would you like to be?", a: ["Bengaluru", "Mumbai", "Goa", "Hyderabad"] },
  { q: "What's your budget?", a: ["Under ₹ 5 Cr", "₹ 5–10 Cr", "Above ₹ 10 Cr"] },
  { q: "What lifestyle matters to you?", a: ["Quiet & green", "Walkable & social", "Coastal"] },
  { q: "What kind of property?", a: ["Villa", "Apartment", "Heritage", "Penthouse"] },
  { q: "What's most important to you?", a: ["Light", "Space", "Location", "Long-term value"] },
];

function AiLifestyle() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const complete = Object.keys(answers).length === questions.length;

  return (
    <PageShell>
      <PageHeader
        eyebrow="AI lifestyle"
        title="Tell us how you want to live."
        intro="Five questions. A lifestyle profile. A shortlist selected around it."
        variant="dark"
      />

      <Section>
        <div className="grid gap-px bg-border md:grid-cols-2">
          {questions.map((item, i) => (
            <fieldset key={item.q} className="bg-background p-8">
              <legend className="font-display text-2xl text-primary">{item.q}</legend>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.a.map((opt) => {
                  const active = answers[i] === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => setAnswers((s) => ({ ...s, [i]: opt }))}
                      className={`border px-4 py-2 text-[0.68rem] uppercase tracking-[0.16em] transition-colors ${
                        active
                          ? "border-gold bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:border-gold hover:text-primary"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
      </Section>

      <Section eyebrow="AI Lifestyle Match" title={complete ? "Your match." : "Your match, so far."}>
        <div className="bg-primary p-10 text-primary-foreground">
          <p className="font-display text-3xl leading-snug">
            {complete
              ? `A ${(answers[4] ?? "home").toLowerCase()} in ${answers[1]}, chosen for ${(answers[5] ?? "light").toLowerCase()} — ${(answers[3] ?? "quiet").toLowerCase()} streets, within ${answers[2]?.toLowerCase()}.`
              : "Answer the six questions above and we'll describe the kind of home that fits."}
          </p>
          <p className="mt-6 text-sm opacity-75">
            {Object.keys(answers).length} of {questions.length} answered
          </p>
        </div>
      </Section>

      <Section eyebrow="Personalised Shortlist" title="Three homes worth seeing.">
        <div className="grid gap-8 md:grid-cols-3">
          {properties.slice(0, 3).map((p, i) => (
            <article key={p.id}>
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                width={1280}
                height={960}
                className="aspect-[4/3] w-full object-cover"
              />
              <p className="mt-4 text-[0.65rem] uppercase tracking-[0.22em] text-gold">
                {94 - i * 6}% match
              </p>
              <h3 className="mt-2 font-display text-2xl text-primary">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.location}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>
            </article>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
