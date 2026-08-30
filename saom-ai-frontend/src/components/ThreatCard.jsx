import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ThreatCard({ index, title, isThreat = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, x: -16 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 90%" },
        }
      );

      if (isThreat) {
        gsap.to(ref.current.querySelector(".pipeline__dot"), {
          scale: 1.6,
          opacity: 0.4,
          duration: 0.9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, ref);

    return () => ctx.revert();
  }, [isThreat]);

  return (
    <div className={`pipeline__node ${isThreat ? "threat" : ""}`} ref={ref}>
      <span className="pipeline__node-index">{index}</span>
      <span className="pipeline__node-title">{title}</span>
      <span className="pipeline__dot" />
    </div>
  );
}
