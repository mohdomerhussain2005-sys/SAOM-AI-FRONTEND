import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CyberGlobe from "./CyberGlobe";

const EASE = [0.16, 1, 0.3, 1];

// Small system labels that float near the globe — not decoration, they
// state what the globe is actually showing (live monitoring, coverage).
const SYSTEM_LABELS = [
  { text: "GLOBAL COVERAGE", className: "hero-tag hero-tag-a" },
  { text: "LIVE MONITORING", className: "hero-tag hero-tag-b" },
];

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="badge-dot" />
          AI-POWERED CYBER DEFENSE
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
        >
          Smarter
          <br />
          <span>Threat Detection.</span>
          <br />
          <strong>A Safer Tomorrow.</strong>
        </motion.h1>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
        >
          SAOM-AI is an Autonomous AI Security Operations
          platform that detects, analyzes, and responds to
          cyber threats in real time — because your security
          never sleeps.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.28 }}
        >
          <Link to="/signup" className="hero-primary">
            Get Started
            <ArrowRight size={18} />
          </Link>

          <button className="hero-secondary">
            <Play size={14} fill="currentColor" />
            Watch Demo
          </button>
        </motion.div>
      </div>

      <motion.div
        className="hero-visual"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.15 }}
      >
        <CyberGlobe />

        {SYSTEM_LABELS.map((label) => (
          <span key={label.text} className={label.className}>
            <i />
            {label.text}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
