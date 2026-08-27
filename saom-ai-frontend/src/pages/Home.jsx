import AttackIntelligence from "../components/AttackIntelligence";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCards from "../components/FeatureCards";
import BehindSignal from "../components/BehindSignal";

function Home() {
  return (
    <div className="saom-page">

      <Navbar />

      <main>

        <Hero />

        <AttackIntelligence />

        <FeatureCards />

        <BehindSignal />

      </main>

    </div>
  );
}

export default Home;