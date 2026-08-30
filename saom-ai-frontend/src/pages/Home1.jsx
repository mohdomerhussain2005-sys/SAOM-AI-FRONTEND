import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Navbar from "../components/Navbar.jsx";
import CustomCursor from "../components/CustomCursor.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import MagneticButton from "../components/MagneticButton.jsx";
import FloatingCard from "../components/FloatingCard.jsx";
import ThreatCard from "../components/ThreatCard.jsx";

import aiCore from "../assets/ai-core.png";
import engineCore from "../assets/engine-core.png";
import particleSurface from "../assets/particle-surface.png";
import neuralNetwork from "../assets/neural-network.png";

gsap.registerPlugin(ScrollTrigger);

const METRICS = [
  { label: "Assets monitored", value: "142" },
  { label: "Events processed", value: "37" },
  { label: "Anomalies flagged", value: "08" },
  { label: "Critical findings", value: "03" },
  { label: "Active threat", value: "01" },
];

const ASSETS = [
  { name: "SERVER 01", status: "online", meta: "us-east · web tier" },
  { name: "SERVER 02", status: "online", meta: "us-east · web tier" },
  { name: "WORKSTATION 14", status: "warning", meta: "finance · endpoint" },
  { name: "DATABASE 03", status: "online", meta: "primary · postgres" },
  { name: "VM-07", status: "critical", meta: "staging · exposed port" },
];

const PIPELINE = ["Event", "Correlation", "AI analysis", "Threat", "Response"];
const INCIDENT_STATES = ["Normal", "Anomaly", "Suspicious", "Threat", "Contained"];

