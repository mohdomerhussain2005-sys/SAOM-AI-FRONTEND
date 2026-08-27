import { useState } from "react";
import { motion } from "framer-motion";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
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
        throw new Error(data.message || "Login failed.");
      }

      // Store the JWT returned by the backend
      if (rememberMe) {
        localStorage.setItem("saom_token", data.token);
        localStorage.setItem("saom_user", JSON.stringify(data.user));
      } else {
        sessionStorage.setItem("saom_token", data.token);
        sessionStorage.setItem("saom_user", JSON.stringify(data.user));
      }

      // Temporary redirect
      window.location.href = "/home";
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page">

      {/* LEFT SIDE */}
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

      {/* RIGHT SIDE */}
      <motion.div
        className="signin-container"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="signin-card">

          <div className="signin-header">
            <h2>Welcome back</h2>

            <p>
              Sign in to continue to your SAOM-AI workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* EMAIL */}
            <div className="form-group">
              <label htmlFor="email">
                EMAIL ADDRESS

              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            {/* PASSWORD */}
            <div className="form-group">

              <div className="password-label">
         

                <label htmlFor="password">
                  PASSWORD
                </label>

                <a href="/forgot-password">
                  Forgot password?
                </a>
              </div>

              <div className="password-wrapper">

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? "◉" : "◌"}
                </button>

              </div>
            </div>

            {/* REMEMBER ME */}
            <div className="remember-row">

              <label className="remember-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                />

                <span>Remember me</span>
              </label>

            </div>

            {/* ERROR */}
            {error && (
              <motion.div
                className="signin-error"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}

            {/* SIGN IN BUTTON */}
            <motion.button
              type="submit"
              className="signin-button"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? "SIGNING IN..." : "SIGN IN"}
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
            onClick={() => {
              alert("Google authentication will be connected later.");
            }}
          >
            <span className="google-icon">G</span>
            Continue with Google
          </button>

          {/* SIGN UP */}
          <div className="signup-text">
            Don't have an account?{" "}
            <a href="/signup">
              Sign Up
            </a>
          </div>

        </div>

        <div className="copyright">
          © 2026 SAOM-AI SECURITY SYSTEMS
        </div>

      </motion.div>

    </div>

  );
}

export default Signin;