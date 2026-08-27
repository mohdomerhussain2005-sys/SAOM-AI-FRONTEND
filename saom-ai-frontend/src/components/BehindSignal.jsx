import {
  Users,
  Monitor,
  Network,
  Brain,
  Radar,
  ShieldCheck,
  ArrowDown,
} from "lucide-react";

const sources = [
  {
    icon: Users,
    label: "IDENTITIES",
  },
  {
    icon: Monitor,
    label: "ENDPOINTS",
  },
  {
    icon: Network,
    label: "NETWORK",
  },
];

export default function BehindSignal() {
  return (
    <section
      className="behind-signal"
      id="technology"
    >

      {/* HEADER */}

      <div className="behind-header">

        <div className="section-eyebrow">
          <span />
          BEHIND THE SIGNAL
        </div>

        <h2>
          Everything leaves a signal.
          <br />
          <strong>We make sense of it.</strong>
        </h2>

        <p>
          SAOM-AI brings activity from across your
          environment into one intelligent security
          layer — where signals become context,
          context becomes insight, and insight
          becomes action.
        </p>

      </div>


      {/* SYSTEM */}

      <div className="signal-system">

        {/* INPUTS */}

        <div className="signal-sources">

          {sources.map((source) => {

            const Icon = source.icon;

            return (
              <div
                className="signal-source"
                key={source.label}
              >

                <div className="signal-source-icon">
                  <Icon
                    size={19}
                    strokeWidth={1.5}
                  />
                </div>

                <span>
                  {source.label}
                </span>

                <div className="signal-flow-line">
                  <i />
                </div>

              </div>
            );

          })}

        </div>


        {/* CENTRAL ENGINE */}

        <div className="signal-core">

          <div className="signal-core-ring ring-one" />
          <div className="signal-core-ring ring-two" />

          <div className="signal-core-icon">

            <Radar
              size={31}
              strokeWidth={1.3}
            />

          </div>

          <span>
            SAOM-AI
          </span>

          <strong>
            SECURITY INTELLIGENCE ENGINE
          </strong>

          <div className="core-status">
            <span />
            ANALYZING SIGNALS
          </div>

        </div>


        {/* PROCESSING */}

        <div className="signal-processing">

          <div className="processing-line">
            <span />
          </div>

          <div className="processing-item">

            <Brain
              size={17}
              strokeWidth={1.5}
            />

            <div>
              <span>
                CORRELATE
              </span>

              <strong>
                Connect the signals
              </strong>
            </div>

          </div>


          <div className="processing-item">

            <Radar
              size={17}
              strokeWidth={1.5}
            />

            <div>
              <span>
                UNDERSTAND
              </span>

              <strong>
                Recognize the pattern
              </strong>
            </div>

          </div>


          <div className="processing-item">

            <ShieldCheck
              size={17}
              strokeWidth={1.5}
            />

            <div>
              <span>
                RESPOND
              </span>

              <strong>
                Recommend what comes next
              </strong>
            </div>

          </div>

        </div>


        {/* OUTPUT */}

        <div className="signal-output">

          <div className="output-arrow">
            <ArrowDown size={16} />
          </div>

          <div className="output-card">

            <span>
              CLEAR SECURITY SIGNAL
            </span>

            <strong>
              Threat identified
            </strong>

            <p>
              Evidence, context and recommended
              action — in one place.
            </p>

            <div className="output-status">
              <span />
              ACTIONABLE
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}