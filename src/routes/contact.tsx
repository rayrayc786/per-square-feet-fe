import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, Section } from "@/components/site/page";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — THE CASSTLE CO" },
      {
        name: "description",
        content: "Speak to a THE CASSTLE CO advisor about buying, selling or investing in India.",
      },
      { property: "og:title", content: "Contact — THE CASSTLE CO" },
      {
        property: "og:description",
        content: "Send an enquiry and an advisor will be in touch.",
      },
    ],
  }),
  component: Contact,
});

const fieldContainer = "flex flex-col gap-2 border-b border-border py-4 focus-within:border-gold transition-colors";
const labelStyle = "eyebrow text-muted-foreground";
const inputStyle = "w-full bg-transparent text-sm text-primary outline-none placeholder:text-primary/40";

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <PageShell>
      <Section className="py-24 md:py-36">
        <div className="grid gap-16 lg:grid-cols-2 max-w-6xl mx-auto items-start">
          
          {/* Left Column: Heading and Info */}
          <div className="flex flex-col animate-rise">
            <p className="eyebrow text-gold mb-8">CONTACT US</p>
            <h1 className="font-display text-5xl leading-[1.1] md:text-6xl text-primary mb-6">
              Let's find<br />your next space.
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-md mb-16">
              Tell us what you're looking for. We'll take it from there.
            </p>

            <div className="w-12 h-px bg-gold mb-16"></div>

            <p className="eyebrow text-muted-foreground mb-4">PREFER A PRIVATE CONVERSATION?</p>
            <a
              href="https://wa.me/919310698305"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-gold px-6 py-3 text-[0.68rem] uppercase tracking-[0.2em] text-primary transition-colors hover:bg-gold hover:text-white"
            >
              Speak to an advisor
            </a>
          </div>

          {/* Right Column: Form */}
          <div className="animate-rise" style={{ animationDelay: "150ms" }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="flex flex-col gap-2"
            >
              <div className={fieldContainer}>
                <label className={labelStyle}>NAME</label>
                <input className={inputStyle} placeholder="Your name" required />
              </div>

              <div className={fieldContainer}>
                <label className={labelStyle}>PHONE</label>
                <div className="flex items-center gap-2">
                  <select className="bg-transparent text-sm text-primary outline-none cursor-pointer border-none py-0 pl-0 pr-2 w-auto appearance-none shrink-0" defaultValue="+91">
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+61">+61</option>
                    <option value="+971">+971</option>
                    <option value="+65">+65</option>
                  </select>
                  <input className={inputStyle} placeholder="Phone number" type="tel" maxLength={11} required />
                </div>
              </div>

              <div className={fieldContainer}>
                <label className={labelStyle}>EMAIL</label>
                <input className={inputStyle} placeholder="you@email.com" type="email" required />
              </div>

              <div className={fieldContainer}>
                <label className={labelStyle}>PREFERRED LOCATION</label>
                <select className={`${inputStyle} appearance-none bg-transparent cursor-pointer`} defaultValue="">
                  <option value="" disabled hidden>No preference</option>
                  <option value="mountains">The Mountains</option>
                  <option value="beach">The Beach</option>
                  <option value="countryside">The Countryside</option>
                  <option value="temple">The Temple town</option>
                </select>
              </div>

              <div className={fieldContainer}>
                <label className={labelStyle}>BUDGET</label>
                <select className={`${inputStyle} appearance-none bg-transparent cursor-pointer`} defaultValue="2-3">
                  <option value="1-2">₹1-2 Cr</option>
                  <option value="2-3">₹2-3 Cr</option>
                  <option value="3-5">₹3-5 Cr</option>
                  <option value="5+">₹5+ Cr</option>
                </select>
              </div>

              <div className={`${fieldContainer} border-none`}>
                <label className={labelStyle}>WHAT ARE YOU LOOKING FOR?</label>
                <textarea 
                  className={`${inputStyle} resize-none pt-2`} 
                  rows={3} 
                  placeholder="A private mountain villa for weekends, within four hours of Delhi." 
                />
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full sm:w-auto border border-primary bg-primary px-10 py-4 text-[0.68rem] uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-background hover:text-primary"
                >
                  {sent ? "Enquiry noted" : "Submit"}
                </button>
                {sent ? (
                  <p className="mt-4 text-sm text-gold font-medium">
                    Thank you. Your dedicated relationship manager will get in touch with you shortly.
                  </p>
                ) : null}
              </div>
            </form>
          </div>

        </div>
      </Section>
    </PageShell>
  );
}
