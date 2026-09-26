import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, PageShell, Section } from "@/components/site/page";

export const Route = createFileRoute("/investment-estimator")({
  head: () => ({
    meta: [
      { title: "Investment Estimator — Per Square Feet" },
      {
        name: "description",
        content:
          "Model returns across land, plots and emerging Indian markets with an illustrative investment calculator.",
      },
      { property: "og:title", content: "Investment Estimator — Per Square Feet" },
      {
        property: "og:description",
        content: "Estimate appreciation, yield and infrastructure-led upside before you commit.",
      },
    ],
  }),
  component: InvestmentEstimator,
});

const opportunities = [
  {
    t: "Land & Plots",
    d: "Sanctioned plots on the edge of established suburbs, held for five to eight years.",
    r: "9–12% p.a.",
  },
  {
    t: "Emerging Markets",
    d: "Second-ring corridors where employment is arriving ahead of housing supply.",
    r: "11–15% p.a.",
  },
  {
    t: "Infrastructure-Led Growth",
    d: "Parcels within two kilometres of confirmed metro, ring road or airport works.",
    r: "8–14% p.a.",
  },
];

function InvestmentEstimator() {
  const [amount, setAmount] = useState(20000000);
  const [years, setYears] = useState(7);
  const [rate, setRate] = useState(11);

  const future = amount * Math.pow(1 + rate / 100, years);
  const rental = amount * 0.028 * years;
  const inr = (n: number) =>
    "₹ " + (n / 10000000).toFixed(2) + " Cr";

  return (
    <PageShell>
      <PageHeader
        eyebrow="Investment Estimator"
        title="Model the decision, not the mood."
        intro="Illustrative tools for sizing an Indian property investment across land, emerging corridors and infrastructure-led growth. All figures are dummy values."
        variant="dark"
      />

      <Section eyebrow="Investment Opportunities" title="Three routes we currently track.">
        <div className="grid gap-px bg-border md:grid-cols-3">
          {opportunities.map((o) => (
            <article key={o.t} className="bg-background p-8">
              <h3 className="font-display text-2xl text-primary">{o.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{o.d}</p>
              <p className="mt-6 text-[0.65rem] uppercase tracking-[0.22em] text-gold">
                Indicative {o.r}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Investment Calculator" title="A rough shape of the outcome.">
        <div className="grid gap-14 lg:grid-cols-2">
          <div className="space-y-10">
            <Slider
              label="Capital deployed"
              value={`₹ ${(amount / 10000000).toFixed(2)} Cr`}
              min={5000000}
              max={150000000}
              step={2500000}
              raw={amount}
              onChange={setAmount}
            />
            <Slider
              label="Holding period"
              value={`${years} years`}
              min={1}
              max={15}
              step={1}
              raw={years}
              onChange={setYears}
            />
            <Slider
              label="Assumed appreciation"
              value={`${rate}% p.a.`}
              min={4}
              max={18}
              step={1}
              raw={rate}
              onChange={setRate}
            />
          </div>

          <div className="bg-primary p-10 text-primary-foreground">
            <p className="eyebrow text-gold">Estimated position</p>
            <p className="mt-6 font-display text-6xl">{inr(future)}</p>
            <p className="mt-2 text-sm opacity-75">Projected value at exit</p>
            <dl className="mt-10 grid gap-6 border-t border-gold/40 pt-8 sm:grid-cols-2">
              <div>
                <dt className="text-[0.6rem] uppercase tracking-[0.2em] opacity-70">
                  Capital gain
                </dt>
                <dd className="mt-1 text-xl">{inr(future - amount)}</dd>
              </div>
              <div>
                <dt className="text-[0.6rem] uppercase tracking-[0.2em] opacity-70">
                  Indicative rent collected
                </dt>
                <dd className="mt-1 text-xl">{inr(rental)}</dd>
              </div>
            </dl>
            <p className="mt-8 text-xs leading-relaxed opacity-60">
              Illustrative only. Not advice, not a forecast, and deliberately conservative on costs.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="AI Investment Assistant" title="Ask it something specific.">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            "Is a plot in Kharadi better held or built on?",
            "What rental yield should I expect in Alipore?",
            "How does the new ring road change my exit year?",
          ].map((q) => (
            <button
              key={q}
              className="border border-border p-8 text-left transition-colors hover:border-gold"
            >
              <p className="font-display text-xl text-primary">{q}</p>
              <span className="mt-6 block text-[0.65rem] uppercase tracking-[0.22em] text-gold">
                Ask →
              </span>
            </button>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  raw,
  onChange,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  raw: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between">
        <span className="eyebrow text-muted-foreground">{label}</span>
        <span className="font-display text-2xl text-primary">{value}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={raw}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-4 w-full accent-[var(--gold)]"
      />
    </label>
  );
}
