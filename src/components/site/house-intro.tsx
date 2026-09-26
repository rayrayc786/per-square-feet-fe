import { useEffect, useState } from "react";
import bungalow from "@/assets/bungalow-front.jpg";
import portal from "@/assets/portal.jpg";
import interior from "@/assets/interior-hall.jpg";
import doorLeaf from "@/assets/door-leaf.png";

/**
 * Cinematic opening for the Home landing page:
 * wordmark -> bungalow facade -> camera approach -> door opens -> camera enters.
 */
export function HouseIntro({ onDone }: { onDone: () => void }) {
  // 0 wordmark, 1 facade, 2 approach, 3 portal/closed door, 4 door opens, 5 enter
  const [step, setStep] = useState(0);

  useEffect(() => {
    const marks = [900, 1900, 3100, 4300, 5500, 6700];
    const timers = marks.map((ms, i) =>
      window.setTimeout(() => (i === marks.length - 1 ? onDone() : setStep(i + 1)), ms),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [onDone]);

  const doorsOpen = step >= 4;
  const entering = step >= 5;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-primary">
      {/* Wordmark */}
      <div
        className="absolute inset-0 z-30 flex items-center justify-center bg-primary transition-opacity duration-700"
        style={{ opacity: step === 0 ? 1 : 0 }}
      >
        <div className="text-center">
          <p className="font-display text-4xl tracking-[0.35em] text-primary-foreground md:text-6xl">
            PER SQUARE FEET
          </p>
          <span className="mx-auto mt-6 block h-px w-24 bg-gold" />
        </div>
      </div>

      {/* Facade + camera approach */}
      <div
        className="absolute inset-0 transition-all duration-[1600ms] ease-in-out"
        style={{
          opacity: step >= 1 && step < 3 ? 1 : 0,
          transform: `scale(${step >= 2 ? 2.35 : 1.05})`,
          filter: step >= 2 ? "blur(1.5px)" : "none",
        }}
      >
        <img
          src={bungalow}
          alt="Front profile of the bungalow"
          className="h-full w-full object-cover"
          width={1920}
          height={1088}
        />
      </div>

      {/* Portal with door */}
      <div
        className="absolute inset-0 transition-all duration-[1200ms] ease-in-out"
        style={{
          opacity: step >= 3 ? 1 : 0,
          transform: `scale(${entering ? 4.6 : step >= 4 ? 1.35 : 1.08})`,
          filter: entering ? "blur(8px)" : "none",
          transitionDuration: entering ? "1200ms" : "1200ms",
        }}
      >
        <img src={portal} alt="" aria-hidden className="h-full w-full object-cover" />

        {/* Doorway opening: interior visible behind the leaves */}
        <div
          className="absolute overflow-hidden bg-black"
          style={{ left: "37.5%", top: "33%", width: "27%", height: "55%", perspective: "900px" }}
        >
          <img
            src={interior}
            alt="Interior hall of the bungalow"
            className="absolute inset-0 h-full w-full object-cover transition-all duration-[1400ms]"
            style={{
              opacity: doorsOpen ? 1 : 0,
              transform: `scale(${entering ? 1.6 : 1.1})`,
            }}
          />
          <img
            src={doorLeaf}
            alt=""
            aria-hidden
            className="absolute inset-y-0 left-0 h-full w-1/2 origin-left object-fill transition-transform duration-[1500ms] ease-in-out"
            style={{ transform: `rotateY(${doorsOpen ? -88 : 0}deg)` }}
          />
          <img
            src={doorLeaf}
            alt=""
            aria-hidden
            className="absolute inset-y-0 right-0 h-full w-1/2 origin-right object-fill transition-transform duration-[1500ms] ease-in-out"
            style={{ transform: `scaleX(-1) rotateY(${doorsOpen ? -88 : 0}deg)` }}
          />
        </div>
      </div>

      {/* Warm light spill through the door as we enter */}
      <div
        className="pointer-events-none absolute inset-0 bg-background transition-opacity duration-[900ms]"
        style={{ opacity: entering ? 1 : 0 }}
      />

      <button
        onClick={onDone}
        className="absolute bottom-8 right-8 z-40 text-[0.65rem] uppercase tracking-[0.25em] text-primary-foreground/70 transition-colors hover:text-gold"
      >
        Skip
      </button>
    </div>
  );
}
