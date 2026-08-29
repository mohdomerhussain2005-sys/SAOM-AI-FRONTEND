import { useEffect, useRef } from "react";
import gsap from "gsap";

const SIZE = 480;
const CX = 240;
const CY = 240;

const NODES = {
  threat: { x: 76, y: 108, tone: "var(--red)" },
  response: { x: 404, y: 372, tone: "var(--green)" },
  asset1: { x: 402, y: 96, tone: "var(--ink-faint)" },
  asset2: { x: 84, y: 378, tone: "var(--ink-faint)" },
  asset3: { x: 240, y: 46, tone: "var(--ink-faint)" },
};

export default function SignalCore() {
  const rootRef = useRef(null);
  const coreRef = useRef(null);
  const coreGlowRef = useRef(null);
  const dotRef = useRef(null);
  const threatRef = useRef(null);
  const responseRef = useRef(null);
  const lineThreatRef = useRef(null);
  const lineResponseRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.7 });

      // 01 DETECT — a threat node signals.
      tl.set(dotRef.current, { attr: { cx: NODES.threat.x, cy: NODES.threat.y }, opacity: 0 })
        .to(threatRef.current, { scale: 1.35, duration: 0.35, ease: "power2.out", transformOrigin: `${NODES.threat.x}px ${NODES.threat.y}px` })
        .to(lineThreatRef.current, { opacity: 1, duration: 0.25 }, "<")
        .to(dotRef.current, { opacity: 1, duration: 0.2 }, "<")
        .to(threatRef.current, { scale: 1, duration: 0.4, ease: "power2.inOut" }, ">-0.1")

        // signal travels inward toward the core.
        .to(
          dotRef.current,
          {
            attr: { cx: CX, cy: CY },
            duration: 0.7,
            ease: "power2.inOut",
          },
          "<"
        )
        .to(lineThreatRef.current, { opacity: 0, duration: 0.4 }, ">-0.2")

        // 02/03 ANALYZE + ORCHESTRATE — the core reasons.
        .to(coreGlowRef.current, { scale: 1.4, opacity: 0.9, duration: 0.4, ease: "power2.out", transformOrigin: `${CX}px ${CY}px` }, ">-0.3")
        .to(coreRef.current, { scale: 1.08, duration: 0.4, ease: "power2.out", transformOrigin: `${CX}px ${CY}px` }, "<")
        .to(coreGlowRef.current, { scale: 1, opacity: 0.5, duration: 0.5, ease: "power2.inOut" }, ">-0.1")
        .to(coreRef.current, { scale: 1, duration: 0.5, ease: "power2.inOut" }, "<")

        // 04 RESPOND — action dispatched outward.
        .to(lineResponseRef.current, { opacity: 1, duration: 0.2 }, ">-0.3")
        .to(
          dotRef.current,
          {
            attr: { cx: NODES.response.x, cy: NODES.response.y },
            duration: 0.7,
            ease: "power2.inOut",
          },
          "<"
        )
        .to(responseRef.current, { scale: 1.35, duration: 0.3, ease: "power2.out", transformOrigin: `${NODES.response.x}px ${NODES.response.y}px` }, ">-0.15")
        .to(dotRef.current, { opacity: 0, duration: 0.2 }, "<")
        .to(lineResponseRef.current, { opacity: 0, duration: 0.5 }, "<")
        .to(responseRef.current, { scale: 1, duration: 0.4, ease: "power2.inOut" }, ">-0.1");

      // ambient idle pulse on the static asset nodes
      ["asset1", "asset2", "asset3"].forEach((key, i) => {
        gsap.to(`.saom-node-${key}`, {
          opacity: 0.35,
          duration: 1.6 + i * 0.4,
          delay: i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="saom-core-wrap" ref={rootRef} style={{ width: "100%", height: "100%" }}>
      <svg
        className="saom-core-svg"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label="Animated visualization of SAOM-AI detecting, analyzing, orchestrating and responding to a threat"
        data-cursor="inspect"
      >
        <defs>
          <radialGradient id="saom-core-fill" cx="45%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#1a2029" />
            <stop offset="100%" stopColor="#0c0f13" />
          </radialGradient>
        </defs>

        {/* perimeter rings */}
        <circle cx={CX} cy={CY} r={150} fill="none" stroke="var(--line-soft)" strokeWidth="1" />
        <circle cx={CX} cy={CY} r={190} fill="none" stroke="var(--line-soft)" strokeWidth="1" opacity="0.6" />

        {/* static connective lines to idle asset nodes */}
        {["asset1", "asset2", "asset3"].map((key) => (
          <line
            key={key}
            x1={CX}
            y1={CY}
            x2={NODES[key].x}
            y2={NODES[key].y}
            stroke="var(--line-soft)"
            strokeWidth="1"
          />
        ))}

        {/* active lines, animated opacity via GSAP */}
        <line ref={lineThreatRef} x1={CX} y1={CY} x2={NODES.threat.x} y2={NODES.threat.y} stroke="var(--red)" strokeWidth="1.2" opacity="0" />
        <line ref={lineResponseRef} x1={CX} y1={CY} x2={NODES.response.x} y2={NODES.response.y} stroke="var(--green)" strokeWidth="1.2" opacity="0" />

        {/* idle asset nodes */}
        {["asset1", "asset2", "asset3"].map((key) => (
          <circle key={key} className={`saom-node-${key}`} cx={NODES[key].x} cy={NODES[key].y} r="3" fill={NODES[key].tone} opacity="0.6" />
        ))}

        {/* threat + response nodes */}
        <g ref={threatRef}>
          <circle cx={NODES.threat.x} cy={NODES.threat.y} r="5" fill="var(--red)" />
        </g>
        <g ref={responseRef}>
          <circle cx={NODES.response.x} cy={NODES.response.y} r="5" fill="var(--green)" />
        </g>

        {/* traveling signal */}
        <circle ref={dotRef} r="4" fill="var(--blue)" opacity="0" />

        {/* core */}
        <circle ref={coreGlowRef} cx={CX} cy={CY} r={62} fill="var(--blue-dim)" opacity="0.5" />
        <g ref={coreRef}>
          <circle cx={CX} cy={CY} r={40} fill="url(#saom-core-fill)" stroke="var(--line)" strokeWidth="1.2" />
          <circle cx={CX} cy={CY} r={40} fill="none" stroke="var(--blue)" strokeWidth="1" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
}
