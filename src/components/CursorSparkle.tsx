import { useEffect, useState } from "react";

interface Sparkle { id: number; x: number; y: number; }

export const CursorSparkle = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    let id = 0;
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (Math.random() > 0.7) {
        const s = { id: id++, x: e.clientX + (Math.random() - 0.5) * 20, y: e.clientY + (Math.random() - 0.5) * 20 };
        setSparkles((prev) => [...prev.slice(-15), s]);
        setTimeout(() => setSparkles((prev) => prev.filter((sp) => sp.id !== s.id)), 800);
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed z-[9999] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-romantic shadow-glow transition-transform duration-100 mix-blend-multiply"
        style={{ left: pos.x, top: pos.y }}
      />
      <div
        className="pointer-events-none fixed z-[9998] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40 transition-all duration-300"
        style={{ left: pos.x, top: pos.y }}
      />
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="pointer-events-none fixed z-[9997] text-gold animate-sparkle"
          style={{ left: s.x, top: s.y, fontSize: "14px" }}
        >
          ✦
        </div>
      ))}
    </>
  );
};
