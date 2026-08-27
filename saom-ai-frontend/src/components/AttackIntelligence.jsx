 import { useState } from "react";

const stages = [
  {
    number: "01",
    label: "THREAT DNA",
    title: "Understand what changed",
    description:
      "SAOM-AI examines the characteristics behind a suspicious event instead of treating every alert as an isolated incident.",
  },
  {
    number: "02",
    label: "ATTACK GRAPH",
    title: "Map how it moves",
    description:
      "Related identities, devices and events are connected to reveal the path a potential threat is taking.",
  },
  {
    number: "03",
    label: "AI REASONING",
    title: "Find the meaning",
    description:
      "Signals are correlated with context and behavior to determine whether an anomaly represents a genuine threat.",
  },
  {
    number: "04",
    label: "ADAPTIVE RESPONSE",
    title: "Decide what matters",
    description:
      "The system prioritizes the situation and determines the most appropriate next action.",
  },
];

function ThreatDNAVisual() {
  return (
    <div className="ai-visual dna-visual">
      <span className="visual-node dna-node-1" />
      <span className="visual-node dna-node-2" />
      <span className="visual-node dna-node-3" />
      <span className="visual-node dna-node-4" />
      <span className="visual-node dna-node-5" />

      <span className="visual-line dna-line-1" />
      <span className="visual-line dna-line-2" />
      <span className="visual-line dna-line-3" />
      <span className="visual-line dna-line-4" />

      <div className="visual-label dna-label">
        BEHAVIORAL SIGNAL
      </div>
    </div>
  );
}

function AttackGraphVisual() {
  return (
    <div className="ai-visual graph-visual">
      <span className="visual-node graph-node-1" />
      <span className="visual-node graph-node-2" />
      <span className="visual-node graph-node-3" />
      <span className="visual-node graph-node-4" />
      <span className="visual-node graph-node-5" />
      <span className="visual-node graph-node-6" />

      <span className="visual-line graph-line-1" />
      <span className="visual-line graph-line-2" />
      <span className="visual-line graph-line-3" />
      <span className="visual-line graph-line-4" />
      <span className="visual-line graph-line-5" />

      <div className="visual-label graph-label">
        ATTACK PATH
      </div>
    </div>
  );
}

function ReasoningVisual() {
  return (
    <div className="ai-visual reasoning-visual">

      <div className="reasoning-signal signal-one">
        IDENTITY
      </div>

      <div className="reasoning-signal signal-two">
        DEVICE
      </div>

      <div className="reasoning-signal signal-three">
        NETWORK
      </div>

      <div className="reasoning-core">
        <span>AI</span>
        CORRELATE
      </div>

      <div className="reasoning-result">
        RISK
        <strong>HIGH</strong>
      </div>

      <span className="reasoning-line reasoning-line-1" />
      <span className="reasoning-line reasoning-line-2" />
      <span className="reasoning-line reasoning-line-3" />

    </div>
  );
}

function ResponseVisual() {
  return (
    <div className="ai-visual response-visual">

      <div className="response-start">
        THREAT
      </div>

      <span className="response-line response-line-1" />

      <div className="response-branch">

        <div className="response-option">
          CONTAIN
        </div>

        <div className="response-option">
          MONITOR
        </div>

      </div>

      <span className="response-line response-line-2" />

      <div className="response-final">
        RESPONSE
      </div>

    </div>
  );
}

function AttackIntelligence() {
  const [activeStage, setActiveStage] = useState(0);

  const stage = stages[activeStage];

  return (
    <section className="attack-intelligence">

      {/* HEADER */}

      <div className="attack-intelligence-header">

        <span className="attack-intelligence-eyebrow">
          HOW SAOM-AI THINKS
        </span>

        <h2>
          Security isn't a single
          <br />
          <strong>decision.</strong>
        </h2>

        <p>
          From the first unusual signal to the right
          response, SAOM-AI builds context before it
          acts.
        </p>

      </div>


      {/* STAGES */}

      <div className="attack-stage-navigation">

        {stages.map((item, index) => (

          <button
            key={item.number}
            type="button"
            className={
              activeStage === index
                ? "attack-stage active"
                : "attack-stage"
            }
            onClick={() => setActiveStage(index)}
          >

            <span className="attack-stage-number">
              {item.number}
            </span>

            <span className="attack-stage-label">
              {item.label}
            </span>

          </button>

        ))}

      </div>


      {/* ACTIVE STAGE */}

      <div className="attack-intelligence-content">

        <div className="attack-visual-wrapper">

          {activeStage === 0 && <ThreatDNAVisual />}

          {activeStage === 1 && <AttackGraphVisual />}

          {activeStage === 2 && <ReasoningVisual />}

          {activeStage === 3 && <ResponseVisual />}

        </div>


        <div className="attack-stage-copy">

          <span>
            STAGE {stage.number}
          </span>

          <h3>
            {stage.title}
          </h3>

          <p>
            {stage.description}
          </p>

          <div className="attack-stage-progress">

            {stages.map((_, index) => (

              <button
                key={index}
                type="button"
                className={
                  activeStage === index
                    ? "active"
                    : ""
                }
                onClick={() => setActiveStage(index)}
                aria-label={`Stage ${index + 1}`}
              />

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}

export default AttackIntelligence;