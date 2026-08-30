import { cn } from "../lib/utils";

/**
 * Editorial section heading: small mono eyebrow label + large display title.
 * Animation is applied by the parent via GSAP (elements are targeted through
 * the .reveal-line / .reveal-word classes), keeping scroll choreography
 * centralized in Home.jsx.
 */
export default function SectionHeading({
  eyebrow,
  index,
  lines = [],
  align = "left",
  className,
}) {
  return (
    <div className={cn("section-heading", `section-heading--${align}`, className)}>
      {(eyebrow || index) && (
        <div className="section-heading__eyebrow reveal-line">
          {index && <span className="section-heading__index">{index}</span>}
          {eyebrow && <span>{eyebrow}</span>}
        </div>
      )}
      <h2 className="section-heading__title">
        {lines.map((line, i) => (
          <span className="reveal-line" key={i}>
            <span className="reveal-line__inner">{line}</span>
          </span>
        ))}
      </h2>
    </div>
  );
}
