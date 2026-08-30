import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Renders a multi-line heading where each `lines` entry is its own
 * overflow-hidden mask that GSAP reveals with a upward stagger as
 * the heading enters the viewport.
 *
 * lines: Array<{ text: string, className?: string }>
 */
export default function SectionHeading({ label, lines, sub, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const spans = ref.current.querySelectorAll(".section-heading .line span");
      gsap.set(spans, { yPercent: 110 });

      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 82%",
        once: true,
        onEnter: () => {
          gsap.to(spans, {
            yPercent: 0,
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.08,
          });
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {label && <span className="section-label">{label}</span>}
      <h2 className="section-heading">
        {lines.map((line, i) => (
          <span className="line" key={i}>
            <span className={line.className || ""}>{line.text}</span>
          </span>
        ))}
      </h2>
      {sub && <p className="intro__copy" style={{ marginTop: "1.4rem" }}>{sub}</p>}
    </div>
  );
}
