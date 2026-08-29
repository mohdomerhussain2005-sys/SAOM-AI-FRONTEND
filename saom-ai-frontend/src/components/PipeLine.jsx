import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.16, 1, 0.3, 1];

/* ============================================================
   STAGE CONTENT
   Self-contained — move into landingData.js if you'd rather
   keep copy centralized there.
============================================================ */
const STAGES = [
  {
    id: "dna",
    index: "01",
    tone: "red",
    label: "THREAT DNA",
    heading: "Every attack has a fingerprint.",
    body: "Login attempts, process spawns, DNS lookups — on their own they're noise. SAOM-AI reads them as a single structured pattern the moment they arrive.",
  },
  {
    id: "correlation",
    index: "02",
    tone: "blue",
    label: "EVENT CORRELATION",
    heading: "One event is noise. A sequence is intelligence.",
    body: "Identity, device and network activity that would sit in three different queues are pulled into a single connected thread.",
  },
  {
    id: "behavior",
    index: "03",
    tone: "amber",
    label: "BEHAVIOR ANALYSIS",
    heading: "Behavior reveals intent.",
    body: "SAOM-AI tracks how the sequence drifts from baseline — not just that something happened, but the moment it stopped looking normal.",
  },
  {
    id: "mitre",
    index: "04",
    tone: "blue",
    label: "MITRE ATT&CK",
    heading: "Mapped to a known technique — instantly.",
    body: "The behavior is matched against MITRE ATT&CK in real time, attached directly to the attack graph with a confidence and severity score.",
  },
  {
    id: "narrative",
    index: "05",
    tone: "green",
    label: "ATTACK NARRATIVE",
    heading: "Thousands of events. One coherent story.",
    body: "Every signal, correlation and technique collapses into a single readable narrative — the story your team would have written, minutes earlier.",
  },
];

const TONE_COLORS = {
  red: "#ef5b5b",
  blue: "#7caeff",
  amber: "#e8a23d",
  green: "#4fd18b",
  ink: "#4b5568",
};

/* ============================================================
   STAGE 01 — THREAT DNA
   A rotating strand of raw signal nodes resolving into a
   single fingerprint core.
============================================================ */
const DNA_SIGNALS = ["LOGIN", "PROCESS", "NETWORK", "ENDPOINT", "IDENTITY", "FILE", "DNS"];

