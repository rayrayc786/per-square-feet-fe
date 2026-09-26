import { useEffect, useState, useRef, useCallback } from "react";

export function Entrance({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  const finish = useCallback(() => {
    try {
      window.sessionStorage.setItem("psf.entered", "1");
    } catch {
      /* ignore */
    }
    document.body.style.overflow = "";
    onDoneRef.current();
  }, []);

  useEffect(() => {
    try {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const seen = window.sessionStorage.getItem("psf.entered") === "1";
      if (reduced || seen) {
        onDoneRef.current();
        return;
      }
    } catch {
      /* ignore */
    }

    document.body.style.overflow = "hidden";

    const marks = [1400, 3600, 5300, 6900, 7900];
    const timers = marks.map((ms, i) =>
      window.setTimeout(() => {
        if (i === marks.length - 1) {
          finish();
        } else {
          setPhase(i + 1);
        }
      }, ms),
    );

    return () => {
      timers.forEach(window.clearTimeout);
      document.body.style.overflow = "";
    };
  }, [finish]);

  const approach = phase >= 1;
  const doorOpen = phase >= 2;
  const through = phase >= 3;

  return (
    <div
      className="entrance"
      data-entrance
      aria-label="Arrival sequence"
      style={{ opacity: phase >= 4 ? 0 : 1 }}
    >
      <div
        className="entrance-exterior"
        data-entrance-exterior
        style={{
          transform: `scale(${through ? 3.1 : approach ? 1.35 : 1.08})`,
          opacity: phase === 0 ? 0.35 : 1,
          filter: through ? "blur(6px)" : "none",
        }}
      >
        <img
          src="/assets/bungalow-exterior.jpg"
          alt="A private bungalow at dusk, its door closed"
          width={1920}
          height={1088}
        />
        <div className="tint" />
        <div className="entrance-door" data-entrance-door-wrap>
          <div
            className="entrance-door-leaf"
            data-entrance-door
            style={{
              transform: doorOpen ? "rotateY(-88deg)" : "rotateY(0deg)",
            }}
          />
          <div
            className="entrance-door-glow"
            data-entrance-door-glow
            style={{ opacity: doorOpen ? 1 : 0 }}
          >
            <img src="/assets/bungalow-interior.jpg" alt="" />
          </div>
        </div>
      </div>

      <div
        className="entrance-interior"
        data-entrance-interior
        style={{
          opacity: through ? 1 : 0,
          transform: `scale(${through ? 1 : 1.22})`,
        }}
      >
        <img
          src="/assets/bungalow-interior.jpg"
          alt="The interior of the residence, seen from the doorway"
          width={1920}
          height={1088}
        />
        <div className="tint" />
      </div>

      <div
        className="entrance-wordmark"
        data-entrance-wordmark
        style={{ opacity: phase === 0 ? 1 : 0 }}
      >
        <p className="eyebrow">Per Square Feet</p>
      </div>

      <button
        type="button"
        className="eyebrow entrance-skip"
        data-entrance-skip
        onClick={finish}
      >
        Enter
      </button>
    </div>
  );
}
