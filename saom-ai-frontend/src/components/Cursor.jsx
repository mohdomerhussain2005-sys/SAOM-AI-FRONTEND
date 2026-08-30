import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    let ringX = 0;
    let ringY = 0;

    const move = (e) => {
      gsap.set(dot, { x: e.clientX, y: e.clientY });
      ringX = e.clientX;
      ringY = e.clientY;
    };

    gsap.ticker.add(() => {
      gsap.set(ring, { x: ringX, y: ringY });
    });

    const onEnter = () => ring.classList.add("hovering");
    const onLeave = () => ring.classList.remove("hovering");

    window.addEventListener("mousemove", move);

    const interactive = document.querySelectorAll(
      "a, button, .floating-card, .pipeline__node"
    );
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}
