 import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const IconCheck = () => (
  <svg viewBox="0 0 10 8" fill="none">
    <path
      d="M1 4l2.5 2.5L9 1"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function Signup() {
  const [step, setStep] = useState("signup");

  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [otp, setOtp] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const passwordRequirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const passwordValid =
    passwordRequirements.length &&
    passwordRequirements.uppercase &&
    passwordRequirements.lowercase &&
    passwordRequirements.number;

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (
      !fullName ||
      !organization ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!passwordValid) {
      setError(
        "Password must be at least 8 characters and contain uppercase, lowercase, and a number."
      );
      return;
    }

    try {
      setLoading(true);

      const registerResponse = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: fullName,
            organization,
            email,
            password,
          }),
        }
      );

      const registerData = await registerResponse.json();

      if (!registerResponse.ok) {
        throw new Error(
          registerData.message || "Unable to create account."
        );
      }

      const otpResponse = await fetch(
        "http://localhost:5000/api/auth/send-otp",
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

      const otpData = await otpResponse.json();

      if (!otpResponse.ok) {
        throw new Error(
          otpData.message || "Unable to send verification code."
        );
      }

      setMessage("Verification code sent to your email.");
      setStep("otp");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (otp.length !== 6) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    try {
      setLoading(true);

      const verifyResponse = await fetch(
        "http://localhost:5000/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
          }),
        }
      );

      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok) {
        throw new Error(
          verifyData.message || "Invalid verification code."
        );
      }

      setMessage("Email verified. Signing you in...");

      const loginResponse = await fetch(
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

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(
          loginData.message ||
            "Email verified, but automatic login failed."
        );
      }

      localStorage.setItem("saom_token", loginData.token);
      localStorage.setItem(
        "saom_user",
        JSON.stringify(loginData.user)
      );

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 700);
    } catch (err) {
      setError(err.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    console.warn(
      "Google sign-in is not yet connected to a backend endpoint."
    );
  };

  return (
    <div className="saom-root theme-red">
      <div className="saom-ambient" />
      <div className="saom-grid" />

      {/* =====================================================
          LEFT — MINIMAL BRAND STATEMENT
          ===================================================== */}

      <motion.section
        className="saom-brand-minimal"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
            Security that
            <span> thinks ahead.</span>
          </h1>

          <p>
            Autonomous security operations built to detect,
            understand, and respond before threats become
            incidents.
          </p>

          <div className="saom-minimal-line">
            <span />
            <small>INTELLIGENT · AUTONOMOUS · SECURE</small>
          </div>
        </div>
      </motion.section>

      {/* =====================================================
          RIGHT — SIGN UP / OTP
          ===================================================== */}

      <section className="saom-stage">
        <motion.div
          className="saom-stage-inner"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.65,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <motion.div
            className="saom-card"
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
            {/* Progress */}

            <div className="saom-steps">
              <StepMeter
                label="01 Account"
                state={
                  step === "signup" ? "active" : "done"
                }
              />

              <StepMeter
                label="02 Verify"
                state={
                  step === "otp"
                    ? "active"
                    : "pending"
                }
              />

              <StepMeter
                label="03 Access"
                state="pending"
              />
            </div>

            <AnimatePresence mode="wait">

              {/* =================================================
                  SIGNUP
                  ================================================= */}

              {step === "signup" && (
                <motion.div
                  key="signup"
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -20,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                >
                  <div className="saom-card-header">
                    <div className="saom-card-kicker">
                      CREATE ACCOUNT
                    </div>

                    <h2>
                      Welcome to
                      <span> SAOM-AI</span>
                    </h2>

                    <p>
                      Create your secure workspace to begin
                      monitoring your environment.
                    </p>
                  </div>

                  <form
                    className="saom-form"
                    onSubmit={handleRegister}
                    noValidate
                  >
                    <div className="saom-field">
                      <label htmlFor="fullName">
                        Full name
                      </label>

                      <div className="saom-input-wrap">
                        <input
                          id="fullName"
                          type="text"
                          placeholder="Your full name"
                          value={fullName}
                          onChange={(e) =>
                            setFullName(e.target.value)
                          }
                          autoComplete="name"
                        />
                      </div>
                    </div>

                    <div className="saom-field">
                      <label htmlFor="organization">
                        Organization
                      </label>

                      <div className="saom-input-wrap">
                        <input
                          id="organization"
                          type="text"
                          placeholder="Your organization"
                          value={organization}
                          onChange={(e) =>
                            setOrganization(e.target.value)
                          }
                          autoComplete="organization"
                        />
                      </div>
                    </div>

                    <div className="saom-field">
                      <label htmlFor="signup-email">
                        Email address
                      </label>

                      <div className="saom-input-wrap">
                        <input
                          id="signup-email"
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

                    <div className="saom-field">
                      <label htmlFor="signup-password">
                        Password
                      </label>

                      <div className="saom-input-wrap with-toggle">
                        <input
                          id="signup-password"
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          placeholder="Create a password"
                          value={password}
                          onChange={(e) =>
                            setPassword(e.target.value)
                          }
                          autoComplete="new-password"
                        />

                        <button
                          type="button"
                          className="saom-toggle-visibility"
                          onClick={() =>
                            setShowPassword(
                              (v) => !v
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

                    <div className="saom-field">
                      <label htmlFor="confirm-password">
                        Confirm password
                      </label>

                      <div className="saom-input-wrap with-toggle">
                        <input
                          id="confirm-password"
                          type={
                            showConfirmPassword
                              ? "text"
                              : "password"
                          }
                          placeholder="Confirm password"
                          value={confirmPassword}
                          onChange={(e) =>
                            setConfirmPassword(
                              e.target.value
                            )
                          }
                          autoComplete="new-password"
                        />

                        <button
                          type="button"
                          className="saom-toggle-visibility"
                          onClick={() =>
                            setShowConfirmPassword(
                              (v) => !v
                            )
                          }
                          aria-label={
                            showConfirmPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          <IconEye
                            open={
                              showConfirmPassword
                            }
                          />
                        </button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {password && (
                        <motion.div
                          className="saom-requirements"
                          initial={{
                            opacity: 0,
                            height: 0,
                          }}
                          animate={{
                            opacity: 1,
                            height: "auto",
                          }}
                          exit={{
                            opacity: 0,
                            height: 0,
                          }}
                        >
                          <Requirement
                            ok={
                              passwordRequirements.length
                            }
                            text="8+ characters"
                          />

                          <Requirement
                            ok={
                              passwordRequirements.uppercase
                            }
                            text="Uppercase letter"
                          />

                          <Requirement
                            ok={
                              passwordRequirements.lowercase
                            }
                            text="Lowercase letter"
                          />

                          <Requirement
                            ok={
                              passwordRequirements.number
                            }
                            text="Number"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

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
                      >
                        {error}
                      </motion.div>
                    )}

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
                      >
                        {message}
                      </motion.div>
                    )}

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
                          Creating account...
                        </>
                      ) : (
                        <>
                          Create account
                          <span className="saom-btn-arrow">
                            →
                          </span>
                        </>
                      )}
                    </motion.button>
                  </form>

                  <div className="saom-divider">
                    Or continue with
                  </div>

                  <button
                    type="button"
                    className="saom-btn-secondary"
                    onClick={handleGoogleAuth}
                  >
                    <IconGoogle />
                    Continue with Google
                  </button>

                  <div className="saom-footnote">
                    Already have an account?{" "}
                    <a href="/signin">
                      Sign in
                    </a>
                  </div>
                </motion.div>
              )}

              {/* =================================================
                  OTP
                  ================================================= */}

              {step === "otp" && (
                <motion.div
                  key="otp"
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -20,
                  }}
                >
                  <div className="saom-card-header">
                    <div className="saom-card-kicker">
                      EMAIL VERIFICATION
                    </div>

                    <h2>
                      Verify your
                      <span> identity.</span>
                    </h2>

                    <p>
                      Enter the 6-digit verification code
                      sent to{" "}
                      <strong>{email}</strong>
                    </p>
                  </div>

                  <form
                    className="saom-form"
                    onSubmit={handleVerifyOtp}
                    noValidate
                  >
                    <div className="saom-field">
                      <label htmlFor="signup-otp">
                        Verification code
                      </label>

                      <div className="saom-input-wrap saom-otp-input">
                        <input
                          id="signup-otp"
                          type="text"
                          inputMode="numeric"
                          maxLength="6"
                          placeholder="000000"
                          value={otp}
                          onChange={(e) =>
                            setOtp(
                              e.target.value.replace(
                                /\D/g,
                                ""
                              )
                            )
                          }
                        />
                      </div>
                    </div>

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
                      >
                        {error}
                      </motion.div>
                    )}

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
                      >
                        {message}
                      </motion.div>
                    )}

                    <motion.button
                      type="submit"
                      className="saom-btn"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="saom-spinner" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          Verify email
                          <span className="saom-btn-arrow">
                            →
                          </span>
                        </>
                      )}
                    </motion.button>
                  </form>

                  <div className="saom-footnote">
                    Wrong email?{" "}
                    <button
                      type="button"
                      className="saom-text-btn"
                      onClick={() => {
                        setStep("signup");
                        setOtp("");
                        setError("");
                        setMessage("");
                      }}
                    >
                      Go back
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="saom-copyright">
            © 2026 SAOM-AI SECURITY SYSTEMS
          </div>
        </motion.div>
      </section>
    </div>
  );
}

function StepMeter({ label, state }) {
  return (
    <div className="saom-step">
      <div className="saom-step-bar">
        <motion.div
          className="saom-step-bar-fill"
          initial={false}
          animate={{
            scaleX:
              state === "pending" ? 0 : 1,
          }}
          style={{
            background:
              state === "done"
                ? "var(--success)"
                : "var(--grad-core)",
          }}
        />
      </div>

      <span
        className={`saom-step-label ${
          state === "active"
            ? "is-active"
            : ""
        } ${
          state === "done"
            ? "is-done"
            : ""
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function Requirement({ ok, text }) {
  return (
    <div
      className={`saom-requirement ${
        ok ? "is-valid" : ""
      }`}
    >
      <span className="saom-requirement-dot">
        {ok && <IconCheck />}
      </span>

      {text}
    </div>
  );
}

export default Signup;