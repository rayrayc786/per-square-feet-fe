import { Section } from "./page";

const testimonials = [
  {
    text: "We were juggling dozens of listings in unfamiliar locations and worried about clear titles and approvals. The Casstle Co. team curated a shortlist of trusted projects, connected us with vetted lawyers to verify each title, and guided us step-by-step. Their support helped us make an informed decision quickly and confidently.",
    author: "Anish Kapoor, Bengaluru",
    num: "01",
  },
  {
    text: "As NRIs living abroad, coordinating a property purchase in India felt daunting. The Casstle Co. arranged site visits during our trip, connected us with local legal experts, and ensured every step was transparent and properly documented. Their guidance made owning our Goa villa stress-free and trustworthy. We no longer worried about language barriers or paperwork.",
    author: "Deepak Menon, Dubai",
    num: "02",
  },
  {
    text: "We wanted a mountain retreat but found conflicting information about connectivity and amenities. The Casstle Co. team’s detailed briefing helped us compare locations accurately. They pointed out a property with private road access and clear land titles – exactly what we needed for our family’s peace of mind. We finally felt confident to make a move.",
    author: "Aman Sood, Gurugram",
    num: "03",
  },
  {
    text: "Our family wanted a calm weekend home with space for the kids and pets, but managing everyone’s needs seemed impossible. The advisors listened carefully to our lifestyle priorities and suggested family-friendly communities, even handling travel logistics. By focusing on what mattered most, they helped us find the perfect countryside farmhouse.",
    author: "Alisha Mehta, Pune",
    num: "04",
  },
  {
    text: "With demanding jobs and little spare time, researching second-home projects was nearly impossible. The Casstle Co. streamlined everything: they noted our preferences, filtered out unsuitable options, and organized site tours over one weekend. We saved weeks of effort and gained confidence that we chose wisely. The efficiency was truly invaluable to us.",
    author: "Rahul Sen, Hyderabad",
    num: "05",
  },
  {
    text: "We weren’t interested in treating our second home as an investment rental. We wanted a personal sanctuary. The Casstle Co. team respected that and showcased villas known for privacy and wellness features. They didn’t push any returns projections or rental schemes; they simply helped us discover a home aligned with how our family lives. It made all the difference.",
    author: "Simran Kaur, Delhi",
    num: "06",
  },
  {
    text: "As siblings co-investing in a farmhouse, the legal structure confused us. The Casstle Co. explained co-ownership models clearly and introduced us to legal counsel to draft our agreement. Now we each own part of a beautiful retreat with no lingering questions about the paperwork, finally!!",
    author: "Ayesha Khan, Lucknow",
    num: "07",
  },
  {
    text: "We needed a property with long-term value but were afraid of overpriced beachfront projects. Instead of pitching an expensive option, the team provided comparative data on coastal markets and advised us on mid-range projects with strong demand. Their honest guidance and local insights gave us confidence and that investment has almost doubled by now, thanks to Guneet from the team",
    author: "Kunal Bhatt, Kochi",
    num: "08",
  },
  {
    text: "After buying our weekend home through another company, we realized we needed ongoing support for upkeep. The Casstle Co. team recommended a reliable property manager and shared tips on local maintenance providers. Even after closing, their guidance made our ownership experience seamless and worry-free.",
    author: "Suresh Rao, Mumbai",
    num: "09",
  }
];

export function Testimonials() {
  return (
    <Section className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        {/* Left Side: Sticky Text */}
        <div className="lg:w-[30%] lg:sticky lg:top-32 shrink-0 pt-12 md:pt-32">
          <h2 className="text-5xl md:text-6xl font-display font-semibold text-foreground mb-8 border-t-[3px] border-gold pt-8">
            Success Story
          </h2>
          <p className="text-foreground/80 leading-relaxed text-[15px]">
            <strong>Wondering what our clients have to say?</strong> Our success is reflected in the experiences of the people we work with. From personalised guidance to a seamless property journey, these stories showcase the trust, professionalism and commitment we bring to every client.
          </p>
        </div>

        {/* Right Side: Staggered Columns */}
        <div className="lg:w-[70%] grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-6 md:mt-32">
            {[testimonials[0], testimonials[3], testimonials[6]].filter(Boolean).map((t) => (
              <TestimonialCard key={t!.num} t={t!} />
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-6 md:mt-16">
            {[testimonials[1], testimonials[4], testimonials[7]].filter(Boolean).map((t) => (
              <TestimonialCard key={t!.num} t={t!} />
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-6">
            {[testimonials[2], testimonials[5], testimonials[8]].filter(Boolean).map((t) => (
              <TestimonialCard key={t!.num} t={t!} />
            ))}
          </div>

        </div>
      </div>
    </Section>
  );
}

function TestimonialCard({ t }: { t: any }) {
  return (
    <div className="relative bg-[#113824] rounded-lg p-6 md:p-8 text-white shadow-sm overflow-hidden flex-shrink-0 w-full">
      {/* Giant Background Number */}
      <div className="absolute top-0 right-4 text-[120px] font-display font-bold text-white/[0.03] leading-none select-none pointer-events-none">
        {t.num}
      </div>
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Quote Icon */}
        <span className="text-gold text-2xl leading-none font-serif block mb-2">“</span>
        <p className="text-white/90 text-[13px] leading-relaxed mb-8 flex-grow">
          {t.text}
        </p>
        <div className="w-full h-px bg-white/20 mb-4 mt-auto"></div>
        <p className="text-xs font-semibold tracking-wide">
          {t.author}
        </p>
      </div>
    </div>
  );
}
