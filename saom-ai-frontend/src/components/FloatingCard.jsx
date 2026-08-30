import { motion } from "framer-motion";
import { cn } from "../lib/utils";

const STATUS_STYLES = {
  online: "status--online",
  warning: "status--warning",
  critical: "status--critical",
};

/**
 * A glass panel card representing a monitored asset. Used in the
 * "One dashboard. Every asset." section, each with its own float depth
 * controlled by the parent via a data-depth attribute for GSAP parallax.
 */
export default function FloatingCard({ name, status, meta, depth = 1, className }) {
  return (
    <motion.div
      className={cn("floating-card", className)}
      data-depth={depth}
      whileHover={{ y: -6, borderColor: "rgba(255,46,68,0.45)" }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
    >
      <div className="floating-card__row">
        <span className="floating-card__name">{name}</span>
        <span className={cn("floating-card__status", STATUS_STYLES[status])}>
          <span className="floating-card__dot" />
          {status}
        </span>
      </div>
      {meta && <div className="floating-card__meta">{meta}</div>}
    </motion.div>
  );
}
