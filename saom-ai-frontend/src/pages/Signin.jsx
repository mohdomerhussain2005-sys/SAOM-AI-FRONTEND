import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      // Store authentication data
      const storage = rememberMe
        ? localStorage
        : sessionStorage;

      storage.setItem("saom_token", data.token);
      storage.setItem(
        "saom_user",
        JSON.stringify(data.user)
      );

      // Redirect to Dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.message || "Unable to sign in."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page">

      {/* LEFT BRANDING */}

      <div className="signin-brand">
        <div className="brand-icon">
          🛡
        </div>

        <h1>SAOM-AI</h1>

        <p>
          Next-generation cybersecurity orchestration
          powered by autonomous intelligence.
        </p>
      </div>

      {/* SIGN IN */}

      <div className="signin-container">

        <div className="signin-card">

          <div className="signin-header">
            <h2>Welcome back</h2>

            <p>
              Sign in to continue to your SAOM-AI
              workspace.
            </p>
          </div>

          <form onSubmit={handleSignin}>

            {/* EMAIL */}

            <div className="form-group">
              <label htmlFor="signin-email">
                EMAIL ADDRESS
              </label>

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

            {/* PASSWORD */}

            <div className="form-group">
              <label htmlFor="signin-password">
                PASSWORD
              </label>

              <input
                id="signin-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                autoComplete="current-password"
              />
            </div>

            {/* REMEMBER ME + FORGOT PASSWORD */}

            <div className="signin-options">

              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                />

                <span>Remember me</span>
              </label>

              <a href="/forgot-password">
                Forgot password?
              </a>

            </div>

            {/* ERROR */}

            {error && (
              <div className="signin-error">
                {error}
              </div>
            )}

            {/* BUTTON */}

            <button
              type="submit"
              className="signin-button"
              disabled={loading}
            >
              {loading
                ? "SIGNING IN..."
                : "SIGN IN"}

              {!loading && <span>→</span>}
            </button>

          </form>

          {/* SIGN UP */}

          <div className="signup-text">
            Don't have an account?{" "}

            <a href="/signup">
              Create one
            </a>
          </div>

        </div>

        <div className="copyright">
          © 2026 SAOM-AI SECURITY SYSTEMS
        </div>

      </div>

    </div>
  );
}

export default Signin;