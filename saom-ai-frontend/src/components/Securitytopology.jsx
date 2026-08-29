import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.16, 1, 0.3, 1];

// Literal color values for GSAP color tweens — see BacktrackingGraph.jsx
// for why these mirror the CSS custom properties instead of using them.
const C = { blue: "#4f8dff", red: "#e8433f", green: "#22c274", amber: "#e2921f" };

const CENTER = { x: 320, y: 320 };
const RADIUS = 235;
const SUB_OFFSETS = [
  [-16, -9],
  [15, 10],
];

const CLUSTERS = [
  { id: "identities", label: "IDENTITIES", angle: -90 },
  { id: "endpoints", label: "ENDPOINTS", angle: -18 },
  { id: "cloud", label: "CLOUD", angle: 54 },
  { id: "network", label: "NETWORK", angle: 126 },
  { id: "applications", label: "APPLICATIONS", angle: 198 },
].map((c) => {
  const rad = (c.angle * Math.PI) / 180;
  const x = CENTER.x + RADIUS * Math.cos(rad);
  const y = CENTER.y + RADIUS * Math.sin(rad);
  const labelX = CENTER.x + (RADIUS + 62) * Math.cos(rad);
  const labelY = CENTER.y + (RADIUS + 62) * Math.sin(rad);
  return { ...c, x, y, labelX, labelY };
});

const ENTRY_ID = "endpoints"; // where the illustrated threat signal enters
const TARGET_ID = "cloud"; // where the correlated / lateral node lights up

function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

// Deterministic faint background scatter — depth, not decoration.
const STARS = Array.from({ length: 46 }, (_, i) => ({
  x: (i * 61) % 640,
  y: (i * 97 + 31) % 640,
  r: 0.5 + (i % 3) * 0.3,
  d: (i % 10) * 0.35,
}));

const PANEL_CONTENT = {
  mapping: { label: "ENVIRONMENT", value: "MAPPING TOPOLOGY" },
  threat: { label: "THREAT SIGNAL", value: "DETECTED" },
  lateral: { label: "CORRELATION", value: "TRACING RELATIONSHIPS" },
  understood: {
    label: "ENVIRONMENT",
    value: "UNDERSTOOD",
    sub: "5 DOMAINS · 0 BLIND SPOTS",
  },
};

/**
 * Replaces the old CyberGlobe. Instead of a literal Earth, the global
 * layer is represented as what it actually is: one connected graph of
 * identities, endpoints, cloud, network and application domains, with
 * a live signal traced across it. Plays once on scroll-into-view via
 * ScrollTrigger, then settles into a quiet ambient breathing state —
 * a discovery, not a loop.
 */
