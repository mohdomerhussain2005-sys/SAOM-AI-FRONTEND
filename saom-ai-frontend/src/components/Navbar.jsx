import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "Intelligence", href: "/#intelligence" },
  { label: "Features", href: "/#features" },
  { label: "Technology", href: "/#technology" },
  { label: "About", href: "/#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route/hash change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const activeHash = location.hash || "#home";

  return (
    <motion.header
      className={`navbar-float ${scrolled ? "navbar-scrolled" : ""}`}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="navbar-inner">
        {/* LOGO */}
        <Link to="/" className="nav-brand">
          <span className="brand-symbol">S</span>
          <span className="brand-name">SAOM-AI</span>
          <span className="brand-tagline">
            Autonomous Security
            <span>·</span>
            AI Defense
          </span>
        </Link>

        {/* NAVIGATION */}
        <nav className="nav-links" onMouseLeave={() => setHovered(null)}>
          {NAV_LINKS.map((link) => {
            const isActive = activeHash === link.href.replace("/", "");
            const isHighlighted = hovered === link.href || (!hovered && isActive);

            return (
              <a
                key={link.href}
                href={link.href}
                className={isActive ? "nav-active" : ""}
                onMouseEnter={() => setHovered(link.href)}
              >
                {link.label}
                {isHighlighted && (
                  <motion.span
                    layoutId="nav-underline"
                    className="nav-underline"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* ACTIONS */}
        <div className="nav-actions">
          <Link to="/signin" className="nav-signin">
            Sign In
          </Link>

          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}>
            <Link to="/signup" className="nav-cta">
              Sign Up
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                style={{ display: "flex" }}
              >
                <X size={22} />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                style={{ display: "flex" }}
              >
                <Menu size={22} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* MOBILE PANEL */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mobile-panel-inner">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.25 }}
                >
                  {link.label}
                </motion.a>
              ))}

              <div className="mobile-panel-actions">
                <Link to="/signin" className="nav-signin">
                  Sign In
                </Link>
                <Link to="/signup" className="nav-cta">
                  Sign Up <span>→</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}