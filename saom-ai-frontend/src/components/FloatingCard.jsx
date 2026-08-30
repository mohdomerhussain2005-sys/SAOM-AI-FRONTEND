import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATUS_LABEL = {
  online: "Online",
  warning: "Warning",
  critical: "Critical",
};

export default function FloatingCard({ name, status, meta, load, speed = 1 }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y: 40 * speed, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 92%",
          },
        }
      );

      gsap.to(ref.current, {
        y: -18 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div className={`floating-card ${status}`} ref={ref}>
      <div className="floating-card__top">
        <span className="floating-card__name">{name}</span>
        <span className={`floating-card__status ${status}`}>{STATUS_LABEL[status]}</span>
      </div>
      <span className="floating-card__meta">{meta}</span>
      <div className="floating-card__bar">
        <span style={{ width: `${load}%` }} />
      </div>
    </div>
  );
}
