 import { useState } from "react";
import { motion } from "framer-motion";
import "../styles/saom-auth.css";

function Forget() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to process your request."
        );
      }

      setMessage(
        data.message ||
          "If an account exists for this email, a password reset link has been sent."
      );
    } catch (err) {
      setError(
        err.message ||
          "Unable to process your request."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="saom-root theme-red forget-page">

      {/* =====================================================
          BACKGROUND
          ===================================================== */}

      <div className="saom-ambient" />
      <div className="saom-grid" />

      {/* =====================================================
          LEFT — SAOM-AI BRAND MESSAGE
          ===================================================== */}

      <motion.section
        className="saom-brand-minimal"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="saom-minimal-content">

          <div className="saom-minimal-label">
            SAOM-AI
          </div>

           <h1>
  Regain control.
  <span>Securely.</span>
</h1>

<p>
  Recover access to your SAOM-AI workspace
  and get back to securing your environment.
</p>

          <div className="saom-minimal-line">
            <span />

            <small>
              SECURE · VERIFIED · CONTROLLED
            </small>
          </div>

        </div>
      </motion.section>

      {/* =====================================================
          RIGHT — FORGOT PASSWORD CARD
          ===================================================== */}

      <section className="saom-stage">

        <motion.div
          className="saom-stage-inner"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.65,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >

          <motion.div
            className="saom-card forget-card"
            initial={{
              opacity: 0,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.55,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
          >

            {/* =================================================
                HEADER
                ================================================= */}

            <div className="saom-card-header">

              <div className="saom-card-kicker">
                ACCOUNT RECOVERY
              </div>

              <h2>
                Reset your
                <span> password.</span>
              </h2>

              <p>
                Enter the email associated with your
                SAOM-AI account and we'll help you
                regain access.
              </p>

            </div>

            {/* =================================================
                FORM
                ================================================= */}

            <form
              className="saom-form forget-form"
              onSubmit={handleForgotPassword}
              noValidate
            >

              <div className="saom-field">

                <label htmlFor="forgot-email">
                  Email address
                </label>

                <div className="saom-input-wrap">

                  <input
                    id="forgot-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    autoComplete="email"
                    autoFocus
                  />

                </div>

              </div>

              {/* =================================================
                  ERROR
                  ================================================= */}

              {error && (
                <motion.div
                  className="saom-message is-error"
                  initial={{
                    opacity: 0,
                    y: -5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  role="alert"
                >
                  {error}
                </motion.div>
              )}

              {/* =================================================
                  SUCCESS
                  ================================================= */}

              {message && (
                <motion.div
                  className="saom-message is-success"
                  initial={{
                    opacity: 0,
                    y: -5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  role="status"
                >
                  {message}
                </motion.div>
              )}

              {/* =================================================
                  SUBMIT
                  ================================================= */}

              <motion.button
                type="submit"
                className="saom-btn"
                disabled={loading}
                whileHover={{
                  scale: loading ? 1 : 1.01,
                }}
                whileTap={{
                  scale: loading ? 1 : 0.98,
                }}
              >

                {loading ? (
                  <>
                    <span className="saom-spinner" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send reset link
                    <span className="saom-btn-arrow">
                      →
                    </span>
                  </>
                )}

              </motion.button>

            </form>

            {/* =================================================
                BACK TO SIGN IN
                ================================================= */}

            <div className="forget-back">

              <span>
                Remember your password?
              </span>

              <a href="/signin">
                Back to sign in
              </a>

            </div>

            {/* =================================================
                SECURITY NOTE
                ================================================= */}

            <div className="forget-security-note">

              <span className="forget-security-dot" />

              <span>
                Your account security remains protected
                throughout the recovery process.
              </span>

            </div>

          </motion.div>

          {/* ===================================================
              COPYRIGHT
              =================================================== */}

          <div className="saom-copyright">
            © 2026 SAOM-AI SECURITY SYSTEMS
          </div>

        </motion.div>

      </section>

    </div>
  );
}

export default Forget;