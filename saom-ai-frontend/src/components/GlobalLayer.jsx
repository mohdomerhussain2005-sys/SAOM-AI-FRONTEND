import { motion } from "framer-motion";
import SecurityTopology from "./SecurityTopology";

const EASE = [0.16, 1, 0.3, 1];

/**
 * Act 06 — the global layer. Previously a 3D globe; replaced with an
 * abstract topology of the environment itself — identities, endpoints,
 * cloud, network and applications as one connected graph, with a threat
 * signal traced live across it on scroll. Still deliberately sparse: one
 * eyebrow, one line, the visual. No cards, no stat tiles here — those
 * live in Stats/Visibility right after. This section's only job is to
 * make the scale AND the connectedness of the thing felt.
 */
export default function GlobalLayer() {
  return (
    <section className="saom-global-layer" id="global">
      <motion.div
        className="saom-global-head"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="section-eyebrow">
          <span />
          GLOBAL LAYER
        </span>
        <h2>
          Every identity, endpoint,
          <br />
          <strong>one connected graph.</strong>
        </h2>
      </motion.div>

      <motion.div
        className="saom-global-visual"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
      >
        <SecurityTopology />
      </motion.div>
    </section>
  );
}