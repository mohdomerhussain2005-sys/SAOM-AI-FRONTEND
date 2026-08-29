import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

export default function FinalCTA() {
  return (
    <section className="saom-final-cta" id="contact">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        Security that thinks ahead.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
      >
        See what SAOM-AI catches before it becomes an incident.
      </motion.p>

      <motion.a
        href="#top"
        className="saom-final-cta-link"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
      >
        Request Access
        <ArrowUpRight size={16} />
      </motion.a>
    </section>
  );
}
