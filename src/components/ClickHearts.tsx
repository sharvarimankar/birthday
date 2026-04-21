import { useEffect, useState } from "react";

interface Burst { id: number; x: number; y: number; tx: number; ty: number; }

export const ClickHearts = () => {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    let id = 0;
    const click = (e: MouseEvent) => {
      const newBursts = Array.from({ length: 6 }, () => ({
        id: id++,
        x: e.clientX,
        y: e.clientY,
        tx: (Math.random() - 0.5) * 200,
        ty: -100 - Math.random() * 150,
      }));
      setBursts((prev) => [...prev, ...newBursts]);
      setTimeout(() => {
        setBursts((prev) => prev.filter((b) => !newBursts.find((nb) => nb.id === b.id)));
      }, 1500);
    };
    window.addEventListener("click", click);
    return () => window.removeEventListener("click", click);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9996]">
      {bursts.map((b) => (
        <div
          key={b.id}
          className="absolute animate-heart-burst text-rose"
          style={{
            left: b.x,
            top: b.y,
            fontSize: "22px",
            ["--tx" as string]: `${b.tx}px`,
            ["--ty" as string]: `${b.ty}px`,
          }}
        >
          ♥
        </div>
      ))}
    </div>
  );
};