export default function Home() {
  const heroRef = useRef(null);
  const envRef = useRef(null);
  const particlesRef = useRef(null);
  const networkRef = useRef(null);
  const coreWrapRef = useRef(null);
  const coreRef = useRef(null);
  const ringGlowRef = useRef(null);
  const titleMainRef = useRef(null);
  const titleSubRef = useRef(null);
  const kickerRef = useRef(null);
  const finalTitleRef = useRef(null);
  const heroUiRef = useRef(null);
  const scrollCueRef = useRef(null);

  const rootRef = useRef(null);

  // Smooth scrolling (Lenis) wired into GSAP's ticker + ScrollTrigger.
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  // Hero pinned scroll choreography + all in-view reveals.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 820;
      const scrollDistance = isMobile ? 1500 : 2200;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: `+=${scrollDistance}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
        defaults: { ease: "none" },
      });

      // Scroll cue fades almost immediately.
      tl.to(scrollCueRef.current, { opacity: 0, y: -10, duration: 0.4 }, 0);

      // ~0 -> 20%: environment + core drift, glow builds, text lifts slightly.
      tl.to(envRef.current, { yPercent: -6, scale: 1.05, duration: 2 }, 0);
      tl.to(coreWrapRef.current, { y: -30, scale: 1.08, duration: 2 }, 0);
      tl.to(ringGlowRef.current, { opacity: 0.85, duration: 2 }, 0);
      tl.to([kickerRef.current, titleMainRef.current, titleSubRef.current], { y: -50, duration: 2 }, 0);

      // ~20 -> 45%: rings separate (simulated via scale+rotation of core),
      // circuitry brightens, network begins to emerge behind the core.
      tl.to(coreRef.current, { rotate: 8, scale: 1.14, duration: 2.2 }, 1.6);
      tl.to(ringGlowRef.current, { scale: 1.25, opacity: 1, duration: 2.2 }, 1.6);
      tl.to(networkRef.current, { opacity: 0.55, scale: 1, filter: "blur(0px)", duration: 2.2 }, 1.8);
      tl.to(particlesRef.current, { opacity: 0.4, duration: 2 }, 1.8);

      // ~45 -> 70%: mechanical core recedes into blur, network dominates.
      tl.to(coreRef.current, { opacity: 0.15, scale: 1.3, filter: "blur(6px)", duration: 2.4 }, 3.6);
      tl.to(ringGlowRef.current, { opacity: 0, duration: 1.6 }, 3.6);
      tl.to(networkRef.current, { opacity: 1, scale: 1.08, duration: 2.6 }, 3.4);
      tl.to(particlesRef.current, { opacity: 0.7, x: 0, duration: 2.4 }, 3.4);
      tl.to([kickerRef.current, titleMainRef.current, titleSubRef.current], {
        opacity: 0,
        y: -110,
        filter: "blur(6px)",
        duration: 1.6,
      }, 4.2);

      // ~70 -> 100%: final wordmark resolves, network settles, UI details land.
      tl.fromTo(
        finalTitleRef.current,
        { opacity: 0, y: 40, filter: "blur(10px)", letterSpacing: "0.15em" },
        { opacity: 1, y: 0, filter: "blur(0px)", letterSpacing: "0.02em", duration: 2.4, ease: "power2.out" },
        4.8
      );
      tl.to(networkRef.current, { scale: 1, opacity: 0.5, filter: "blur(1px)", duration: 2 }, 5.4);
      tl.fromTo(
        heroUiRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.4 },
        6
      );
      tl.to(envRef.current, { scale: 1.1, opacity: 0.5, duration: 2.4 }, 4.6);

      // --- Generic scroll reveals used throughout the rest of the page ---
      gsap.utils.toArray(".reveal-line").forEach((el) => {
        gsap.fromTo(
          el.querySelector(".reveal-line__inner") || el,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.utils.toArray(".fade-up").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Engine section: slow continuous rotation + parallax drift.
      gsap.to(".engine-image", {
        rotate: 6,
        scrollTrigger: {
          trigger: ".engine-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Floating dashboard cards: staggered depth-based parallax.
      gsap.utils.toArray(".floating-card").forEach((card) => {
        const depth = Number(card.dataset.depth || 1);
        gsap.to(card, {
          y: -28 * depth,
          scrollTrigger: {
            trigger: ".dashboard-section",
            start: "top 60%",
            end: "bottom top",
            scrub: 1 + depth * 0.4,
          },
        });
      });

      // Pipeline flow: animate the connecting progress line.
      gsap.fromTo(
        ".pipeline-progress",
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          ease: "none",
          scrollTrigger: {
            trigger: ".pipeline-track",
            start: "top 75%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        }
      );

      // Final CTA background drift.
      gsap.to(".final-cta__bg", {
        yPercent: -12,
        scale: 1.08,
        scrollTrigger: {
          trigger: ".final-cta",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} id="top">
      <div className="grain" aria-hidden="true" />
      <CustomCursor />
      <Navbar />

      {/* ============== HERO ============== */}
      <section className="hero" ref={heroRef} id="index">
        <div className="hero__layer hero__env" ref={envRef}>
          <img src={aiCore} alt="" className="hero__env-img" aria-hidden="true" />
        </div>
        <div className="hero__vignette" />
        <div className="hero__layer hero__particles" ref={particlesRef}>
          <img src={particleSurface} alt="" aria-hidden="true" />
        </div>
        <div className="hero__layer hero__network" ref={networkRef}>
          <img src={neuralNetwork} alt="" aria-hidden="true" />
        </div>

        <div className="hero__top">
          <span className="hero__kicker" ref={kickerRef}>
            Autonomous security intelligence
          </span>
        </div>

        <div className="hero__core" ref={coreWrapRef}>
          <div className="hero__ring-glow" ref={ringGlowRef} />
          <div className="hero__core-mask">
            <img src={aiCore} alt="SAOM AI core" className="hero__core-img" ref={coreRef} />
          </div>
        </div>

        <div className="hero__content">
          <h1 className="hero__title" ref={titleMainRef}>
            Smarter
            <br />
            threat detection
          </h1>
          <p className="hero__sub" ref={titleSubRef}>
            Autonomous security intelligence for every connected asset.
          </p>

          <h1 className="hero__final-title" ref={finalTitleRef}>
            SAOM AI
            <span>Autonomous security operations</span>
          </h1>
        </div>

        <div className="hero__ui" ref={heroUiRef}>
          <div className="hero__ui-item">
            <span className="dot dot--live" /> System active
          </div>
          <div className="hero__ui-item">142 assets · 0 unresolved</div>
        </div>

        <div className="hero__scroll-cue" ref={scrollCueRef}>
          <span>Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* ============== SECTION 2 — INTRODUCTION ============== */}
      <section className="intro">
        <div className="intro__inner">
          <SectionHeading
            eyebrow="Why it matters"
            lines={["The threat", "doesn't", "wait."]}
          />
          <div className="intro__body">
            <p className="intro__lede reveal-line">
              <span className="reveal-line__inner">Neither should your security.</span>
            </p>
            <p className="intro__text fade-up">
              SAOM AI continuously observes your digital environment, understands
              abnormal behavior, and correlates security events across every
              connected asset — helping security teams respond before threats
              become damage.
            </p>
          </div>
        </div>
      </section>

      {/* ============== SECTION 3 — INTELLIGENCE ENGINE ============== */}
      <section className="engine engine-section" id="intelligence">
        <div className="engine__visual">
          <div className="engine__glow" />
          <img src={engineCore} alt="SAOM intelligence engine core" className="engine-image" />
          <div className="engine__ring-label engine__ring-label--top fade-up">DETECT</div>
          <div className="engine__ring-label engine__ring-label--right fade-up">ANALYZE</div>
          <div className="engine__ring-label engine__ring-label--bottom fade-up">CORRELATE</div>
          <div className="engine__ring-label engine__ring-label--left fade-up">RESPOND</div>
        </div>
        <div className="engine__copy">
          <SectionHeading
            eyebrow="System"
            index="01"
            lines={["The intelligence", "engine."]}
          />
          <p className="fade-up">
            At the center of SAOM AI is a self-correcting reasoning core that
            ingests telemetry from every endpoint, cloud workload, and network
            edge — turning raw signal into a single, continuously updated
            picture of risk.
          </p>
        </div>
      </section>

      {/* ============== SECTION 4 — AUTONOMOUS DETECTION ============== */}
      <section className="detection" id="system">
        <SectionHeading
          eyebrow="Live posture"
          index="02"
          align="center"
          lines={["Detect", "before", "damage."]}
        />
        <div className="detection__grid">
          {METRICS.map((m, i) => (
            <ThreatCard
              key={m.label}
              label={m.label}
              value={m.value}
              active={i === METRICS.length - 1}
            />
          ))}
        </div>
      </section>

      {/* ============== SECTION 5 — DASHBOARD ============== */}
      <section className="dashboard dashboard-section">
        <SectionHeading
          eyebrow="Visibility"
          index="03"
          lines={["One dashboard.", "Every asset."]}
        />
        <div className="dashboard__grid">
          {ASSETS.map((a, i) => (
            <FloatingCard key={a.name} {...a} depth={(i % 3) + 1} />
          ))}
        </div>
      </section>

      {/* ============== SECTION 6 — AI THREAT ANALYSIS ============== */}
      <section className="pipeline">
        <SectionHeading
          eyebrow="Correlation"
          index="04"
          align="center"
          lines={["From", "noise", "to signal."]}
        />
        <p className="pipeline__text fade-up">
          SAOM AI correlates millions of low-signal events into a handful of
          decisions that matter — collapsing alert fatigue into clear,
          prioritized action.
        </p>
        <div className="pipeline-track">
          <div className="pipeline-progress" />
          {PIPELINE.map((stage, i) => (
            <div className={`pipeline__stage fade-up ${i === 3 ? "pipeline__stage--threat" : ""}`} key={stage}>
              <span className="pipeline__stage-index">0{i + 1}</span>
              <span>{stage}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ============== SECTION 7 — RESPONSE ============== */}
      <section className="response">
        <SectionHeading
          eyebrow="Action"
          index="05"
          lines={["Detect.", "Decide.", "Respond."]}
        />
        <div className="response__ladder">
          {INCIDENT_STATES.map((state, i) => (
            <div
              className={`response__state fade-up ${state === "Threat" ? "response__state--threat" : ""} ${
                state === "Contained" ? "response__state--contained" : ""
              }`}
              key={state}
            >
              <span className="response__state-index">{i + 1}</span>
              <span>{state}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ============== SECTION 8 — FINAL CTA ============== */}
      <section className="final-cta" id="contact">
        <img src={neuralNetwork} alt="" className="final-cta__bg" aria-hidden="true" />
        <div className="final-cta__scrim" />
        <div className="final-cta__content">
          <h2 className="final-cta__title reveal-line">
            <span className="reveal-line__inner">Your</span>
          </h2>
          <h2 className="final-cta__title reveal-line">
            <span className="reveal-line__inner">security</span>
          </h2>
          <h2 className="final-cta__title reveal-line">
            <span className="reveal-line__inner">starts here.</span>
          </h2>
          <MagneticButton className="final-cta__btn">Enter SAOM AI</MagneticButton>
        </div>
      </section>

      <footer className="footer">
        <span>SAOM AI © {new Date().getFullYear()}</span>
        <span>Autonomous security operations</span>
      </footer>
    </div>
  );
}
