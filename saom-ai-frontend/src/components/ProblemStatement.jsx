import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATEMENT =
  "See the threat.Before it becomes one.";

export default function ProblemStatement() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray(".saom-statement-word");

      if (reduceMotion) {
        gsap.set(words, { color: "var(--ink)" });
        return;
      }

      gsap.to(words, {
        color: "var(--ink)",
        stagger: 0.04,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          end: "bottom 55%",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="saom-section saom-section-tight problem-section"
      ref={sectionRef}
    >
      <span className="saom-eyebrow">The Problem</span>

      <p className="saom-statement-text">
        {STATEMENT.split(" ").map((word, i) => (
          // The trailing {" "} is the actual fix: without a real space
          // character between adjacent inline spans, the browser has no
          // point to break the line at, so the whole sentence renders as
          // one unbreakable run and overflows its container.
          <span className="saom-statement-word" key={i}>
            {word}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}