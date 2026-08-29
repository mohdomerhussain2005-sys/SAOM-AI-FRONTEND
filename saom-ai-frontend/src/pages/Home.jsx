import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SecurityMarquee from "../components/SecurityMarquee";
import ProblemStatement from "../components/ProblemStatement";
import EngineSection from "../components/EngineSection";
import Pipeline from "../components/PipeLine";
import GlobalLayer from "../components/GlobalLayer";
import Visibility from "../components/Visibility";
import FeatureCards from "../components/FeatureCards";
import FinalCTA from "../components/FinalCTA";
import PageSpine from "../components/PageSpine";

// NOTE ON PATHS: this file assumes every component sits flat under
// ../components/. Your uploaded Navbar.jsx and PipeLine.jsx import
// "../../data/landingData" or similar in your project — if PipeLine.jsx
// lives one folder deeper, adjust that import line above to match.

function Home() {
  return (
    <div className="saom-page">
      {/* The spine is the one recurring visual thread — a thin line with a
          traveling signal-dot — that runs behind every section below. It's
          fixed/absolute positioned internally, so it doesn't affect layout. */}
      <PageSpine />

      <Navbar />

      <main>
        {/* ACT 01 — Introduce the product */}
        <Hero />

        <SecurityMarquee />

        {/* ACT 02 — Establish the problem, before any solution is shown */}
        <ProblemStatement />

        {/* ACT 03 — SignalCore comes alive, then resolves into the
            architecture explainer. One continuous section, one story. */}
        <EngineSection />

        {/* ACT 04 — Attack Intelligence Core: signal → correlation →
            behavior → intelligence → action, scroll-driven. This is the
            rebuilt Pipeline component — same import, new content. */}
        <Pipeline />

        {/* ACT 05 — The global layer: let the globe breathe */}
        <GlobalLayer />

        <Visibility />

        {/* Capabilities */}
        <FeatureCards />

        {/* Close */}
        <FinalCTA />
      </main>
    </div>
  );
}

export default Home;