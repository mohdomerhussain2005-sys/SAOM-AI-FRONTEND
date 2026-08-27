import {
  ShieldCheck,
  Brain,
  BarChart3,
  Users,
  ArrowUpRight,
} from "lucide-react";


const features = [
  {
    icon: ShieldCheck,
    title: "Real-Time Detection",
    description:
      "Detect and respond to threats as they happen.",
  },

  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description:
      "Advanced machine learning for smarter threat hunting.",
  },

  {
    icon: BarChart3,
    title: "Visual Insights",
    description:
      "Interactive dashboards and attack visualization.",
  },

  {
    icon: Users,
    title: "Stronger Together",
    description:
      "A safer digital world with intelligent defense.",
  },
];


export default function FeatureCards() {

  return (

    <section
      className="features-section"
      id="features"
    >

      <div className="feature-grid">

        {features.map((feature) => {

          const Icon = feature.icon;

          return (

            <div
              className="feature-card"
              key={feature.title}
            >

              <div className="feature-top">

                <div className="feature-icon">

                  <Icon size={25} strokeWidth={1.6} />

                </div>

                <ArrowUpRight
                  className="feature-arrow"
                  size={20}
                  strokeWidth={1.5}
                />

              </div>


              <div className="feature-content">

                <h3>
                  {feature.title}
                </h3>

                <p>
                  {feature.description}
                </p>

              </div>

            </div>

          );

        })}

      </div>

    </section>

  );
}