export default function SecurityTopology() {
  const rootRef = useRef(null);
  const coreRef = useRef(null);
  const coreGlowRef = useRef(null);
  const dotRef = useRef(null);
  const clusterRefs = useRef({});
  const lineRefs = useRef({});
  const [phase, setPhase] = useState(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      // ---------- initial state: independent, unconnected ----------
      tl.set(
        coreRef.current,
        { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" },
        0
      );
      CLUSTERS.forEach((cl) => {
        tl.set(
          clusterRefs.current[cl.id],
          { opacity: 0.22, scale: 0.85, transformOrigin: `${cl.x}px ${cl.y}px` },
          0
        );
        tl.set(
          lineRefs.current[cl.id],
          { strokeDashoffset: dist(cl, CENTER), stroke: C.blue, opacity: 0.85 },
          0
        );
      });
      tl.set(dotRef.current, { opacity: 0 }, 0);
      tl.call(() => setPhase(null), null, 0);

      // ---------- mapping: the environment connects itself ----------
      tl.call(() => setPhase("mapping"), null, "+=0.1");
      tl.to(coreRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      });

      CLUSTERS.forEach((cl, i) => {
        tl.to(
          lineRefs.current[cl.id],
          { strokeDashoffset: 0, duration: 0.6, ease: "power2.inOut" },
          i === 0 ? ">-0.05" : "<+0.16"
        );
        tl.to(
          clusterRefs.current[cl.id],
          { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" },
          "<"
        );
      });

      // ---------- threat signal enters ----------
      tl.call(() => setPhase("threat"), null, ">+0.25");
      const entry = CLUSTERS.find((cl) => cl.id === ENTRY_ID);
      tl.set(dotRef.current, {
        attr: { cx: entry.x, cy: entry.y },
        fill: C.red,
        opacity: 1,
      });
      tl.to(dotRef.current, {
        attr: { cx: CENTER.x, cy: CENTER.y },
        duration: 0.7,
        ease: "power2.inOut",
      });
      tl.to(
        coreGlowRef.current,
        { scale: 1.35, opacity: 0.85, duration: 0.35, ease: "power2.out" },
        "<+0.35"
      ).to(coreGlowRef.current, {
        scale: 1,
        opacity: 0.45,
        duration: 0.5,
        ease: "power2.inOut",
      });
      tl.to(dotRef.current, { opacity: 0, duration: 0.2 });

      // ---------- correlation / lateral relationship ----------
      tl.call(() => setPhase("lateral"), null, ">-0.05");
      const target = CLUSTERS.find((cl) => cl.id === TARGET_ID);
      tl.set(dotRef.current, {
        attr: { cx: CENTER.x, cy: CENTER.y },
        fill: C.amber,
        opacity: 1,
      });
      tl.to(dotRef.current, {
        attr: { cx: target.x, cy: target.y },
        duration: 0.7,
        ease: "power2.inOut",
      });
      tl.to(
        lineRefs.current[TARGET_ID],
        { stroke: C.amber, duration: 0.3 },
        "<"
      ).to(lineRefs.current[TARGET_ID], {
        stroke: "var(--line-soft)",
        duration: 0.6,
      });
      tl.to(dotRef.current, { opacity: 0, duration: 0.2 });

      // ---------- relationships confirmed ----------
      tl.call(() => setPhase("understood"), null, ">+0.1");
      CLUSTERS.forEach((cl) => {
        tl.to(
          lineRefs.current[cl.id],
          { stroke: C.green, duration: 0.4, ease: "power2.inOut" },
          "<"
        );
      });
      tl.to({}, { duration: 0.6 });
      CLUSTERS.forEach((cl) => {
        tl.to(
          lineRefs.current[cl.id],
          { stroke: "var(--line-soft)", duration: 0.7, ease: "power2.inOut" },
          "<"
        );
      });

      // ---------- ambient breathing, once settled ----------
      tl.call(() => {
        gsap.to(coreRef.current, {
          scale: 1.045,
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top 78%",
        once: true,
        onEnter: () => tl.play(),
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="topo-wrap" ref={rootRef}>
      <svg
        className="topo-svg"
        viewBox="0 0 640 640"
        role="img"
        aria-label="Animated network diagram connecting identities, endpoints, cloud, network and application domains, tracing a threat signal and confirming relationships across the environment"
      >
        <defs>
          <radialGradient id="topo-core-fill" cx="45%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#1a2029" />
            <stop offset="100%" stopColor="#0c0f13" />
          </radialGradient>
        </defs>

        {STARS.map((s, i) => (
          <circle
            key={i}
            className="topo-star"
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="var(--ink-faint)"
            style={{ "--d": `${s.d}s` }}
          />
        ))}

        {CLUSTERS.map((cl) => (
          <line
            key={cl.id}
            ref={(el) => {
              if (el) lineRefs.current[cl.id] = el;
            }}
            x1={cl.x}
            y1={cl.y}
            x2={CENTER.x}
            y2={CENTER.y}
            stroke="var(--blue)"
            strokeWidth="1.1"
            strokeDasharray={dist(cl, CENTER)}
            strokeDashoffset={dist(cl, CENTER)}
          />
        ))}

        <circle ref={dotRef} r="4.5" fill="var(--blue)" opacity="0" />

        {CLUSTERS.map((cl) => (
          <g
            key={cl.id}
            ref={(el) => {
              if (el) clusterRefs.current[cl.id] = el;
            }}
          >
            <circle cx={cl.x} cy={cl.y} r="6" fill="var(--blue)" />
            {SUB_OFFSETS.map(([dx, dy], i) => (
              <circle
                key={i}
                cx={cl.x + dx}
                cy={cl.y + dy}
                r="2.6"
                fill="var(--ink-faint)"
                opacity="0.75"
              />
            ))}
            <text
              x={cl.labelX}
              y={cl.labelY}
              textAnchor={
                cl.labelX > 340 ? "start" : cl.labelX < 300 ? "end" : "middle"
              }
              className="topo-label"
            >
              {cl.label}
            </text>
          </g>
        ))}

        <circle
          ref={coreGlowRef}
          cx={CENTER.x}
          cy={CENTER.y}
          r="58"
          fill="var(--blue-dim)"
          opacity="0.45"
        />
        <g ref={coreRef}>
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r="34"
            fill="url(#topo-core-fill)"
            stroke="var(--line)"
            strokeWidth="1.2"
          />
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r="34"
            fill="none"
            stroke="var(--blue)"
            strokeWidth="1"
            opacity="0.5"
          />
        </g>
      </svg>

      <AnimatePresence mode="wait">
        {phase && PANEL_CONTENT[phase] && (
          <motion.div
            key={phase}
            className="reason-panel topo-panel"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <span className="reason-panel-label">
              {PANEL_CONTENT[phase].label}
            </span>
            <span className="reason-panel-value">
              {PANEL_CONTENT[phase].value}
            </span>
            {PANEL_CONTENT[phase].sub && (
              <span className="reason-panel-sub">
                {PANEL_CONTENT[phase].sub}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}