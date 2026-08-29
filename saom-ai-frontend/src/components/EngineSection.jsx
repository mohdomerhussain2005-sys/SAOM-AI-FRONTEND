import { motion } from "framer-motion";
import BacktrackingGraph from "./BacktrackingGraph";

const EASE = [0.16, 1, 0.3, 1];

/**
 * Act 03 — SIGNAL → INTELLIGENCE → DECISION → RESPONSE, followed by a
 * second beat: BACKTRACKING.
 *
 * SignalCore already animates the core loop on its own, large and mostly
 * wordless. Once that's landed, a second block introduces backtracking —
 * SAOM-AI's ability to walk itself back through a chain of signals it
 * already reasoned over, re-evaluate them, and find where an attack
 * actually started. It gets its own visual (BacktrackingGraph) rather
 * than being folded into SignalCore, because it's a distinct capability,
 * not another view of the same loop. BehindSignal (untouched) still
 * follows this section and explains the architecture behind it.
 */
export default function EngineSection() {
  return (
    <section className="saom-engine-section" id="engine">
      <div className="saom-engine-intro">
        <motion.span
          className="section-eyebrow"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span />
          THE ENGINE
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
        >
          This is SAOM-AI, thinking.
        </motion.h2>


        <motion.p
          className="saom-engine-caption"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          A threat signal arrives, the core reasons over it, a response
          leaves. Every cycle, continuously.
        </motion.p>
      </div>

      <div className="saom-backtrack-block">
        <motion.span
          className="section-eyebrow"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span />
          BACKTRACKING
        </motion.span>

        <motion.h3
          className="saom-backtrack-heading"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
        >
          Sometimes the answer is behind you.
        </motion.h3>

        <motion.div
          className="saom-backtrack-visual"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        >
          <BacktrackingGraph />
        </motion.div>

      </div>
    </section>
  );
}