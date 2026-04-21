import { useEffect, useState } from "react";
import character from "@/assets/anime-guide.png";

interface Props {
  message: string;
  position?: "left" | "right";
}

export const GuideCharacter = ({ message, position = "left" }: Props) => {
  const [displayed, setDisplayed] = useState("");
  const [key, setKey] = useState(0);

  useEffect(() => {
    setDisplayed("");
    setKey((k) => k + 1);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(message.slice(0, i));
      if (i >= message.length) clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, [message]);

  const isLeft = position === "left";

  return (
    <div
      key={key}
      className={`flex items-end gap-4 animate-fade-up ${isLeft ? "" : "flex-row-reverse"}`}
    >
      <div className="relative flex-shrink-0">
        <img
          src={character}
          alt="Your anime guide"
          className="relative h-32 w-32 md:h-40 md:w-40 animate-float-soft drop-shadow-[0_0_25px_hsl(var(--cyan)/0.6)]"
        />
      </div>
      <div className={`relative max-w-xs md:max-w-md glass rounded-3xl px-6 py-4 shadow-soft border border-cyan/30 ${isLeft ? "rounded-bl-sm" : "rounded-br-sm"}`}>
        <p className="font-hand text-xl md:text-2xl text-foreground leading-snug">
          {displayed}
          <span className="animate-pulse text-cyan">|</span>
        </p>
      </div>
    </div>
  );
};
