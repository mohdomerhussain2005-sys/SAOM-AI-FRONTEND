import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { navLinks } from "../data/landingData";
gsap.registerPlugin(ScrollTrigger);

const EASE = [0.16, 1, 0.3, 1];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState(navLinks[0].label);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 40,
      end: 99999,
      onUpdate: (self) => setIsScrolled(self.scroll() > 40),
    });
    return () => trigger.kill();
  }, []);

  return (
    <>
      <motion.div
        className="saom-nav-wrap"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
      >
        <nav className={`saom-nav${isScrolled ? " is-scrolled" : ""}`} aria-label="Primary">
          <a href="#top" className="saom-nav-brand">
            <span className="saom-nav-mark">S</span>
            SAOM-AI
          </a>

          <ul className="saom-nav-links">
            {navLinks.map((link) => (
              <li key={link.label} style={{ position: "relative" }}>
                <a
                  href={link.href}
                  className={`saom-nav-link${active === link.label ? " is-active" : ""}`}
                  data-cursor="interactive"
                  onClick={() => setActive(link.label)}
                >
                  {active === link.label && (
                    <motion.span className="saom-nav-pill" layoutId="saom-nav-pill" transition={{ duration: 0.32, ease: EASE }} />
                  )}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a href="#contact" className="saom-nav-cta" data-cursor="interactive">
            Request Access
            <ArrowUpRight size={14} />
          </a>

          <button
            type="button"
            className="saom-nav-toggle"
            data-cursor="interactive"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </nav>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="saom-mobile-sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className={`saom-mobile-link${active === link.label ? " is-active" : ""}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.4, ease: EASE }}
                onClick={() => {
                  setActive(link.label);
                  setMenuOpen(false);
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              className="saom-btn saom-btn-primary"
              style={{ marginTop: 24, alignSelf: "flex-start" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4, ease: EASE }}
              onClick={() => setMenuOpen(false)}
            >
              Request Access
              <ArrowUpRight size={15} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
