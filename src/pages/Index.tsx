import { useEffect, useRef, useState } from "react";
import { Heart, Sparkles, Mail, ChevronDown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CursorSparkle } from "@/components/CursorSparkle";
import { FloatingHearts } from "@/components/FloatingHearts";
import { ClickHearts } from "@/components/ClickHearts";
import { GuideCharacter } from "@/components/GuideCharacter";
import animeBg from "@/assets/anime-night-bg.jpg";
import paperBg from "@/assets/paper-bg.jpg";
import { memories } from "@/data/memories";
import { letter } from "@/data/letter";

const reasons = [
  "The way you make me feel safe",
  "Your smile… it's my favorite thing",
  "How you listen, even to my silences",
  "The way you say my name",
  "You make ordinary days feel like magic",
  "Your hands always feel like home",
  "You love me even on my hardest days",
  "You make me believe in forever",
];

// One flowing paragraph for "How It All Started"
const storyParagraph =
  "Remember the day we first talked in Dharme Sir's Parking — did uh ever thought we would come this far? Oh my God what a journey… our first meet in amt, all those all-night chats, caring for each other in the smallest ways. Each memory is stored in my heart and can never be deleted. From competing with each other to thinking only of what's best for each other — a longggggg journey, Enu. 🌷";

// Spin-the-wheel love messages
const wheelMessages = [
  "You're my favorite notification 💙",
  "I'd choose you in every universe 🌌",
  "Your hugs > everything else ⚡",
  "You make my heart do anime flips 💫",
  "I love you more than yesterday 🌙",
  "You + Me = main characters 🎬",
  "You're literally my plot twist 💌",
  "Forever isn't long enough with you ✨",
];

