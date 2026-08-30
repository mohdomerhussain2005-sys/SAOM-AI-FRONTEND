import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

/**
 * A button that subtly pulls toward the cursor on hover, with an
 * arrow that leads the motion. Used for primary CTAs across the page.
 */
export default function MagneticButton({
  children,
  onClick,
  href,
  variant = "solid",
  className,
}) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function handleMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    setOffset({ x: relX * 0.25, y: relY * 0.35 });
  }

  function handleLeave() {
    setOffset({ x: 0, y: 0 });
  }

  const Tag = href ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.4 }}
      className={cn("magnetic-wrap", className)}
    >
      <Tag
        href={href}
        onClick={onClick}
        className={cn("magnetic-btn", variant === "ghost" && "magnetic-btn--ghost")}
        data-cursor="hover"
      >
        <span className="magnetic-btn__label">{children}</span>
        <motion.span
          className="magnetic-btn__arrow"
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
        >
          →
        </motion.span>
        <span className="magnetic-btn__glow" />
      </Tag>
    </motion.div>
  );
}
