 import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">

      {/* LOGO */}
      <Link to="/" className="nav-brand">

        <span className="brand-symbol">
          S
        </span>

        <span className="brand-name">
          SAOM-AI
        </span>

        <span className="brand-tagline">
          Autonomous Security
          <span>·</span>
          AI Defense
        </span>

      </Link>


      {/* NAVIGATION */}
      <nav className="nav-links">

        <a href="/#home">
          Home
        </a>

        <a href="/#intelligence">
          Intelligence
        </a>

        <a href="/#features">
          Features
        </a>

        <a href="/#technology">
          Technology
        </a>

        <a href="/#about">
          About
        </a>

      </nav>


      {/* ACTIONS */}
      <div className="nav-actions">

        <Link
          to="/signin"
          className="nav-signin"
        >
          Sign In
        </Link>

        <Link
          to="/signup"
          className="nav-cta"
        >
          Get Started
          <span>→</span>
        </Link>

      </div>


      {/* MOBILE MENU */}
      <button
        className="mobile-menu"
        aria-label="Open menu"
      >
        ☰
      </button>

    </header>
  );
}