import { Link } from "react-router-dom";

function ResetPassword() {
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
            SECURE RECOVERY
          </span>

          <h1>
            Protect it.
            <br />
            <strong>Again.</strong>
          </h1>

          <p>
            Choose a new password to secure your
            SAOM-AI workspace and get back to work.
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
              Create a new password
            </h2>

            <p>
              Choose a strong password for your account.
            </p>

          </div>


          <form>

            {/* NEW PASSWORD */}

            <div className="auth-field">

              <label htmlFor="new-password">
                NEW PASSWORD
              </label>

              <input
                id="new-password"
                type="password"
                placeholder="Create a new password"
              />

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="auth-field">

              <label htmlFor="confirm-new-password">
                CONFIRM PASSWORD
              </label>

              <input
                id="confirm-new-password"
                type="password"
                placeholder="Repeat your new password"
              />

            </div>


            <button
              type="submit"
              className="auth-submit"
            >
              Reset Password
              <span>→</span>
            </button>

          </form>


          <p className="auth-switch">

            Remember your password?

            <Link to="/signin">
              Sign in
            </Link>

          </p>


          <p className="auth-legal">
            Your new password will be used to protect
            your SAOM-AI security workspace.
          </p>

        </div>

      </section>

    </main>
  );
}

export default ResetPassword;