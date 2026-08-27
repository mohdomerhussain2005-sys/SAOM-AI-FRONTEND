import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  // ==========================================
  // REGISTER
  // ==========================================

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

    if (!passwordValid) {
      setError(
        "Password must be at least 8 characters and contain uppercase, lowercase, and a number."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // 1. Create account
      const registerResponse = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: fullName,
            organization: organization,
            email: email,
            password: password,
          }),
        }
      );

      const registerData = await registerResponse.json();

      if (!registerResponse.ok) {
        throw new Error(
          registerData.message || "Unable to create account."
        );
      }

      // 2. Send OTP
      const otpResponse = await fetch(
        "http://localhost:5000/api/auth/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
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

  // ==========================================
  // VERIFY OTP + AUTOMATIC LOGIN
  // ==========================================

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

      // 1. Verify OTP
      const verifyResponse = await fetch(
        "http://localhost:5000/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            otp: otp,
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

      // 2. Automatically login after verification
      const loginResponse = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
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

      // 3. Store JWT + user information
      localStorage.setItem("saom_token", loginData.token);
      localStorage.setItem(
        "saom_user",
        JSON.stringify(loginData.user)
      );

      // 4. Send user directly to dashboard
      setTimeout(() => {
        window.location.href = "/home";
      }, 700);
    } catch (err) {
      setError(err.message || "Verification failed.");
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
                SIGN UP FORM
                ====================================== */}

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
                  duration: 0.25,
                }}
              >

                <div className="signin-header">
                  <h2>Create your account</h2>

                  <p>
                    Start securing your digital
                    environment with SAOM-AI.
                  </p>
                </div>

                <form onSubmit={handleRegister}>

                  {/* FULL NAME */}

                  <div className="form-group">
                    <label htmlFor="fullName">
                      FULL NAME
                    </label>

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

                  {/* ORGANIZATION */}

                  <div className="form-group">
                    <label htmlFor="organization">
                      ORGANIZATION
                    </label>

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

                  {/* EMAIL */}

                  <div className="form-group">
                    <label htmlFor="signup-email">
                      EMAIL ADDRESS
                    </label>

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

                  {/* PASSWORD */}

                  <div className="form-group">
                    <label htmlFor="signup-password">
                      PASSWORD
                    </label>

                    <div className="password-wrapper">

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
                        className="password-toggle"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                      >
                        {showPassword ? "◉" : "◌"}
                      </button>

                    </div>
                  </div>

                  {/* PASSWORD REQUIREMENTS */}

                  {password && (
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
                    <label htmlFor="confirm-password">
                      CONFIRM PASSWORD
                    </label>

                    <div className="password-wrapper">

                      <input
                        id="confirm-password"
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        placeholder="Confirm your password"
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

                  {/* ERROR */}

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

                  {/* MESSAGE */}

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

                  {/* CREATE ACCOUNT */}

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
                      ? "CREATING ACCOUNT..."
                      : "CREATE ACCOUNT"}

                    {!loading && <span>→</span>}
                  </motion.button>

                </form>

                {/* DIVIDER */}

                <div className="divider">
                  <span>OR</span>
                </div>

                {/* GOOGLE */}

                <button
                  type="button"
                  className="google-button"
                  onClick={() =>
                    alert(
                      "Google Sign Up will be connected next."
                    )
                  }
                >
                  <span className="google-icon">
                    G
                  </span>

                  Continue with Google
                </button>

                {/* SIGN IN */}

                <div className="signup-text">
                  Already have an account?{" "}

                  <a href="/signin">
                    Sign In
                  </a>
                </div>

              </motion.div>
            )}

            {/* ======================================
                OTP VERIFICATION
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
                transition={{
                  duration: 0.25,
                }}
              >

                <div className="signin-header">
                  <h2>Verify your email</h2>

                  <p>
                    Enter the 6-digit verification
                    code sent to:
                    <br />
                    <strong>{email}</strong>
                  </p>
                </div>

                <form onSubmit={handleVerifyOtp}>

                  <div className="form-group">
                    <label htmlFor="otp">
                      VERIFICATION CODE
                    </label>

                    <input
                      id="otp"
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
                      ? "VERIFYING..."
                      : "VERIFY EMAIL"}

                    {!loading && <span>→</span>}
                  </motion.button>

                </form>

                <div className="signup-text">
                  Wrong email?{" "}

                  <button
                    type="button"
                    className="text-button"
                    onClick={() => {
                      setStep("signup");
                      setError("");
                      setMessage("");
                      setOtp("");
                    }}
                  >
                    Go back
                  </button>
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

export default Signup;