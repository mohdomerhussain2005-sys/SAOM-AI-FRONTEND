import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const EASE = [0.16, 1, 0.3, 1];

const W = 860;
const H = 300;

// Literal color values — GSAP tweens colors more reliably against real hex
// than against CSS custom properties, so these mirror the tokens in
// App.css (--blue / --red / --amber / --green) for animation targets only.
// All static JSX styling still references the CSS variables directly.
const C = {
  blue: "#4f8dff",
  red: "#e8433f",
  green: "#22c274",
  amber: "#e2921f",
};

const NODES = {
  a: { x: 92, y: 216, label: "SIGNAL A" },
  b: { x: 322, y: 96, label: "SIGNAL B" },
  c: { x: 552, y: 216, label: "SIGNAL C" },
  s: { x: 772, y: 96, label: "SUSPICIOUS EVENT" },
};

// Forward order of traversal — also the canonical keys used for every line ref.
const EDGES = [
  ["a", "b"],
  ["b", "c"],
  ["c", "s"],
];

function dist(p1, p2) {
  return Math.hypot(p2.x - p1.x, p2.y - p1.y);
}

const PANEL_CONTENT = {
  forward: { label: "REASONING STATE", value: "TRACING FORWARD" },
  pause: { label: "ANOMALY DETECTED", value: "SUSPICIOUS EVENT" },
  backtrack: {
    label: "REASONING STATE",
    value: "BACKTRACKING",
    sub: "PATH DEPTH · 04 EVENTS",
  },
  root: { label: "ROOT SIGNAL", value: "IDENTIFIED" },
  reconstruct: {
    label: "CONFIDENCE",
    value: "98.2%",
    sub: "ATTACK PATH RECONSTRUCTED",
  },
};

/**
 * A dedicated visual for SAOM-AI's backtracking capability: the engine
 * traces a chain of signals forward, hits something suspicious, then
 * walks itself back through the chain — re-evaluating what it already
 * saw — until it lands on the signal that actually started it all.
 *
 * The SVG graph is built with the same conventions as SignalCore.jsx
 * (ref-driven GSAP timeline, attr-tweened traveling dot, ambient loop).
 * A small contextual "reasoning" panel — HTML, driven by React state —
 * surfaces one fact at a time instead of a wall of telemetry.
 */