function ThreatDNA({ active, progress }) {
  return (
    <div className={`aic-stage-layer aic-dna ${active ? "is-active" : ""}`}>
      <div className="aic-dna-stage">
        <div className="aic-dna-strand">
          {DNA_SIGNALS.map((sig, i) => {
            const angle = (360 / DNA_SIGNALS.length) * i;
            const revealed = progress * DNA_SIGNALS.length > i;
            return (
              <div
                key={sig}
                className={`aic-dna-node ${revealed ? "is-revealed" : ""}`}
                style={{ "--rot": `${angle}deg` }}
              >
                <span className="aic-dna-dot" />
                <span className="aic-dna-tag">{sig}</span>
              </div>
            );
          })}
          <div className="aic-dna-core">
            <span className="aic-dna-core-ring" />
            <span className="aic-dna-core-label">FINGERPRINT</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   STAGE 02 — EVENT CORRELATION
   Signal → entities → correlation hub, drawn progressively.
============================================================ */
const CORR_W = 560;
const CORR_H = 420;
const CORR_NODES = {
  signal: { x: 280, y: 64 },
  identity: { x: 110, y: 180 },
  device: { x: 280, y: 180 },
  network: { x: 450, y: 180 },
  hub: { x: 280, y: 320 },
};
const CORR_SEGMENTS = [
  { from: "signal", to: "identity" },
  { from: "signal", to: "device" },
  { from: "signal", to: "network" },
  { from: "identity", to: "hub" },
  { from: "device", to: "hub" },
  { from: "network", to: "hub" },
];
function corrLen(seg) {
  const a = CORR_NODES[seg.from];
  const b = CORR_NODES[seg.to];
  return Math.hypot(b.x - a.x, b.y - a.y);
}

function EventCorrelation({ active, progress }) {
  return (
    <div className={`aic-stage-layer aic-correlation ${active ? "is-active" : ""}`}>
      <svg className="aic-corr-svg" viewBox={`0 0 ${CORR_W} ${CORR_H}`} role="img" aria-label="Events correlating into a single graph">
        {CORR_SEGMENTS.map((seg, i) => (
          <line
            key={`ghost-${i}`}
            x1={CORR_NODES[seg.from].x}
            y1={CORR_NODES[seg.from].y}
            x2={CORR_NODES[seg.to].x}
            y2={CORR_NODES[seg.to].y}
            className="aic-corr-ghost"
          />
        ))}
        {CORR_SEGMENTS.map((seg, i) => {
          const len = corrLen(seg);
          const segStart = i / CORR_SEGMENTS.length;
          const segEnd = (i + 1) / CORR_SEGMENTS.length;
          const t = Math.max(0, Math.min(1, (progress - segStart) / (segEnd - segStart)));
          return (
            <line
              key={`seg-${i}`}
              x1={CORR_NODES[seg.from].x}
              y1={CORR_NODES[seg.from].y}
              x2={CORR_NODES[seg.to].x}
              y2={CORR_NODES[seg.to].y}
              className="aic-corr-line"
              strokeDasharray={len}
              strokeDashoffset={len * (1 - t)}
            />
          );
        })}
        {Object.entries(CORR_NODES).map(([key, n]) => (
          <circle
            key={key}
            cx={n.x}
            cy={n.y}
            r={key === "signal" ? 8 : key === "hub" ? 9 : 6}
            className={`aic-corr-node aic-corr-node-${key} ${progress > 0.05 ? "is-lit" : ""}`}
          />
        ))}
      </svg>
      <div className="aic-corr-timestamp">14:02:11.048 — session opened from unrecognized ASN</div>
    </div>
  );
}

/* ============================================================
   STAGE 03 — BEHAVIOR ANALYSIS
   An anomaly curve drifting from normal to malicious, with the
   inflection point called out.
============================================================ */
function BehaviorAnalysis({ active, progress }) {
  const pathD = "M20,180 C90,180 120,178 170,170 C230,160 260,120 300,85 C340,50 400,40 460,38";
  const pathLen = 560;
  return (
    <div className={`aic-stage-layer aic-behavior ${active ? "is-active" : ""}`}>
      <svg className="aic-behavior-svg" viewBox="0 0 480 220" role="img" aria-label="Behavior drifting from normal to malicious">
        <line x1="20" y1="180" x2="460" y2="180" className="aic-behavior-axis" />
        <text x="20" y="198" className="aic-behavior-zone">NORMAL</text>
        <text x="200" y="198" className="aic-behavior-zone">SUSPICIOUS</text>
        <text x="370" y="198" className="aic-behavior-zone aic-behavior-zone-mal">MALICIOUS</text>

        <path d={pathD} className="aic-behavior-ghost" />
        <path
          d={pathD}
          className="aic-behavior-line"
          strokeDasharray={pathLen}
          strokeDashoffset={pathLen * (1 - progress)}
        />
        <circle cx="230" cy="142" r={progress > 0.45 ? 5 : 0} className="aic-behavior-marker" />
        {progress > 0.45 && (
          <text x="240" y="130" className="aic-behavior-callout">BEHAVIOR SHIFT</text>
        )}
      </svg>
    </div>
  );
}

/* ============================================================
   STAGE 04 — MITRE ATT&CK
   A vertical technique chain, attached live to the graph.
============================================================ */
const MITRE_CHAIN = ["Credential Access", "T1078 — Valid Accounts", "Lateral Movement", "Privilege Escalation"];

function MitreAttack({ active, progress }) {
  return (
    <div className={`aic-stage-layer aic-mitre ${active ? "is-active" : ""}`}>
      <div className="aic-mitre-chain">
        {MITRE_CHAIN.map((step, i) => {
          const revealed = progress * MITRE_CHAIN.length > i;
          return (
            <div key={step} className={`aic-mitre-step ${revealed ? "is-revealed" : ""} ${i === 1 ? "is-technique" : ""}`}>
              <span className="aic-mitre-dot" />
              <span className="aic-mitre-step-label">{step}</span>
              {i < MITRE_CHAIN.length - 1 && <span className="aic-mitre-connector" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   STAGE 05 — ATTACK NARRATIVE
   Fragmented signals collapse into a single readable sentence.
============================================================ */
const NARRATIVE_TEXT =
  "An external identity was compromised through suspicious authentication activity, then used to establish lateral movement toward an internal endpoint.";

function AttackNarrative({ active, progress }) {
  const chars = Math.round(NARRATIVE_TEXT.length * Math.min(1, progress * 1.2));
  return (
    <div className={`aic-stage-layer aic-narrative ${active ? "is-active" : ""}`}>
      <div className="aic-narrative-trace" aria-hidden="true">
        {["SIGNALS", "CORRELATION", "BEHAVIOR", "TECHNIQUE"].map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
      <p className="aic-narrative-text">
        {NARRATIVE_TEXT.slice(0, chars)}
        <span className="aic-narrative-caret" />
      </p>
    </div>
  );
}

/* ============================================================
   FLOATING INTELLIGENCE PANELS — contextual per stage
   Only the panels for the CURRENT stage are shown (max two),
   so they never pile up and collide with the main visual.
============================================================ */
const PANELS = [
  { id: "events", stage: 1, corner: "tl", label: "EVENTS CORRELATED", value: "1,284" },
  { id: "path", stage: 1, corner: "br", label: "ATTACK PATH", value: "IDENTIFIED" },
  { id: "confidence", stage: 3, corner: "tr", isMitre: true },
  { id: "threat", stage: 3, corner: "bl", label: "THREAT LEVEL", value: "HIGH", tone: "red" },
  { id: "entities", stage: 4, corner: "tr", label: "ENTITIES INVOLVED", value: "14" },
];

export default function AttackIntelligenceCore() {
  const pinRef = useRef(null);
  const indexRefs = useRef([]);
  const panelRefs = useRef({});
  const copyRefs = useRef([]);
  const layerRefs = useRef({});
  const [progressState, setProgressState] = useState({ stage: 0, local: 0 });

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const applyStage = (idx, local) => {
      STAGES.forEach((stage, i) => {
        const item = indexRefs.current[i];
        if (item) {
          item.classList.toggle("is-active", i === idx);
          item.style.borderColor = i === idx ? TONE_COLORS[stage.tone] : "";
        }
        const copy = copyRefs.current[i];
        if (copy) gsap.to(copy, { opacity: i === idx ? 1 : 0, duration: 0.35, ease: "power1.out" });

        const layer = layerRefs.current[stage.id];
        if (layer) {
          gsap.to(layer, {
            opacity: i === idx ? 1 : 0,
            scale: i === idx ? 1 : 0.97,
            duration: 0.5,
            ease: "power2.out",
            pointerEvents: i === idx ? "auto" : "none",
          });
        }
      });

      PANELS.forEach((panel) => {
        const el = panelRefs.current[panel.id];
        if (!el) return;
        const shown = idx === panel.stage;
        gsap.to(el, {
          opacity: shown ? 1 : 0,
          y: shown ? 0 : 8,
          duration: 0.5,
          ease: "power2.out",
          pointerEvents: shown ? "auto" : "none",
        });
      });

      setProgressState({ stage: idx, local });
    };

    applyStage(0, 0);

    if (reduceMotion) {
      applyStage(STAGES.length - 1, 1);
      return;
    }

    const st = ScrollTrigger.create({
      trigger: pinRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => {
        const progress = self.progress;
        const raw = progress * STAGES.length;
        const idx = Math.min(STAGES.length - 1, Math.floor(raw));
        const local = Math.max(0, Math.min(1, raw - idx));
        applyStage(idx, local);
      },
    });

    return () => st.kill();
  }, []);

  const { stage: activeStage, local: stageProgress } = progressState;

  return (
    <section className="saom-aic-pin" id="attack-intelligence" ref={pinRef}>
      <div className="saom-aic-stage-wrap">
        <div className="saom-aic-head">
          <motion.span
            className="saom-eyebrow"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            Attack Intelligence
          </motion.span>

          <motion.h2
            className="saom-section-title"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
          >
            Don't just detect the attack.
            <br />
            <strong>Understand it.</strong>
          </motion.h2>
        </div>

        <div className="saom-aic-index">
          {STAGES.map((stage, i) => (
            <div className="saom-aic-index-item" key={stage.id} ref={(el) => (indexRefs.current[i] = el)}>
              {stage.index} — {stage.label}
            </div>
          ))}
        </div>

        <div className="saom-aic-body">
          <div className="saom-aic-copy">
            {STAGES.map((stage, i) => (
              <div
                className="saom-aic-stage-panel"
                key={stage.id}
                ref={(el) => (copyRefs.current[i] = el)}
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <div className={`saom-aic-num saom-tone-${stage.tone}`}>{stage.index}</div>
                <h3 className="saom-aic-heading">{stage.heading}</h3>
                <p className="saom-aic-desc">{stage.body}</p>
              </div>
            ))}
          </div>

          <div className="saom-aic-visual" data-cursor="inspect">
            <div className="aic-visual-grid" aria-hidden="true" />

            <div className="aic-stage-layers">
              <div ref={(el) => (layerRefs.current.dna = el)} style={{ opacity: activeStage === 0 ? 1 : 0 }}>
                <ThreatDNA active={activeStage === 0} progress={activeStage === 0 ? stageProgress : activeStage > 0 ? 1 : 0} />
              </div>
              <div ref={(el) => (layerRefs.current.correlation = el)} style={{ opacity: 0 }}>
                <EventCorrelation active={activeStage === 1} progress={activeStage === 1 ? stageProgress : activeStage > 1 ? 1 : 0} />
              </div>
              <div ref={(el) => (layerRefs.current.behavior = el)} style={{ opacity: 0 }}>
                <BehaviorAnalysis active={activeStage === 2} progress={activeStage === 2 ? stageProgress : activeStage > 2 ? 1 : 0} />
              </div>
              <div ref={(el) => (layerRefs.current.mitre = el)} style={{ opacity: 0 }}>
                <MitreAttack active={activeStage === 3} progress={activeStage === 3 ? stageProgress : activeStage > 3 ? 1 : 0} />
              </div>
              <div ref={(el) => (layerRefs.current.narrative = el)} style={{ opacity: 0 }}>
                <AttackNarrative active={activeStage === 4} progress={activeStage === 4 ? stageProgress : activeStage > 4 ? 1 : 0} />
              </div>
            </div>

            {/* floating intel panels */}
            {PANELS.map((panel) =>
              panel.isMitre ? (
                <motion.div
                  key={panel.id}
                  className={`aic-panel aic-panel-mitre-inner aic-panel-corner-${panel.corner}`}
                  ref={(el) => (panelRefs.current[panel.id] = el)}
                  style={{ opacity: 0 }}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  <span className="aic-panel-label">TECHNIQUE MAPPED</span>
                  <strong className="aic-panel-mitre-tactic">Credential Access</strong>
                  <span className="aic-panel-mitre-technique">T1078 — Valid Accounts</span>
                  <div className="aic-panel-mitre-row">
                    <span>CONFIDENCE <b>98%</b></span>
                    <span className="aic-panel-severity-high">SEVERITY <b>HIGH</b></span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={panel.id}
                  className={`aic-panel aic-panel-corner-${panel.corner}`}
                  ref={(el) => (panelRefs.current[panel.id] = el)}
                  style={{ opacity: 0 }}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  <span className="aic-panel-label">{panel.label}</span>
                  <strong className={panel.tone ? `aic-panel-value tone-${panel.tone}` : "aic-panel-value"}>
                    {panel.value}
                  </strong>
                </motion.div>
              )
            )}
          </div>
        </div>

        <p className="saom-aic-demo-note">Illustrative demo data — not connected to a live environment.</p>
      </div>
    </section>
  );
}