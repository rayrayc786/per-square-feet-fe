import { Section } from "./page";

const testimonials = [
  {
    text: "It's been my pleasure working with Raveena & team. They're a team of consummate professionals who'll leave no stone unturned to reach their goal. I wish them the very best in their endeavours.",
    author: "Prakash Krishna",
    num: "01",
  },
  {
    text: "Had a wonderful experience interacting with Raveena and Disha..they are ready to go an extra mile to understand the requirement of prospective investors very patiently and suggest suitable options..very professional and supportive team.",
    author: "Shruti N",
    num: "02",
  },
  {
    text: "Raveena @Whitepuppies Realty is a true professional real estate consultant. She is proactive and understands the nuances of the complex deals. It was good to have them to advise us for our property transaction.",
    author: "Ramesh Krishnamurthy",
    num: "03",
  },
  {
    text: "Excellent choice of properties, which are clear, premium and hassle-free. We loved interacting with Dale and Raveena, who guided us through the entire process, showed us a range of properties, understood our requirements and shared all the documents for a thorough legal validation.",
    author: "Bhushan Dhade",
    num: "04",
  },
  {
    text: "My husband and I recently looked at the Coorg project of White Puppies. We were so impressed with the professional yet personalised attention and the detailing of all aspects that we went ahead and invested. Both Raveena and Dale were quick to respond and answer our various queries.",
    author: "Nandini Yadav",
    num: "05",
  },
  {
    text: "Had a really smooth and professional experience working with White Puppies Realty on our project. A special thanks to Disha, who was incredibly helpful, responsive, and patient with all our questions throughout the process - she made everything so much easier to understand. Raveena was also fantastic, always ready to help and guide us whenever we needed it. Highly recommend the team to anyone looking for a reliable and dedicated realty experience!",
    author: "Pradeep Singh",
    num: "06",
  },
  {
    text: "We had an exceptionally smooth and easy experience working with the team. Dale was very professional and courteous throughout the process. We felt very happy with our overall interactions and the journey.",
    author: "Nikhil Hirve",
    num: "07",
  },
  {
    text: "Had a very professional and wonderful experience dealing with them. Highly recommended. Especially immense support from Disha, she was absolutely spot on for customer experience.",
    author: "Curiousmindsbydharm",
    num: "08",
  },
  {
    text: "I had an excellent experience working with White Puppies Realty, both digitally and face-to-face. Their professionalism, personal touch, and forward-thinking approach really stood out to me. I truly believe wellness and mental health will become an increasingly important part of our lives in the coming years, and White Puppies Realty is ahead of the game in recognizing that. Wishing the entire team continued success and all the very best!",
    author: "Raj Monnappa",
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
