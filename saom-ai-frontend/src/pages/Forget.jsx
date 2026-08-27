import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Forget() {
  const [step, setStep] = useState("email");

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const passwordRequirements = {
    length: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
  };

  const passwordValid =
    passwordRequirements.length &&
    passwordRequirements.uppercase &&
    passwordRequirements.lowercase &&
    passwordRequirements.number;

  // ==========================================
  // STEP 1 — SEND RESET OTP
  // ==========================================

  const handleSendOtp = async (e) => {
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
          data.message || "Unable to send reset code."
        );
      }

      sessionStorage.setItem(
        "saom_reset_email",
        email
      );

      setMessage("Reset code sent to your email.");
      setStep("otp");
    } catch (err) {
      setError(
        err.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // STEP 2 — CHECK OTP LOCALLY
  // ==========================================

  const handleContinueToReset = (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (otp.length !== 6) {
      setError(
        "Please enter the 6-digit verification code."
      );
      return;
    }

    setStep("reset");
  };

  // ==========================================
  // STEP 3 — RESET PASSWORD
  // ==========================================

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!passwordValid) {
      setError(
        "Password must be at least 8 characters and contain uppercase, lowercase, and a number."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Password reset failed."
        );
      }

      setMessage(
        "Password reset successfully. Redirecting to Sign In..."
      );

      sessionStorage.removeItem(
        "saom_reset_email"
      );

      setTimeout(() => {
        window.location.href = "/signin";
      }, 1500);
    } catch (err) {
      setError(
        err.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page">

      {/* ==========================================
          LEFT BRANDING
          ========================================== */}

      <motion.div
        className="signin-brand"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="brand-icon">
          🛡
        </div>

        <h1>SAOM-AI</h1>

        <p>
          Next-generation cybersecurity orchestration
          powered by autonomous intelligence.
        </p>
      </motion.div>

      {/* ==========================================
          RIGHT SIDE
          ========================================== */}

      <motion.div
        className="signin-container"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.1,
        }}
      >
        <div className="signin-card">

          <AnimatePresence mode="wait">

            {/* ======================================
                STEP 1 — EMAIL
                ====================================== */}

            {step === "email" && (
              <motion.div
                key="email"
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
                <div className="signin-header">
                  <h2>Forgot Password?</h2>

                  <p>
                    Enter your email address and we'll
                    send you a verification code.
                  </p>
                </div>

                <form onSubmit={handleSendOtp}>

                  <div className="form-group">
                    <label htmlFor="forgot-email">
                      EMAIL ADDRESS
                    </label>

                    <input
                      id="forgot-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      autoComplete="email"
                    />
                  </div>

                  {error && (
                    <motion.div
                      className="signin-error"
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
                      className="signup-message"
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
                    className="signin-button"
                    disabled={loading}
                    whileHover={{
                      scale: loading ? 1 : 1.01,
                    }}
                    whileTap={{
                      scale: loading ? 1 : 0.98,
                    }}
                  >
                    {loading
                      ? "SENDING CODE..."
                      : "SEND RESET CODE"}

                    {!loading && <span>→</span>}
                  </motion.button>

                </form>

                <div className="signup-text">
                  Remember your password?{" "}

                  <a href="/signin">
                    Sign In
                  </a>
                </div>
              </motion.div>
            )}

            {/* ======================================
                STEP 2 — OTP
                ====================================== */}

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
                <div className="signin-header">
                  <h2>Verify your email</h2>

                  <p>
                    Enter the 6-digit reset code sent
                    to:
                    <br />
                    <strong>{email}</strong>
                  </p>
                </div>

                <form
                  onSubmit={handleContinueToReset}
                >
                  <div className="form-group">
                    <label htmlFor="reset-otp">
                      VERIFICATION CODE
                    </label>

                    <input
                      id="reset-otp"
                      type="text"
                      inputMode="numeric"
                      maxLength="6"
                      placeholder="Enter 6-digit code"
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

                  {error && (
                    <motion.div
                      className="signin-error"
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

                  <motion.button
                    type="submit"
                    className="signin-button"
                    whileHover={{
                      scale: 1.01,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                  >
                    CONTINUE
                    <span>→</span>
                  </motion.button>
                </form>

                <div className="signup-text">
                  Didn't enter the right email?{" "}

                  <button
                    type="button"
                    className="text-button"
                    onClick={() => {
                      setStep("email");
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

            {/* ======================================
                STEP 3 — NEW PASSWORD
                ====================================== */}

            {step === "reset" && (
              <motion.div
                key="reset"
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
                <div className="signin-header">
                  <h2>Reset Password</h2>

                  <p>
                    Create a new password for your
                    SAOM-AI account.
                  </p>
                </div>

                <form
                  onSubmit={handleResetPassword}
                >

                  {/* NEW PASSWORD */}

                  <div className="form-group">
                    <label htmlFor="new-password">
                      NEW PASSWORD
                    </label>

                    <div className="password-wrapper">

                      <input
                        id="new-password"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        placeholder="Create new password"
                        value={newPassword}
                        onChange={(e) =>
                          setNewPassword(
                            e.target.value
                          )
                        }
                        autoComplete="new-password"
                      />

                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          setShowPassword(
                            !showPassword
                          )
                        }
                      >
                        {showPassword
                          ? "◉"
                          : "◌"}
                      </button>

                    </div>
                  </div>

                  {/* PASSWORD REQUIREMENTS */}

                  {newPassword && (
                    <div className="password-requirements">

                      <div
                        className={
                          passwordRequirements.length
                            ? "requirement valid"
                            : "requirement"
                        }
                      >
                        {passwordRequirements.length
                          ? "✓"
                          : "○"}{" "}
                        8+ characters
                      </div>

                      <div
                        className={
                          passwordRequirements.uppercase
                            ? "requirement valid"
                            : "requirement"
                        }
                      >
                        {passwordRequirements.uppercase
                          ? "✓"
                          : "○"}{" "}
                        Uppercase letter
                      </div>

                      <div
                        className={
                          passwordRequirements.lowercase
                            ? "requirement valid"
                            : "requirement"
                        }
                      >
                        {passwordRequirements.lowercase
                          ? "✓"
                          : "○"}{" "}
                        Lowercase letter
                      </div>

                      <div
                        className={
                          passwordRequirements.number
                            ? "requirement valid"
                            : "requirement"
                        }
                      >
                        {passwordRequirements.number
                          ? "✓"
                          : "○"}{" "}
                        Number
                      </div>

                    </div>
                  )}

                  {/* CONFIRM PASSWORD */}

                  <div className="form-group">
                    <label htmlFor="confirm-new-password">
                      CONFIRM PASSWORD
                    </label>

                    <div className="password-wrapper">

                      <input
                        id="confirm-new-password"
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        placeholder="Confirm new password"
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
                        className="password-toggle"
                        onClick={() =>
                          setShowConfirmPassword(
                            !showConfirmPassword
                          )
                        }
                      >
                        {showConfirmPassword
                          ? "◉"
                          : "◌"}
                      </button>

                    </div>
                  </div>

                  {error && (
                    <motion.div
                      className="signin-error"
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
                      className="signup-message"
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
                    className="signin-button"
                    disabled={loading}
                    whileHover={{
                      scale: loading ? 1 : 1.01,
                    }}
                    whileTap={{
                      scale: loading ? 1 : 0.98,
                    }}
                  >
                    {loading
                      ? "RESETTING..."
                      : "RESET PASSWORD"}

                    {!loading && <span>→</span>}
                  </motion.button>

                </form>

                <div className="signup-text">
                  Remember your password?{" "}

                  <a href="/signin">
                    Sign In
                  </a>
                </div>

              </motion.div>
            )}

          </AnimatePresence>

        </div>

        <div className="copyright">
          © 2026 SAOM-AI SECURITY SYSTEMS
        </div>

      </motion.div>

    </div>
  );
}

export default Forget;