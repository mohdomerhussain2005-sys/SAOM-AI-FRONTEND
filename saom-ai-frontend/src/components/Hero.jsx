 import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import CyberGlobe from "./CyberGlobe";

export default function Hero() {
  return (
    <section className="hero" id="home">

      {/* ================================
          LEFT SIDE
      ================================= */}

      <div className="hero-content">

         <div className="hero-badge">
         <span className="badge-dot" />
        SEE WHAT OTHERS MISS
        </div>

 <h1 className="hero-title">

  <span className="hero-kicker">
    THE THREAT ISN'T ALWAYS
  </span>

  <span className="hero-main-line">
    LOUD.
  </span>

  <span className="hero-subline">
    It hides in the pattern.
  </span>

</h1>

         <p className="hero-description">
         SAOM-AI connects scattered signals, uncovers
         suspicious behavior, and turns noise into a
         clear picture of what's happening.
        </p>

        <div className="hero-buttons">

          <Link
            to="/signup"
            className="hero-primary"
          >
            Get Started

            <ArrowRight size={18} />
          </Link>

          <button className="hero-secondary">

            <Play
              size={14}
              fill="currentColor"
            />

            Watch Demo

          </button>

        </div>

      </div>


      {/* ================================
          RIGHT SIDE
      ================================= */}

      <div className="hero-visual">

        <CyberGlobe />


        {/* LIVE THREAT */}

        <div className="threat-card threat-live">

          <div className="threat-heading">

            <span className="live-dot" />

            LIVE THREAT

          </div>

          <div className="threat-title">
            Brute Force Attempt
          </div>

          <div className="threat-subtitle">
            SSH · 192.168.1.45
          </div>

        </div>


        {/* THREAT BLOCKED */}

        <div className="threat-card threat-blocked">

          <div className="threat-heading">

            <span className="shield-icon">
              ✓
            </span>

            THREAT BLOCKED

          </div>

          <div className="threat-title">
            Malicious IP
          </div>

          <div className="threat-subtitle">
            185.199.110.23
          </div>

        </div>


        {/* ANALYZING */}

        <div className="threat-card threat-analyzing">

          <div className="threat-heading">

            <span className="analysis-icon">
              ≋
            </span>

            ANALYZING

          </div>

          <div className="threat-title">
            Unusual Network Activity
          </div>

        </div>


        {/* AI INSIGHT */}

        <div className="threat-card threat-ai">

          <div className="threat-heading">

            <span className="ai-icon">
              ✦
            </span>

            AI INSIGHT

          </div>

          <div className="threat-title">
            Possible Lateral Movement
          </div>

          <div className="threat-subtitle">
            Detected
          </div>

        </div>


        {/* GLOBAL LABEL */}

        <div className="global-label">

          <span>
            GLOBAL THREATS.
          </span>

          <span>
            REAL-TIME INTELLIGENCE.
          </span>

          <i />

        </div>

      </div>

    </section>
  );
}