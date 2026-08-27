import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero" id="home">

      <div className="hero-content">

        <div className="hero-badge">
          <span className="badge-dot" />
          AI-POWERED CYBER DEFENSE
        </div>

        <h1>
          Smarter
          <br />

          <span>
            Threat Detection.
          </span>

          <br />

          <strong>
            A Safer Tomorrow.
          </strong>
        </h1>

        <p className="hero-description">
          SAOM-AI is an Autonomous AI Security Operations
          platform that detects, analyzes, and responds to
          cyber threats in real time — because your security
          never sleeps.
        </p>

        <div className="hero-buttons">

          <Link to="/signup" className="hero-primary">
            Get Started
            <ArrowRight size={18} />
          </Link>

          <button className="hero-secondary">
            <Play size={14} fill="currentColor" />
            Watch Demo
          </button>

        </div>

      </div>

      <div className="hero-visual">

        <div className="globe-placeholder">
          <div className="globe-core">
            <span>SAOM-AI</span>
          </div>
        </div>

      </div>

    </section>
  );
}