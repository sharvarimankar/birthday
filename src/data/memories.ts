// ============================================================
// 📸 YOUR PHOTOS LIVE HERE
// ============================================================
import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/memory-2.jpg";
import memory3 from "@/assets/memory-3.jpg";
import memory4 from "@/assets/memory-4.jpg";
import memory5 from "@/assets/memory-5.jpg";
import memory6 from "@/assets/memory-6.jpg";

export type Memory = {
  caption: string;
  emoji: string;
  image?: string;
  date?: string;
};

export const memories: Memory[] = [
  { caption: "This day still makes me smile", emoji: "🌸", date: "our first chapter", image: memory1 },
  { caption: "One of my favorite 'us' moments", emoji: "💫", date: "a quiet magic", image: memory2 },
  { caption: "When the world felt just right", emoji: "🌙", date: "under the same sky", image: memory3 },
  { caption: "A little forever in a moment", emoji: "🍓", date: "frozen in time", image: memory4 },
  { caption: "Your laugh, my favorite sound", emoji: "🎀", date: "echoes in my head", image: memory5 },
  { caption: "Us, against everything", emoji: "🕊️", date: "always you & me", image: memory6 },
];
