import { Link } from "react-router-dom";

function GoogleIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.35 12.23c0-.68-.06-1.35-.18-1.98H12v3.75h5.24a4.48 4.48 0 0 1-1.94 2.94v2.44h3.14c1.84-1.69 2.91-4.18 2.91-7.15Z"
      />
      <path
        fill="#34A853"
        d="M12 21.72c2.63 0 4.84-.87 6.45-2.34l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.29v2.52A9.74 9.74 0 0 0 12 21.72Z"
      />
      <path
        fill="#FBBC05"
        d="M6.53 13.83A5.86 5.86 0 0 1 6.22 12c0-.64.11-1.26.31-1.83V7.65H3.29A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.06 1.04 4.35l3.24-2.52Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.14c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.24 14.63 2.28 12 2.28a9.74 9.74 0 0 0-8.71 5.37l3.24 2.52C6.3 7.86 8.46 6.14 12 6.14Z"
      />
    </svg>
  );
}

function Signup() {
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
            SECURE YOUR WORKSPACE
          </span>

          <h1>
            Build your
            <br />
            <strong>defense.</strong>
          </h1>

          <p>
            Create your security workspace and
            start building a safer digital environment.
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

            <h2>Create your account</h2>

            <p>
              Start your security journey with SAOM-AI.
            </p>

          </div>


          <form>

            {/* FULL NAME */}

            <div className="auth-field">

              <label htmlFor="name">
                FULL NAME
              </label>

              <input
                id="name"
                type="text"
                placeholder="Your name"
              />

            </div>


            {/* EMAIL */}

            <div className="auth-field">

              <label htmlFor="signup-email">
                WORK EMAIL
              </label>

              <input
                id="signup-email"
                type="email"
                placeholder="you@company.com"
              />

            </div>


            {/* PASSWORD */}

            <div className="auth-field">

              <label htmlFor="signup-password">
                PASSWORD
              </label>

              <input
                id="signup-password"
                type="password"
                placeholder="Create a password"
              />

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="auth-field">

              <label htmlFor="confirm-password">
                CONFIRM PASSWORD
              </label>

              <input
                id="confirm-password"
                type="password"
                placeholder="Repeat your password"
              />

            </div>


            {/* CREATE ACCOUNT */}

            <button
              type="submit"
              className="auth-submit"
            >
              Create Account
              <span>→</span>
            </button>

          </form>


          {/* DIVIDER */}

          <div className="auth-divider">
            <span>OR</span>
          </div>


          {/* GOOGLE — LAST */}

          <button className="google-button">

            <GoogleIcon />

            <span>Continue with Google</span>

          </button>


          {/* SIGN IN */}

          <p className="auth-switch">

            Already have an account?

            <Link to="/signin">
              Sign in
            </Link>

          </p>


          <p className="auth-legal">
            By creating an account, you agree to SAOM-AI's
            Terms of Service and Privacy Policy.
          </p>

        </div>

      </section>

    </main>
  );
}

export default Signup;