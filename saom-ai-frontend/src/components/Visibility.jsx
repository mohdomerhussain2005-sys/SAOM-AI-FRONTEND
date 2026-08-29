import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { visibilityMetrics } from "../data/landingData";

function formatValue(val, metric) {
  const decimals = metric.decimals ?? 0;
  const formatted = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString();
  return `${formatted}${metric.suffix ?? ""}`;
}

function Metric({ metric, index }) {
  const wrapRef = useRef(null);
  const valueRef = useRef(null);
  const inView = useInView(wrapRef, { once: true, margin: "-15% 0px" });

  useEffect(() => {
    if (!inView) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      if (valueRef.current) valueRef.current.textContent = formatValue(metric.value, metric);
      return;
    }

    const counter = { val: 0 };
    gsap.to(counter, {
      val: metric.value,
      duration: 1.5,
      delay: index * 0.1,
      ease: "power2.out",
      onUpdate: () => {
        if (valueRef.current) valueRef.current.textContent = formatValue(counter.val, metric);
      },
    });
  }, [inView, index, metric]);

  return (
    <motion.div
      className="saom-metric"
      ref={wrapRef}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div className="saom-metric-value" ref={valueRef}>
        {formatValue(0, metric)}
      </div>
      <div className="saom-metric-label">{metric.label}</div>
    </motion.div>
  );
}

export default function Visibility() {
  return (
    <section className="saom-section saom-section-tight" id="visibility">
      <div className="saom-section-head" style={{ marginBottom: 40 }}>
        <span className="saom-eyebrow">Visibility</span>
        <h2 className="saom-section-title">The full posture, in one place.</h2>
      </div>
      <div className="saom-visibility-grid">
        {visibilityMetrics.map((metric, i) => (
          <Metric key={metric.id} metric={metric} index={i} />
        ))}
      </div>
    </section>
  );
}
