import { useState } from "react";
import { motion } from "framer-motion";
import "../styles/saom-auth.css";

const IconEye = ({ open }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    {open ? (
      <>
        <path
          d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle
          cx="12"
          cy="12"
          r="3"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </>
    ) : (
      <path
        d="M3 3l18 18M10.6 10.6a3 3 0 0 0 4.2 4.2M6.6 6.7C4.5 8.1 3 10 3 10s3.6 7 10 7c1.6 0 3-.4 4.2-1M9.9 4.2C10.6 4.1 11.3 4 12 4c6.4 0 10 7 10 7a15 15 0 0 1-2.2 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    )}
  </svg>
);

const IconGoogle = () => (
  <svg width="17" height="17" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.49 12.27c0-.82-.07-1.6-.2-2.36H12v4.47h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3h3.88c2.27-2.09 3.54-5.17 3.54-8.73Z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.1C3.25 21.3 7.3 24 12 24Z"
    />
    <path
      fill="#FBBC05"
      d="M5.27 14.29A7.2 7.2 0 0 1 4.89 12c0-.8.14-1.57.38-2.29v-3.1H1.27A11.98 11.98 0 0 0 0 12c0 1.93.46 3.76 1.27 5.39l4-3.1Z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0 7.3 0 3.25 2.7 1.27 6.61l4 3.1C6.22 6.86 8.87 4.75 12 4.75Z"
    />
  </svg>
);

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ============================================================
  // LOGIN LOGIC — KEPT INTACT
  // ============================================================

  const handleSignin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Invalid email or password."
        );
      }

      const storage = rememberMe
        ? localStorage
        : sessionStorage;

      storage.setItem(
        "saom_token",
        data.token
      );

      storage.setItem(
        "saom_user",
        JSON.stringify(data.user)
      );

      window.location.href = "/dashboard";
    } catch (err) {
      setError(
        err.message || "Unable to sign in."
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // GOOGLE AUTH
  // ============================================================

  const handleGoogleAuth = () => {
    if (!window.google?.accounts?.oauth2) {
      setError("Google authentication is still loading. Please try again.");
      return;
    }

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      setError("Google authentication is not configured.");
      return;
    }

    setError("");

    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: "openid email profile",
      callback: async (tokenResponse) => {
        try {
          if (!tokenResponse?.access_token) {
            throw new Error("Google authentication was cancelled.");
          }

          setLoading(true);

          const googleResponse = await fetch(
            "http://localhost:5000/api/auth/google-access-token",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                accessToken: tokenResponse.access_token,
              }),
            }
          );

          const data = await googleResponse.json();
          if (!googleResponse.ok) {
            throw new Error(data.message || "Google authentication failed.");
          }

          const storage = rememberMe ? localStorage : sessionStorage;
          storage.setItem("saom_token", data.token);
          storage.setItem("saom_user", JSON.stringify(data.user));
          window.location.href = "/dashboard";
        } catch (err) {
          console.error("Google authentication error:", err);
          setError(err.message || "Unable to authenticate with Google.");
        } finally {
          setLoading(false);
        }
      },
    });

    tokenClient.requestAccessToken({ prompt: "select_account" });
  };

  return (
    <div className="saom-root theme-red signin-page">
      <div className="saom-ambient" />
      <div className="saom-grid" />

      {/* ======================================================
          LEFT — MINIMAL SAOM BRAND
          ====================================================== */}

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
  Your security.
  <span>Always on.</span>
</h1>

<p>
  Return to your SAOM-AI workspace and keep
  your security operations running without
  interruption.
</p>
          <div className="saom-minimal-line">
            <span />
            <small>
              INTELLIGENT · AUTONOMOUS · SECURE
            </small>
          </div>

        </div>
      </motion.section>

      {/* ======================================================
          RIGHT — SIGN IN
          ====================================================== */}

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
            className="saom-card signin-card"
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
                SIGN IN HEADER
                ================================================= */}

            <div className="saom-card-header">

              <div className="saom-card-kicker">
                SECURE ACCESS
              </div>

              <h2>
                Welcome
                <span> back.</span>
              </h2>

              <p>
                Sign in to continue to your
                SAOM-AI security workspace.
              </p>

            </div>

            {/* =================================================
                FORM
                ================================================= */}

            <form
              className="saom-form signin-form"
              onSubmit={handleSignin}
              noValidate
            >

              {/* EMAIL */}

              <div className="saom-field">
                <label htmlFor="signin-email">
                  Email address
                </label>

                <div className="saom-input-wrap">

                  <input
                    id="signin-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    autoComplete="email"
                  />

                </div>
              </div>

              {/* PASSWORD */}

              <div className="saom-field">
                <label htmlFor="signin-password">
                  Password
                </label>

                <div className="saom-input-wrap with-toggle">

                  <input
                    id="signin-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="saom-toggle-visibility"
                    onClick={() =>
                      setShowPassword(
                        (value) => !value
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    <IconEye
                      open={showPassword}
                    />
                  </button>

                </div>
              </div>

              {/* OPTIONS */}

              <div className="signin-options">

                <label className="saom-checkbox">

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(
                        e.target.checked
                      )
                    }
                  />

                  <span>
                    Remember me
                  </span>

                </label>

                <a
                  className="saom-link"
                  href="/forgot-password"
                >
                  Forgot password?
                </a>

              </div>

              {/* ERROR */}

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

              {/* SIGN IN BUTTON */}

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
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <span className="saom-btn-arrow">
                      →
                    </span>
                  </>
                )}

              </motion.button>

            </form>

            {/* DIVIDER */}

            <div className="saom-divider">
              Or continue with
            </div>

            {/* GOOGLE */}

            <button
              type="button"
              className="saom-btn-secondary"
              onClick={handleGoogleAuth}
            >
              <IconGoogle />
              Continue with Google
            </button>

            {/* SIGNUP */}

            <div className="saom-footnote signin-footnote">
              Don't have an account?{" "}
              <a href="/signup">
                Create one
              </a>
            </div>

          </motion.div>

          <div className="saom-copyright">
            © 2026 SAOM-AI SECURITY SYSTEMS
          </div>

        </motion.div>
      </section>

    </div>
  );
}

export default Signin;