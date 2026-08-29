import { motion } from "framer-motion";

const ITEMS = [
  "SECURITY ASSESSMENT",
  "SECURITY OPERATIONS",
  "CONTINUOUS MONITORING",
  "THREAT INTELLIGENCE",
  "AUTONOMOUS RESPONSE",
  "ATTACK SURFACE VISIBILITY",
];

export default function SecurityMarquee() {
  return (
    <div className="saom-marquee" aria-label="SAOM-AI security capabilities">
      <motion.div
        className="saom-marquee-track"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...ITEMS, ...ITEMS].map((item, index) => (
          <div
            className="saom-marquee-item"
            key={`${item}-${index}`}
          >
            <span className="saom-marquee-dot" />
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}