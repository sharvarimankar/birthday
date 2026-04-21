import { useEffect, useState } from "react";

interface Heart { id: number; left: number; size: number; duration: number; delay: number; }

export const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const initial = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 12 + Math.random() * 18,
      duration: 8 + Math.random() * 10,
      delay: Math.random() * 8,
    }));
    setHearts(initial);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute bottom-0 text-primary/40"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animation: `float-up ${h.duration}s linear ${h.delay}s infinite`,
          }}
        >
          ♥
        </div>
      ))}
    </div>
  );
};