const Index = () => {
  const [started, setStarted] = useState(false);
  const [revealedReasons, setRevealedReasons] = useState<number[]>([]);
  const [revealedMemories, setRevealedMemories] = useState<number[]>([]);
  const [openMemory, setOpenMemory] = useState<number | null>(null);
  const [showLetter, setShowLetter] = useState(false);
  const [letterText, setLetterText] = useState("");
  const [wheelRotation, setWheelRotation] = useState(0);
  const [wheelResult, setWheelResult] = useState<number | null>(null);
  const [spinning, setSpinning] = useState(false);

  // Section refs for step-by-step scroll navigation
  const journeyRef = useRef<HTMLDivElement>(null);
  const memoriesRef = useRef<HTMLDivElement>(null);
  const reasonsRef = useRef<HTMLDivElement>(null);
  const secretRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    // Show full letter immediately so nothing gets cut off in any viewport.
    setShowLetter(true);
    setLetterText(letter);
  }, []);

  const begin = () => {
    setStarted(true);
    setTimeout(() => journeyRef.current?.scrollIntoView({ behavior: "smooth" }), 600);
  };

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setWheelResult(null);
    const segment = 360 / wheelMessages.length;
    const winner = Math.floor(Math.random() * wheelMessages.length);
    const fullSpins = 5 + Math.floor(Math.random() * 3);
    const targetMod = 360 - winner * segment - segment / 2;
    const currentMod = ((wheelRotation % 360) + 360) % 360;
    const delta = fullSpins * 360 + ((targetMod - currentMod + 360) % 360);
    setWheelRotation((prev) => prev + delta);
    setTimeout(() => {
      setWheelResult(winner);
      setSpinning(false);
    }, 4200);
  };

  return (
    <div className="relative min-h-screen bg-dreamy text-foreground">
      <CursorSparkle />
      <ClickHearts />
      <FloatingHearts />

      {/* === ENTRY === */}
      <section className={`relative flex ${started ? "min-h-[40vh] py-16" : "min-h-screen"} items-center justify-center px-4 text-center overflow-hidden`}>
        <div
          className="absolute inset-0 opacity-90"
          style={{ backgroundImage: `url(${animeBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night/60 via-transparent to-night/80" />

        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-cyan animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              boxShadow: `0 0 ${6 + Math.random() * 10}px hsl(var(--cyan))`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}

        {!started ? (
          <div className="relative z-10 animate-fade-in-slow space-y-10">
            <div className="space-y-4">
              <p className="font-hand text-xl md:text-2xl lg:text-3xl text-cyan animate-fade-up delay-300">a little world, just for you</p>
              <h1 className="font-script text-5xl md:text-7xl lg:text-8xl text-glow text-foreground animate-fade-up delay-500 leading-tight">
                Happy Birthday,
              </h1>
              <h1 className="font-script text-6xl md:text-8xl lg:text-9xl text-glow text-aurora animate-aurora animate-fade-up delay-700 leading-tight">
                Enuu
              </h1>
            </div>
            <GuideCharacter message="psst… I made something special just for you 🌟" />
            <p className="font-serif-it text-lg md:text-2xl lg:text-3xl text-muted-foreground max-w-2xl mx-auto animate-fade-up delay-1000">
              this is a little world I made just for you ✨
            </p>
            <div className="animate-fade-up delay-1000 pt-4">
              <Button
                onClick={begin}
                size="lg"
                className="bg-romantic text-primary-foreground font-script text-2xl md:text-3xl lg:text-4xl px-12 md:px-16 py-7 md:py-9 rounded-full shadow-glow animate-glow-pulse hover:scale-105 transition-transform"
              >
                <Sparkles className="mr-2 h-5 w-5 md:h-7 md:w-7" />
                Begin the Journey
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative z-10 flex flex-col items-center gap-6 animate-fade-in-slow">
            <GuideCharacter message="Yay! Let's go on this journey together 💫" />
            <ChevronDown className="h-8 w-8 text-cyan animate-bounce mt-8" />
          </div>
        )}
      </section>

      {started && (
        <>
          {/* === CHAPTER ONE — HOW IT ALL STARTED === */}
          <section ref={journeyRef} className="relative flex items-center justify-center py-24 px-6">
            <div className="w-full max-w-7xl 2xl:max-w-[1600px] mx-auto space-y-12">
              <div className="text-center space-y-4 animate-fade-up">
                <p className="font-hand text-xl md:text-2xl xl:text-3xl text-cyan">chapter one</p>
                <h2 className="font-script text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-aurora animate-aurora leading-tight">
                  How It All Started
                </h2>
              </div>

              <GuideCharacter message="These moments… they're not just memories, they're pieces of love 💌" />

              <div className="relative animate-fade-up">
                <div className="relative glass rounded-3xl p-8 md:p-16 xl:p-20 shadow-dreamy border border-cyan/20">
                  <p className="font-serif-it text-base md:text-xl lg:text-2xl text-foreground leading-relaxed first-letter:font-script first-letter:text-5xl md:first-letter:text-7xl first-letter:text-gold first-letter:mr-2 first-letter:float-left first-letter:leading-none">
                    {storyParagraph}
                  </p>
                </div>
              </div>

              <div className="flex justify-center pt-4 animate-fade-up">
                <Button
                  onClick={() => scrollTo(memoriesRef)}
                  variant="ghost"
                  size="lg"
                  className="font-hand text-xl md:text-2xl text-cyan hover:text-gold hover:bg-transparent group"
                >
                  next chapter
                  <ChevronDown className="ml-2 h-6 w-6 group-hover:translate-y-1 transition-transform" />
                </Button>
              </div>
            </div>
          </section>

          {/* === CHAPTER TWO — MEMORIES === */}
          <section
            ref={memoriesRef}
            className="relative flex items-center justify-center py-24 px-6 bg-gradient-to-b from-transparent via-indigo/30 to-transparent"
          >
            <div className="w-full max-w-7xl 2xl:max-w-[1700px] mx-auto space-y-12">
              <div className="text-center space-y-4 animate-fade-up">
                <p className="font-hand text-xl md:text-2xl xl:text-3xl text-cyan">chapter two</p>
                <h2 className="font-script text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-aurora animate-aurora leading-tight">
                  Our Memories
                </h2>
                <p className="font-serif-it text-base md:text-xl xl:text-2xl text-muted-foreground">moments frozen in time</p>
              </div>

              <GuideCharacter message="She made this just for you… so don't rush, okay? 🌸" position="right" />

              <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8 xl:gap-10">
                {memories.map((m, i) => {
                  const isRevealed = revealedMemories.includes(i);
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        if (!isRevealed) {
                          setRevealedMemories((p) => [...p, i]);
                        } else {
                          setOpenMemory(openMemory === i ? null : i);
                        }
                      }}
                      className="group relative aspect-square overflow-hidden rounded-3xl shadow-soft hover:shadow-dreamy transition-all duration-500 hover:-translate-y-2 animate-fade-up border border-cyan/20"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      {isRevealed ? (
                        <>
                          {m.image ? (
                            <img
                              src={m.image}
                              alt={m.caption}
                              loading="lazy"
                              className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          ) : (
                            <>
                              <div className="absolute inset-0 bg-gradient-to-br from-indigo via-violet to-night" />
                              <div className="absolute inset-0 flex items-center justify-center text-8xl xl:text-9xl group-hover:scale-110 transition-transform duration-700">
                                {m.emoji}
                              </div>
                            </>
                          )}
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/95 via-night/60 to-transparent p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                            <p className="font-hand text-xl md:text-2xl xl:text-3xl text-cream">{m.caption}</p>
                            {m.date && <p className="font-serif-it text-sm xl:text-base text-cyan/80">{m.date}</p>}
                          </div>
                          <div className="absolute top-3 right-3 text-cream/90 text-base font-hand opacity-0 group-hover:opacity-100 transition-opacity">
                            view 🔍
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-indigo via-violet to-night" />
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-primary-foreground p-4">
                            <span className="text-5xl xl:text-6xl animate-float-soft">{m.emoji || "📸"}</span>
                            <p className="font-hand text-base md:text-xl xl:text-2xl text-cream/90 text-center">{m.caption}</p>
                            <span className="font-hand text-sm md:text-base text-cyan animate-pulse mt-1">tap to reveal ✨</span>
                          </div>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>

              {openMemory !== null && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-night/80 backdrop-blur-md p-4 animate-fade-in-slow"
                  onClick={() => setOpenMemory(null)}
                >
                  <div className="bg-card rounded-3xl p-6 max-w-lg w-full text-center shadow-dreamy animate-fade-up border border-cyan/30">
                    {memories[openMemory].image ? (
                      <img
                        src={memories[openMemory].image}
                        alt={memories[openMemory].caption}
                        className="w-full max-h-[60vh] object-contain rounded-2xl mb-4"
                      />
                    ) : (
                      <div className="text-8xl mb-4">{memories[openMemory].emoji}</div>
                    )}
                    <p className="font-script text-3xl text-foreground">{memories[openMemory].caption}</p>
                    <p className="font-hand text-lg text-cyan mt-3">— forever in my heart</p>
                  </div>
                </div>
              )}

              <div className="flex justify-center pt-4 animate-fade-up">
                <Button
                  onClick={() => scrollTo(reasonsRef)}
                  variant="ghost"
                  size="lg"
                  className="font-hand text-xl md:text-2xl text-cyan hover:text-gold hover:bg-transparent group"
                >
                  next chapter
                  <ChevronDown className="ml-2 h-6 w-6 group-hover:translate-y-1 transition-transform" />
                </Button>
              </div>
            </div>
          </section>

          {/* === CHAPTER THREE — WHY I LOVE YOU === */}
          <section ref={reasonsRef} className="relative flex items-center justify-center py-24 px-6">
            <div className="w-full max-w-7xl 2xl:max-w-[1600px] mx-auto space-y-12">
              <div className="text-center space-y-4 animate-fade-up">
                <p className="font-hand text-xl md:text-2xl xl:text-3xl text-cyan">chapter three</p>
                <h2 className="font-script text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-aurora animate-aurora leading-tight">
                  Why I Love You
                </h2>
                <p className="font-serif-it text-base md:text-xl xl:text-2xl text-muted-foreground">tap each note to unfold a little reason</p>
              </div>

              <GuideCharacter message="Some feelings are too big for words… but she tried anyway ⚡" />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7 xl:gap-8">
                {reasons.map((r, i) => {
                  const opened = revealedReasons.includes(i);
                  const rotations = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];
                  return (
                    <button
                      key={i}
                      onClick={() => !opened && setRevealedReasons((p) => [...p, i])}
                      className={`relative aspect-square rounded-2xl p-5 xl:p-7 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-dreamy animate-float-soft border ${rotations[i % 4]} ${
                        opened ? "bg-card border-gold/40" : "bg-romantic border-cyan/30"
                      }`}
                      style={{ animationDelay: `${i * 0.3}s` }}
                    >
                      {opened ? (
                        <p className="font-hand text-lg md:text-2xl xl:text-3xl text-foreground animate-fade-up leading-snug">
                          {r}
                        </p>
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-3 text-primary-foreground">
                          <Heart className="h-10 w-10 xl:h-14 xl:w-14 fill-current" />
                          <span className="font-hand text-base md:text-xl xl:text-2xl">open me</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-center pt-4 animate-fade-up">
                <Button
                  onClick={() => scrollTo(secretRef)}
                  variant="ghost"
                  size="lg"
                  className="font-hand text-xl md:text-2xl text-cyan hover:text-gold hover:bg-transparent group"
                >
                  next chapter
                  <ChevronDown className="ml-2 h-6 w-6 group-hover:translate-y-1 transition-transform" />
                </Button>
              </div>
            </div>
          </section>

          {/* === CHAPTER FOUR — SPIN THE WHEEL === */}
          <section
            ref={secretRef}
            className="relative flex items-center justify-center py-24 px-6 bg-gradient-to-b from-transparent via-violet/20 to-transparent overflow-hidden"
          >
            <div className="w-full max-w-5xl 2xl:max-w-6xl mx-auto text-center space-y-10">
              <div className="space-y-4 animate-fade-up">
                <p className="font-hand text-xl md:text-2xl xl:text-3xl text-cyan">chapter four</p>
                <h2 className="font-script text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-aurora animate-aurora leading-tight">
                  A Little Secret
                </h2>
                <p className="font-serif-it text-base md:text-xl xl:text-2xl text-muted-foreground">spin the wheel… let fate pick a love note for you ⚡</p>
              </div>

              <div className="relative mx-auto w-[280px] h-[280px] md:w-[460px] md:h-[460px] xl:w-[560px] xl:h-[560px]">
                <div className="absolute inset-0 rounded-full bg-cyan/20 blur-3xl animate-glow-pulse" />

                {/* pointer */}
                <div className="absolute left-1/2 -top-3 -translate-x-1/2 z-20">
                  <div className="w-0 h-0 border-l-[14px] border-r-[14px] border-t-[24px] border-l-transparent border-r-transparent border-t-gold drop-shadow-[0_0_10px_hsl(var(--gold))]" />
                </div>

                {/* wheel */}
                <div
                  className="relative w-full h-full rounded-full border-4 border-gold/60 shadow-glow overflow-hidden"
                  style={{
                    transform: `rotate(${wheelRotation}deg)`,
                    transition: spinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.21, 0.99)" : "none",
                    background: `conic-gradient(${wheelMessages
                      .map((_, i) => {
                        const colors = [
                          "hsl(215 95% 55%)",
                          "hsl(265 70% 55%)",
                          "hsl(190 95% 55%)",
                          "hsl(42 95% 60%)",
                          "hsl(245 60% 40%)",
                          "hsl(280 75% 50%)",
                          "hsl(200 95% 60%)",
                          "hsl(350 80% 55%)",
                        ];
                        const seg = 360 / wheelMessages.length;
                        return `${colors[i]} ${i * seg}deg ${(i + 1) * seg}deg`;
                      })
                      .join(", ")})`,
                  }}
                >
                  {wheelMessages.map((_, i) => {
                    const seg = 360 / wheelMessages.length;
                    const angle = i * seg + seg / 2;
                    return (
                      <div
                        key={i}
                        className="absolute top-1/2 left-1/2 origin-left"
                        style={{ transform: `rotate(${angle}deg) translateX(20px)` }}
                      >
                        <Heart className="h-4 w-4 fill-cream text-cream" />
                      </div>
                    );
                  })}
                </div>

                {/* center button */}
                <button
                  onClick={spinWheel}
                  disabled={spinning}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-24 h-24 md:w-32 md:h-32 xl:w-40 xl:h-40 rounded-full bg-gold-grad shadow-glow border-4 border-cream/80 font-script text-2xl md:text-3xl xl:text-4xl text-night hover:scale-110 transition-transform disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {spinning ? <Zap className="h-8 w-8 xl:h-12 xl:w-12 animate-spin" /> : "SPIN"}
                </button>
              </div>

              <div className="min-h-[140px] flex flex-col items-center justify-center gap-4">
                {wheelResult !== null && !spinning && (
                  <div className="glass border border-gold/40 rounded-3xl px-10 py-7 shadow-dreamy animate-fade-up max-w-3xl space-y-4">
                    <p className="font-script text-3xl md:text-5xl xl:text-6xl text-aurora animate-aurora">
                      {wheelMessages[wheelResult]}
                    </p>
                    <p className="font-hand text-xl md:text-3xl xl:text-4xl text-gold">
                      You're my safe place… my chaos… my everything 💫
                    </p>
                  </div>
                )}
                {wheelResult === null && !spinning && (
                  <p className="font-hand text-xl md:text-2xl xl:text-3xl text-cream/80">tap SPIN to reveal a secret 💌</p>
                )}
              </div>

              <div className="flex justify-center pt-2 animate-fade-up">
                <Button
                  onClick={() => scrollTo(letterRef)}
                  variant="ghost"
                  size="lg"
                  className="font-hand text-xl md:text-2xl text-cyan hover:text-gold hover:bg-transparent group"
                >
                  next chapter
                  <ChevronDown className="ml-2 h-6 w-6 group-hover:translate-y-1 transition-transform" />
                </Button>
              </div>
            </div>
          </section>

          {/* === CHAPTER FIVE — LOVE LETTER === */}
          <section ref={letterRef} id="letter-section" className="relative flex items-center justify-center py-24 px-6">
            <div className="w-full max-w-5xl 2xl:max-w-6xl mx-auto space-y-10">
              <div className="text-center space-y-4 animate-fade-up">
                <p className="font-hand text-xl md:text-2xl xl:text-3xl text-cyan">chapter five</p>
                <h2 className="font-script text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-aurora animate-aurora leading-tight">
                  A Letter For You
                </h2>
                <Mail className="h-8 w-8 xl:h-10 xl:w-10 text-gold mx-auto animate-float-soft" />
              </div>

              <div
                className="relative rounded-3xl p-8 md:p-16 xl:p-20 shadow-letter animate-fade-up border border-gold/30"
                style={{
                  backgroundImage: `url(${paperBg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 rounded-3xl bg-cream/80" />
                <div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_80px_hsl(var(--gold)/0.4)] pointer-events-none" />
                <div className="relative">
                  <p className="font-hand text-base md:text-xl xl:text-2xl text-night leading-relaxed whitespace-pre-line">
                    {letterText}
                    {letterText.length < letter.length && <span className="animate-pulse">|</span>}
                  </p>
                  {letterText.length >= letter.length && (
                    <p className="font-script text-2xl md:text-3xl xl:text-4xl text-crimson mt-8 animate-fade-up text-right">
                      — yours, always 🌹
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-center pt-2 animate-fade-up">
                <Button
                  onClick={() => scrollTo(finalRef)}
                  variant="ghost"
                  size="lg"
                  className="font-hand text-xl md:text-2xl text-cyan hover:text-gold hover:bg-transparent group"
                >
                  one last thing
                  <ChevronDown className="ml-2 h-6 w-6 group-hover:translate-y-1 transition-transform" />
                </Button>
              </div>
            </div>
          </section>

          {/* === FINAL === */}
          <section ref={finalRef} className="relative flex items-center justify-center py-28 px-6 text-center">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet/30 to-indigo/40" />
            <div className="relative w-full max-w-6xl 2xl:max-w-[1500px] mx-auto space-y-12">
              <GuideCharacter message="Thank you for walking through this with me… 🌷" />

              <div className="space-y-8 animate-fade-up">
                <p className="font-script text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground text-glow leading-tight">
                  No matter what…
                  <br />
                  I'll always choose you
                </p>
                <p className="font-script text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-aurora animate-aurora leading-tight">
                  Happy Birthday, my love ❤️
                </p>
                <div className="flex justify-center gap-3 pt-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Heart key={i} className="h-10 w-10 md:h-14 md:w-14 xl:h-16 xl:w-16 fill-crimson text-crimson animate-float-soft" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Index;
