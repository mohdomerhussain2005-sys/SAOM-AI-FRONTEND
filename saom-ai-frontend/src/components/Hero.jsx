import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import envCore from "../assets/ai-core.png"; // command-center environment + AI core (same source plate)
import particleSurface from "../assets/particle-surface.png"; // atmospheric particle texture
import neuralNetwork from "../assets/neural-network.png"; // distributed intelligence network

gsap.registerPlugin(ScrollTrigger);

const TITLE_LINES = ["Smarter", "Threat Detection"];

export default function Hero() {
  const heroRef = useRef(null);
  const envRef = useRef(null);
  const particlesRef = useRef(null);
  const networkRef = useRef(null);
  const coreWrapRef = useRef(null);
  const coreImgRef = useRef(null);
  const coreGlowRef = useRef(null);
  const ringARef = useRef(null);
  const ringBRef = useRef(null);
  const ringCRef = useRef(null);
  const contentRef = useRef(null);
  const finalRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleSpans = contentRef.current.querySelectorAll(
        ".hero__title-line span"
      );
      const finalSpans = finalRef.current.querySelectorAll(
        ".hero__final-title span"
      );

      // Entrance, on load — not scroll-driven.
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .fromTo(
          envRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.6 },
          0
        )
        .fromTo(
          coreWrapRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 1.4 },
          0.2
        )
        .fromTo(
          titleSpans,
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, stagger: 0.08 },
          0.5
        )
        .fromTo(
          ".hero__sub, .hero__eyebrow",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.75
        );

      // Ambient float — core breathes gently regardless of scroll.
      gsap.to(coreWrapRef.current, {
        y: -14,
        duration: 4.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // ---------------------------------------------------------
      // Main scroll-driven choreography. The hero pins for ~2200px
      // of scroll while a single scrubbed timeline plays through
      // the activation → expansion → neural-network → resolve
      // sequence described in the brief.
      // ---------------------------------------------------------
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=2200",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 0% -> 20%: subtle enlarge + parallax lift-off
      tl.to(envRef.current, { yPercent: -6, scale: 1.05, duration: 2 }, 0)
        .to(coreWrapRef.current, { scale: 1.08, y: -20, duration: 2 }, 0)
        .to(coreGlowRef.current, { opacity: 0.85, duration: 2 }, 0)
        .to(contentRef.current, { y: -60, duration: 2 }, 0)
        .to(particlesRef.current, { opacity: 0.32, duration: 2 }, 0);

      // 20% -> 40%: rings separate, core brightens, circuitry reveals
      tl.to(ringARef.current, { scale: 1.18, opacity: 0.9, duration: 2 }, 2)
        .to(ringBRef.current, { scale: 1.42, rotate: 35, duration: 2 }, 2)
        .to(ringCRef.current, { scale: 1.65, rotate: -25, opacity: 0.5, duration: 2 }, 2)
        .to(
          coreImgRef.current,
          { filter: "drop-shadow(0 0 90px var(--red-glow)) brightness(1.15)", duration: 2 },
          2
        )
        .to(networkRef.current, { opacity: 0.18, scale: 1.02, duration: 2 }, 2.6);

      // 40% -> 60%: mechanical intelligence dissolves into digital network
      tl.to(coreWrapRef.current, { scale: 1.16, duration: 2 }, 4)
        .to(coreImgRef.current, { opacity: 0.55, filter: "blur(2px) brightness(1.1)", duration: 2 }, 4)
        .to(networkRef.current, { opacity: 0.55, scale: 1.08, duration: 2 }, 4)
        .to(particlesRef.current, { opacity: 0.5, scale: 1.1, duration: 2 }, 4);

      // 60% -> 75%: network becomes the dominant visual
      tl.to(coreWrapRef.current, { opacity: 0.12, scale: 1.24, duration: 1.5 }, 6)
        .to(networkRef.current, { opacity: 1, scale: 1.14, duration: 1.5 }, 6)
        .to(ringARef.current, { opacity: 0, duration: 1 }, 6)
        .to(ringBRef.current, { opacity: 0, duration: 1 }, 6)
        .to(contentRef.current, { opacity: 0, y: -110, duration: 1.2 }, 6);

      // 75% -> 85%: typography transition — letters dissolve upward
      tl.to(
        titleSpans,
        { yPercent: -110, opacity: 0, stagger: 0.05, duration: 1.4, ease: "power2.in" },
        7
      );

      // 85% -> 100%: SAOM AI resolves, network settles
      tl.to(finalRef.current, { opacity: 1, duration: 1.4 }, 7.6)
        .fromTo(
          finalSpans,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, stagger: 0.06, duration: 1.2, ease: "power4.out" },
          7.6
        )
        .to(networkRef.current, { opacity: 0.65, scale: 1.06, duration: 1.6 }, 8)
        .to(envRef.current, { opacity: 0.7, duration: 1.6 }, 8);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero__stage">
        <div className="hero__layer hero__layer--env" ref={envRef}>
          <img src={envCore} alt="" aria-hidden="true" />
        </div>

        <div className="hero__layer hero__layer--particles" ref={particlesRef} style={{ opacity: 0.14 }}>
          <img src={particleSurface} alt="" aria-hidden="true" />
        </div>

        <div className="hero__layer hero__layer--network" ref={networkRef} style={{ opacity: 0 }}>
          <img src={neuralNetwork} alt="" aria-hidden="true" />
        </div>

        <div className="hero__core">
          <div className="hero__core-wrap" ref={coreWrapRef}>
            <div className="hero__ring hero__ring--a" ref={ringARef} />
            <div className="hero__ring hero__ring--b" ref={ringBRef} />
            <div className="hero__ring hero__ring--c" ref={ringCRef} />
            <div className="hero__core-glow" ref={coreGlowRef} style={{ opacity: 0.4 }} />
            <img
              className="hero__core-img"
              ref={coreImgRef}
              src={envCore}
              alt="SAOM AI core"
            />
          </div>
        </div>

        <div className="hero__vignette" />
      </div>

      <div className="hero__content" ref={contentRef}>
        <span className="hero__eyebrow eyebrow">SAOM // System Online</span>
        <h1 className="hero__title">
          {TITLE_LINES.map((line, i) => (
            <span className="hero__title-line" key={i}>
              <span>{line}</span>
            </span>
          ))}
        </h1>
        <p className="hero__sub">
          Autonomous security intelligence for every connected asset —
          watching, correlating, and responding in real time.
        </p>
      </div>

      <div className="hero__final" ref={finalRef}>
        <h2 className="hero__final-title">
          <span className="hero__final-line">
            <span>SAOM</span>
          </span>{" "}
          <span className="accent">
            <span>AI</span>
          </span>
        </h2>
        <p className="hero__final-sub">Autonomous Security Operations</p>
      </div>

      <div className="hero__scroll-cue">
        <span>Scroll</span>
        <span className="bar" />
      </div>
    </section>
  );
}
