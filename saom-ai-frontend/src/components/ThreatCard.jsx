import { motion } from "framer-motion";
import { cn } from "../lib/utils";

/**
 * A single stage in the detection pipeline or incident-state ladder.
 * `active` marks the current highlighted stage (usually the critical /
 * threat state) which receives the red treatment; others stay muted.
 */
export default function ThreatCard({ label, value, active = false, className }) {
  return (
    <motion.div
      className={cn("threat-card", active && "threat-card--active", className)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="threat-card__value">{value}</span>
      <span className="threat-card__label">{label}</span>
    </motion.div>
  );
}