export default function BacktrackingGraph() {
  const rootRef = useRef(null);
  const dotRef = useRef(null);
  const nodeRefs = useRef({});
  const nodeFillRefs = useRef({});
  const lineRefs = useRef({});
  const [phase, setPhase] = useState(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

      // ---------- reset ----------
      ["a", "b", "c"].forEach((k) => {
        tl.set(
          nodeRefs.current[k],
          { opacity: 0.22, scale: 0.85, transformOrigin: "50% 50%" },
          0
        );
        tl.set(nodeFillRefs.current[k], { fill: C.blue }, 0);
      });
      tl.set(
        nodeRefs.current.s,
        { opacity: 0.22, scale: 0.85, transformOrigin: "50% 50%" },
        0
      );
      EDGES.forEach(([f, t]) => {
        const len = dist(NODES[f], NODES[t]);
        tl.set(
          lineRefs.current[`${f}-${t}`],
          { strokeDashoffset: len, stroke: C.blue, opacity: 0.9 },
          0
        );
      });
      tl.set(
        dotRef.current,
        { opacity: 0, attr: { cx: NODES.a.x, cy: NODES.a.y } },
        0
      );
      tl.call(() => setPhase(null), null, 0);

      // ---------- forward trace ----------
      tl.call(() => setPhase("forward"), null, "+=0.15");
      tl.to(
        nodeRefs.current.a,
        { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" },
        ">-0.05"
      );
      tl.to(dotRef.current, { opacity: 1, duration: 0.2 }, "<");

      EDGES.slice(0, 2).forEach(([f, t]) => {
        tl.to(lineRefs.current[`${f}-${t}`], {
          strokeDashoffset: 0,
          duration: 0.55,
          ease: "power2.inOut",
        });
        tl.to(
          dotRef.current,
          {
            attr: { cx: NODES[t].x, cy: NODES[t].y },
            duration: 0.55,
            ease: "power2.inOut",
          },
          "<"
        );
        tl.to(
          nodeRefs.current[t],
          { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" },
          ">-0.15"
        );
      });

      // reach the suspicious event
      tl.to(lineRefs.current["c-s"], {
        strokeDashoffset: 0,
        stroke: C.amber,
        duration: 0.6,
        ease: "power2.inOut",
      });
      tl.to(
        dotRef.current,
        {
          attr: { cx: NODES.s.x, cy: NODES.s.y },
          duration: 0.6,
          ease: "power2.inOut",
        },
        "<"
      );
      tl.to(
        nodeRefs.current.s,
        { opacity: 1, scale: 1.15, duration: 0.3, ease: "power2.out" },
        ">-0.1"
      );
      tl.to(dotRef.current, { opacity: 0, duration: 0.2 });

      // ---------- pause / anomaly ----------
      tl.call(() => setPhase("pause"), null, ">-0.05");
      tl.to(
        nodeRefs.current.s,
        {
          scale: 1.3,
          duration: 0.45,
          ease: "sine.inOut",
          yoyo: true,
          repeat: 3,
        },
        ">+0.1"
      );

      // ---------- backtrack ----------
      tl.call(() => setPhase("backtrack"), null, ">+0.1");
      tl.set(dotRef.current, {
        attr: { cx: NODES.s.x, cy: NODES.s.y },
        fill: C.amber,
        opacity: 1,
      });

      [...EDGES].reverse().forEach(([f, t]) => {
        // traveling backward across edge f→t means walking from t to f
        tl.to(lineRefs.current[`${f}-${t}`], { stroke: C.amber, duration: 0.3 });
        tl.to(
          dotRef.current,
          {
            attr: { cx: NODES[f].x, cy: NODES[f].y },
            duration: 0.5,
            ease: "power2.inOut",
          },
          "<"
        );
        tl.to(
          nodeFillRefs.current[f] || {},
          { fill: C.amber, duration: 0.25 },
          ">-0.15"
        );
        tl.to(
          nodeRefs.current[f],
          { scale: 1.22, duration: 0.2, ease: "power2.out" },
          "<"
        ).to(nodeRefs.current[f], {
          scale: 1,
          duration: 0.3,
          ease: "power2.inOut",
        });
      });

      // ---------- root cause ----------
      tl.call(() => setPhase("root"), null, ">-0.1");
      tl.to(dotRef.current, { opacity: 0, duration: 0.15 });
      tl.to(
        nodeFillRefs.current.a,
        { fill: C.red, duration: 0.25 },
        "<"
      );
      tl.to(nodeRefs.current.a, {
        scale: 1.35,
        duration: 0.3,
        ease: "power2.out",
      }).to(nodeRefs.current.a, {
        scale: 1,
        duration: 0.4,
        ease: "power2.inOut",
      });

      // ---------- reconstruct ----------
      tl.call(() => setPhase("reconstruct"), null, ">+0.15");
      EDGES.forEach(([f, t]) => {
        tl.to(
          lineRefs.current[`${f}-${t}`],
          { stroke: C.green, opacity: 1, duration: 0.5, ease: "power2.inOut" },
          "<"
        );
      });
      tl.to(nodeFillRefs.current.a, { fill: C.green, duration: 0.5 }, "<");
      tl.to(nodeFillRefs.current.b, { fill: C.blue, duration: 0.5 }, "<");
      tl.to(nodeFillRefs.current.c, { fill: C.blue, duration: 0.5 }, "<");
      tl.to({}, { duration: 1.5 }); // hold on the reconstructed state

      tl.call(() => setPhase(null), null, ">-0.3");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="backtrack-wrap" ref={rootRef}>
      <svg
        className="backtrack-svg"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Animated diagram of SAOM-AI tracing a chain of signals forward, then backtracking through them to identify the root cause of a suspicious event"
      >
        {EDGES.map(([f, t]) => {
          const len = dist(NODES[f], NODES[t]);
          return (
            <line
              key={`${f}-${t}`}
              ref={(el) => {
                if (el) lineRefs.current[`${f}-${t}`] = el;
              }}
              x1={NODES[f].x}
              y1={NODES[f].y}
              x2={NODES[t].x}
              y2={NODES[t].y}
              stroke="var(--blue)"
              strokeWidth="1.4"
              strokeDasharray={len}
              strokeDashoffset={len}
              opacity="0.9"
            />
          );
        })}

        <circle ref={dotRef} r="4.5" fill="var(--blue)" opacity="0" />

        {["a", "b", "c"].map((k) => (
          <g
            key={k}
            ref={(el) => {
              if (el) nodeRefs.current[k] = el;
            }}
            style={{ transformOrigin: `${NODES[k].x}px ${NODES[k].y}px` }}
          >
            <circle
              ref={(el) => {
                if (el) nodeFillRefs.current[k] = el;
              }}
              cx={NODES[k].x}
              cy={NODES[k].y}
              r="7"
              fill="var(--blue)"
            />
            <circle
              cx={NODES[k].x}
              cy={NODES[k].y}
              r="13"
              fill="none"
              stroke="var(--blue)"
              strokeWidth="1"
              opacity="0.3"
            />
            <text
              x={NODES[k].x}
              y={NODES[k].y + 32}
              textAnchor="middle"
              className="backtrack-label"
            >
              {NODES[k].label}
            </text>
          </g>
        ))}

        <g
          ref={(el) => {
            if (el) nodeRefs.current.s = el;
          }}
          style={{ transformOrigin: `${NODES.s.x}px ${NODES.s.y}px` }}
        >
          <rect
            x={NODES.s.x - 9}
            y={NODES.s.y - 9}
            width="18"
            height="18"
            rx="4"
            fill="var(--amber)"
            transform={`rotate(45 ${NODES.s.x} ${NODES.s.y})`}
          />
          <text
            x={NODES.s.x}
            y={NODES.s.y - 28}
            textAnchor="middle"
            className="backtrack-label backtrack-label-amber"
          >
            {NODES.s.label}
          </text>
        </g>
      </svg>

      <AnimatePresence mode="wait">
        {phase && PANEL_CONTENT[phase] && (
          <motion.div
            key={phase}
            className="reason-panel backtrack-panel"
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