import { useEffect, useRef, useState } from "react";

/**
 * A small dot that follows the pointer and expands when hovering
 * interactive elements marked with data-cursor="hover".
 * Automatically disables itself on touch / coarse-pointer devices.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;
    setEnabled(true);

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const rendered = { x: pos.x, y: pos.y };

    function onMove(e) {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const el = document.elementFromPoint(e.clientX, e.clientY);
      setHovering(!!el?.closest('[data-cursor="hover"]'));
    }

    let raf;
    function tick() {
      rendered.x += (pos.x - rendered.x) * 0.2;
      rendered.y += (pos.y - rendered.y) * 0.2;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${rendered.x}px, ${rendered.y}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      className={`custom-cursor ${hovering ? "custom-cursor--hover" : ""}`}
      aria-hidden="true"
    />
  );
}
