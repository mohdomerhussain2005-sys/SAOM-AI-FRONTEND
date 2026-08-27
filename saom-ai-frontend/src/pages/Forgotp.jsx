import { Link } from "react-router-dom";

function Forgotp() {
  return (
    <main className="auth-page">

      {/* LEFT SIDE */}

      <section className="auth-visual">

        <Link to="/" className="auth-logo">
          <span className="auth-logo-mark">S</span>
          <span>SAOM-AI</span>
        </Link>

        <div className="auth-message">

          <span className="auth-eyebrow">
            ACCOUNT RECOVERY
          </span>

          <h1>
            Access
            <br />
            <strong>restored.</strong>
          </h1>

          <p>
            A secure account starts with secure
            recovery. We'll help you get back
            into your workspace.
          </p>

        </div>

      </section>


      {/* RIGHT SIDE */}

      <section className="auth-form-section">

        <div className="auth-form-container">

          <div className="auth-form-heading">

            <span className="auth-mobile-eyebrow">
              SAOM-AI
            </span>

            <h2>
              Forgot your password?
            </h2>

            <p>
              Enter your work email and we'll send
              you a secure reset link.
            </p>

          </div>


          <form>

            <div className="auth-field">

              <label htmlFor="forgot-email">
                WORK EMAIL
              </label>

              <input
                id="forgot-email"
                type="email"
                placeholder="you@company.com"
              />

            </div>


            <button
              type="submit"
              className="auth-submit"
            >
              Send Reset Link
              <span>→</span>
            </button>

          </form>


          <div className="auth-divider">
            <span>OR</span>
          </div>


          <p className="auth-switch">

            Remember your password?

            <Link to="/signin">
              Sign in
            </Link>

          </p>


          <p className="auth-legal">
            Your account security matters.
            SAOM-AI keeps recovery protected.
          </p>

        </div>

      </section>

    </main>
  );
}

export default Forgotp;