import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The one motif that recurs across the whole page: a thin vertical line
 * with a small glowing dot that travels down it as the visitor scrolls —
 * the same "signal" that SignalCore and Pipeline animate locally, just
 * pulled out to the scale of the entire page. It's what makes the page
 * read as one continuous system rather than a stack of sections.
 *
 * Fixed position, sits behind content (low z-index), hidden below tablet
 * width where there isn't room for it to read as anything but clutter.
 */
export default function PageSpine() {
  const dotRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (reduceMotion || !isDesktop) return;

    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.4,
      onUpdate: (self) => {
        const pct = `${(self.progress * 100).toFixed(2)}%`;
        if (dotRef.current) dotRef.current.style.top = pct;
        if (fillRef.current) fillRef.current.style.height = pct;
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div className="saom-spine" aria-hidden="true">
      <div className="saom-spine-track" />
      <div className="saom-spine-fill" ref={fillRef} />
      <div className="saom-spine-dot" ref={dotRef} />
    </div>
  );
}
