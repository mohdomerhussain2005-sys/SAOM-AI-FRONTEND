 import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../styles/component.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

 
import aiCore from "../assets/ai-core.png";
import engineCore from "../assets/engine-core.png";
import neuralNetwork from "../assets/neural-network.png";
import particleSurface from "../assets/particle-surface.png";

 
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* =====================================================
         HERO IMAGE PARALLAX
         ===================================================== */

      gsap.to(".saom-hero-image", {
        scale: 1.14,
        y: -120,
        x: 25,
        ease: "none",
        scrollTrigger: {
          trigger: ".saom-hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* =====================================================
         HERO TEXT PARALLAX
         ===================================================== */

      gsap.to(".saom-hero-copy", {
        y: -75,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: ".saom-hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* =====================================================
         HERO RED LIGHT
         ===================================================== */

      gsap.to(".hero-light", {
        scale: 1.35,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: ".saom-hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* =====================================================
         REVEAL ELEMENTS
         ===================================================== */

      gsap.utils.toArray(".saom-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 45,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
              once: true,
            },
          }
        );
      });

      /* =====================================================
         PROBLEM TEXT PARALLAX
         ===================================================== */

      gsap.to(".problem-statement", {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: ".problem",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* =====================================================
         PROBLEM RED WORD
         ===================================================== */

      gsap.fromTo(
        ".problem-accent",
        {
          opacity: 0.15,
          x: -30,
        },
        {
          opacity: 1,
          x: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".problem",
            start: "top 75%",
            end: "center center",
            scrub: 1,
          },
        }
      );

      /* =====================================================
         ENGINE IMAGE
         ===================================================== */

      gsap.to(".engine-image", {
        scale: 1.16,
        y: -90,
        rotate: 3,
        ease: "none",
        scrollTrigger: {
          trigger: ".engine-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* =====================================================
         ENGINE IMAGE FLOAT
         ===================================================== */

      gsap.to(".engine-image", {
        y: -18,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      /* =====================================================
         ENGINE TEXT
         ===================================================== */

      gsap.utils.toArray(".engine-item").forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            x: index % 2 === 0 ? -35 : 35,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      /* =====================================================
         NETWORK SECTION
         ===================================================== */

      gsap.to(".network-image", {
        scale: 1.18,
        x: 50,
        y: -70,
        ease: "none",
        scrollTrigger: {
          trigger: ".network-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      /* =====================================================
         NETWORK GRID
         ===================================================== */

      gsap.to(".network-overlay", {
        opacity: 0.75,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: ".network-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* =====================================================
         RESPONSE PARTICLES
         ===================================================== */

      gsap.to(".response-image", {
        scale: 1.2,
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: ".response-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* =====================================================
         RESPONSE CONTENT
         ===================================================== */

      gsap.utils.toArray(".response-step").forEach(
        (item, index) => {
          gsap.fromTo(
            item,
            {
              opacity: 0,
              y: 40,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: index * 0.05,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 82%",
                once: true,
              },
            }
          );
        }
      );

      /* =====================================================
         FINAL CTA IMAGE
         ===================================================== */

      gsap.to(".cta-image", {
        scale: 1.15,
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: ".final-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* =====================================================
         NAVBAR
         ===================================================== */

      gsap.to(".saom-nav", {
        backgroundColor: "rgba(5,5,7,0.82)",
        backdropFilter: "blur(18px)",
        borderColor: "rgba(255,255,255,0.09)",
        scrollTrigger: {
          trigger: ".saom-hero",
          start: "top -80",
          end: "top -81",
          toggleActions: "play none reverse none",
        },
      });

      /* =====================================================
         RED SIGNAL LINE
         ===================================================== */

      gsap.to(".signal-line-fill", {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: pageRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });

      /* =====================================================
         MAGNETIC BUTTONS
         ===================================================== */

      const buttons = gsap.utils.toArray(
        ".saom-magnetic"
      );

      buttons.forEach((button) => {
        const moveButton = (event) => {
          const rect = button.getBoundingClientRect();

          const x =
            event.clientX -
            rect.left -
            rect.width / 2;

          const y =
            event.clientY -
            rect.top -
            rect.height / 2;

          gsap.to(button, {
            x: x * 0.16,
            y: y * 0.16,
            duration: 0.35,
            ease: "power3.out",
          });
        };

        const resetButton = () => {
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.35)",
          });
        };

        button.addEventListener(
          "mousemove",
          moveButton
        );

        button.addEventListener(
          "mouseleave",
          resetButton
        );

        button._saomMove = moveButton;
        button._saomReset = resetButton;
      });
    }, pageRef);

    return () => {
      const buttons = pageRef.current?.querySelectorAll(
        ".saom-magnetic"
      );

      buttons?.forEach((button) => {
        button.removeEventListener(
          "mousemove",
          button._saomMove
        );

        button.removeEventListener(
          "mouseleave",
          button._saomReset
        );
      });

      ctx.revert();
    };
  }, []);

  return (
    <main
      ref={pageRef}
      className="saom-home"
    >

      <div className="saom-noise" />
      <div className="saom-vignette" />

      <div className="signal-line">
        <div className="signal-line-fill" />
      </div>

      <nav className="saom-nav">

        <a
          href="/"
          className="saom-logo"
        >
          <span className="logo-mark">
            S
          </span>

          <span>
            SAOM-AI
          </span>
        </a>

        <div className="saom-nav-links">

          <a href="#system">
            SYSTEM
          </a>

          <a href="#intelligence">
            INTELLIGENCE
          </a>

          <a href="#response">
            RESPONSE
          </a>

        </div>

        <a
          href="/signup"
          className="nav-access"
        >
          REQUEST ACCESS
          <span>↗</span>
        </a>

      </nav>

      <section
        className="saom-hero"
        id="top"
      >

        <div className="hero-light" />

        <div className="hero-grid" />

        <div className="hero-copy saom-hero-copy">

          <div className="hero-eyebrow">
            <span className="status-dot" />
            AUTONOMOUS SECURITY OPERATIONS
          </div>

          <h1>

            SECURITY

            <span className="hero-line">
              THAT
            </span>

            <span className="hero-red">
              THINKS AHEAD.
            </span>

          </h1>

          <p>
            SAOM-AI continuously understands
            the signals moving through your
            digital environment — detecting
            threats before they become incidents.
          </p>

          <div className="hero-actions">

            <a
              href="/signup"
              className="saom-button saom-magnetic"
            >
              ENTER SAOM-AI
              <span>→</span>
            </a>

            <a
              href="#system"
              className="hero-secondary"
            >
              EXPLORE THE SYSTEM
              <span>↓</span>
            </a>

          </div>

        </div>

        <div className="hero-visual">

          <div className="hero-image-wrap">

            <img
              src={aiCore}
              alt="SAOM-AI autonomous security core"
              className="saom-hero-image"
            />

          </div>

          <div className="hero-telemetry telemetry-one">
            <span>CORE</span>
            <strong>ACTIVE</strong>
          </div>

          <div className="hero-telemetry telemetry-two">
            <span>THREAT INDEX</span>
            <strong>0.002</strong>
          </div>

          <div className="hero-telemetry telemetry-three">
            <span>LATENCY</span>
            <strong>04ms</strong>
          </div>

        </div>

        <div className="hero-bottom">

          <span>
            SCROLL TO EXPLORE
          </span>

          <span>
            01 — 07
          </span>

        </div>

      </section>

      <section
        className="saom-section problem"
        id="intelligence"
      >

        <div className="section-index">
          01 / THE PROBLEM
        </div>

        <div className="problem-statement">

          <p className="muted-word">
            EVERY
          </p>

          <p>
            SIGNAL
          </p>

          <p className="problem-accent">
            ISN'T
          </p>

          <p>
            A THREAT.
          </p>

          <div className="problem-subtext">
            But every threat leaves a signal.
          </div>

        </div>

      </section>

      <section
        className="saom-section engine-section"
        id="system"
      >

        <div className="section-index">
          02 / THE SYSTEM
        </div>

        <div className="engine-layout">

          <div className="engine-visual">

            <div className="visual-ring ring-one" />
            <div className="visual-ring ring-two" />

            <img
              src={engineCore}
              alt="SAOM-AI intelligence engine"
              className="engine-image"
            />

            <div className="visual-label">
              ENGINE // ONLINE
            </div>

          </div>

          <div className="engine-copy">

            <div className="eyebrow">
              INTELLIGENCE ENGINE
            </div>

            <h2>
              Observe.
              <br />
              Understand.
              <br />
              <span>Act.</span>
            </h2>

            <p>
              SAOM-AI turns continuous security
              telemetry into context. Instead of
              treating every event as an isolated
              alert, the system understands behavior,
              relationships and intent.
            </p>

            <div className="engine-items">

              <div className="engine-item">
                <span>01</span>
                <div>
                  <strong>DETECT</strong>
                  <small>
                    Continuous signal collection
                    across your environment.
                  </small>
                </div>
              </div>

              <div className="engine-item">
                <span>02</span>
                <div>
                  <strong>ANALYZE</strong>
                  <small>
                    Behavioral intelligence
                    separates signal from noise.
                  </small>
                </div>
              </div>

              <div className="engine-item">
                <span>03</span>
                <div>
                  <strong>CORRELATE</strong>
                  <small>
                    Related events become one
                    coherent threat narrative.
                  </small>
                </div>
              </div>

              <div className="engine-item">
                <span>04</span>
                <div>
                  <strong>RESPOND</strong>
                  <small>
                    Verified threats trigger
                    controlled autonomous action.
                  </small>
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>

      <section className="saom-section intelligence-section">

        <div className="section-index">
          03 / THREAT INTELLIGENCE
        </div>

        <div className="intelligence-heading saom-reveal">

          <div className="eyebrow">
            ATTACK INTELLIGENCE
          </div>

          <h2>
            From
            <span> noise </span>
            to
            <span> signal.</span>
          </h2>

          <p>
            The system connects seemingly unrelated
            events and reconstructs what is actually
            happening inside your environment.
          </p>

        </div>

        <div className="intelligence-flow">

          <div className="flow-item saom-reveal">
            <span>01</span>
            <strong>EVENT</strong>
            <small>
              Raw security telemetry
            </small>
          </div>

          <div className="flow-line" />

          <div className="flow-item saom-reveal">
            <span>02</span>
            <strong>CORRELATION</strong>
            <small>
              Related signals connect
            </small>
          </div>

          <div className="flow-line" />

          <div className="flow-item saom-reveal">
            <span>03</span>
            <strong>BEHAVIOR</strong>
            <small>
              Intent becomes visible
            </small>
          </div>

          <div className="flow-line" />

          <div className="flow-item flow-threat saom-reveal">
            <span>04</span>
            <strong>THREAT</strong>
            <small>
              Attack narrative identified
            </small>
          </div>

        </div>

      </section>

      <section className="saom-section network-section">

        <div className="network-image-wrap">

          <img
            src={neuralNetwork}
            alt="SAOM-AI neural security network"
            className="network-image"
          />

          <div className="network-overlay" />

        </div>

        <div className="network-copy">

          <div className="section-index">
            04 / GLOBAL LAYER
          </div>

          <div className="eyebrow">
            ONE CONNECTED ENVIRONMENT
          </div>

          <h2>
            EVERY IDENTITY.
            <br />
            EVERY ENDPOINT.
            <br />
            <span>ONE SYSTEM.</span>
          </h2>

          <p>
            SAOM-AI connects identities, endpoints,
            cloud workloads, applications and network
            activity into one continuously understood
            security environment.
          </p>

        </div>

      </section>

      <section
        className="saom-section response-section"
        id="response"
      >

        <div className="response-background">

          <img
            src={particleSurface}
            alt=""
            aria-hidden="true"
            className="response-image"
          />

        </div>

        <div className="response-content">

          <div className="section-index">
            05 / RESPONSE
          </div>

          <div className="eyebrow">
            AUTONOMOUS RESPONSE
          </div>

          <h2>
            DETECT.
            <br />
            DECIDE.
            <br />
            <span>RESPOND.</span>
          </h2>

          <p>
            Once a threat is understood, SAOM-AI
            moves from observation to action —
            containing verified threats while
            maintaining an auditable trail.
          </p>

          <div className="response-steps">

            <div className="response-step">
              <span>01</span>
              <strong>NORMAL</strong>
              <small>
                Environment operating normally
              </small>
            </div>

            <div className="response-step">
              <span>02</span>
              <strong>ANOMALY</strong>
              <small>
                Behavior deviates from baseline
              </small>
            </div>

            <div className="response-step">
              <span>03</span>
              <strong>SUSPICIOUS</strong>
              <small>
                Signals begin correlating
              </small>
            </div>

            <div className="response-step response-danger">
              <span>04</span>
              <strong>THREAT</strong>
              <small>
                Attack confirmed
              </small>
            </div>

            <div className="response-step response-contained">
              <span>05</span>
              <strong>CONTAINED</strong>
              <small>
                Automated response complete
              </small>
            </div>

          </div>

        </div>

      </section>

      <section className="saom-section final-statement">

        <div className="section-index">
          06 / THE IDEA
        </div>

        <div className="statement-wrap">

          <p>
            SECURITY
          </p>

          <p className="statement-muted">
            SHOULD NOT
          </p>

          <p>
            WAIT FOR
          </p>

          <p className="statement-red">
            CERTAINTY.
          </p>

        </div>

        <div className="statement-description">
          The advantage isn't knowing something
          happened. It's understanding what it
          means before it spreads.
        </div>

      </section>

      <section className="saom-section final-section">

        <div className="cta-background">

          <img
            src={aiCore}
            alt=""
            aria-hidden="true"
            className="cta-image"
          />

          <div className="cta-overlay" />

        </div>

        <div className="final-content">

          <div className="eyebrow">
            07 / GET STARTED
          </div>

          <h2>
            YOUR SECURITY
            <br />
            <span>STARTS HERE.</span>
          </h2>

          <p>
            Build a security environment that
            sees the signal before the incident.
          </p>

          <div className="final-actions">

            <a
              href="/signup"
              className="saom-button saom-magnetic"
            >
              REQUEST ACCESS
              <span>→</span>
            </a>

            <a
              href="/signin"
              className="final-signin"
            >
              ALREADY HAVE ACCESS?
              <span>SIGN IN</span>
            </a>

          </div>

        </div>

      </section>

      <footer className="saom-footer">

        <div className="footer-logo">
          SAOM-AI
        </div>

        <div className="footer-description">
          AUTONOMOUS AI SECURITY OPERATIONS
        </div>

        <div className="footer-links">

          <a href="#top">
            INDEX
          </a>

          <a href="#system">
            SYSTEM
          </a>

          <a href="#intelligence">
            INTELLIGENCE
          </a>

          <a href="/signin">
            ACCESS
          </a>

        </div>

        <div className="footer-bottom">

          <span>
            © {new Date().getFullYear()} SAOM-AI
          </span>

          <span>
            INTELLIGENT · AUTONOMOUS · SECURE
          </span>

        </div>

      </footer>

    </main>
  );
}