/**
 * Style reminder — the whole site behaves as one animated gift journey, not as several pages.
 * Screen changes should remain warm, clear, and faithful to the reference sequence.
 */
import { AnimatePresence, motion } from "framer-motion";
import { Music2 } from "lucide-react";
import { useRef, useState } from "react";
import BouquetScene from "@/components/scenes/BouquetScene";
import CakeScene from "@/components/scenes/CakeScene";
import EnvelopeScene from "@/components/scenes/EnvelopeScene";
import GiftDoorScene from "@/components/scenes/GiftDoorScene";
import GiftRoomScene from "@/components/scenes/GiftRoomScene";
import LetterScene from "@/components/scenes/LetterScene";
import LoveQuestionScene from "@/components/scenes/LoveQuestionScene";
import MemoriesScene from "@/components/scenes/MemoriesScene";
import OutroScene from "@/components/scenes/OutroScene";
import WishScene from "@/components/scenes/WishScene";

type Screen = "envelope" | "letter" | "door" | "room" | "bouquet" | "memories" | "cake" | "wish" | "love" | "outro";

const validScreens: Screen[] = ["envelope", "letter", "door", "room", "bouquet", "memories", "cake", "wish", "love", "outro"];

const screenMotion = {
  initial: { opacity: 0, scale: 0.965, y: 14 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 1.02, y: -12 },
  transition: { duration: 0.46, ease: [0.23, 1, 0.32, 1] as const },
};

export default function GiftExperience() {
  const requestedScreen = new URLSearchParams(window.location.search).get("scene") as Screen | null;
  const initialScreen = requestedScreen && validScreens.includes(requestedScreen) ? requestedScreen : "envelope";
  const [screen, setScreen] = useState<Screen>(initialScreen);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const beginSoundtrack = () => {
    const soundtrack = audioRef.current;
    if (!soundtrack || !soundtrack.paused) return;
    soundtrack.volume = 0.38;
    void soundtrack.play().then(() => setMusicPlaying(true)).catch(() => setMusicPlaying(false));
  };

  const renderScreen = () => {
    switch (screen) {
      case "envelope": return <EnvelopeScene onContinue={() => setScreen("letter")} onStartMusic={beginSoundtrack} />;
      case "letter": return <LetterScene onContinue={() => setScreen("door")} />;
      case "door": return <GiftDoorScene onEnter={() => setScreen("room")} />;
      case "room": return <GiftRoomScene onSelect={(gift) => setScreen(gift)} />;
      case "bouquet": return <BouquetScene onBack={() => setScreen("room")} />;
      case "memories": return <MemoriesScene onBack={() => setScreen("room")} />;
      case "cake": return <CakeScene onBack={() => setScreen("room")} onContinue={() => setScreen("wish")} />;
      case "wish": return <WishScene onContinue={() => setScreen("love")} />;
      case "love": return <LoveQuestionScene onContinue={() => setScreen("outro")} />;
      case "outro": return <OutroScene onRestart={() => setScreen("envelope")} />;
    }
  };

  return (
    <main className="gift-experience">
      <audio aria-hidden="true" loop preload="auto" ref={audioRef} src="./media/love-song.mp3" />
      {musicPlaying && <div className="music-status" aria-live="polite"><Music2 size={15} /> Playing for you</div>}
      <AnimatePresence mode="wait">
        <motion.div {...screenMotion} key={screen} className="gift-experience__screen">
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
