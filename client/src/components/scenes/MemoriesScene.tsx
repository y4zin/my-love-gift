/**
 * Style reminder — reference-style scattered Polaroids against magenta. The cards remain honest
 * image slots until the gift-maker replaces them with their own photographs.
 */
import { ArrowLeft, Heart } from "lucide-react";
import { useState } from "react";
import { giftContent } from "@/data/giftContent";

export default function MemoriesScene({ onBack }: { onBack: () => void }) {
  const [selectedId, setSelectedId] = useState(giftContent.memories[0].id);
  const selected = giftContent.memories.find((memory) => memory.id === selectedId) ?? giftContent.memories[0];

  return (
    <section className="story-scene story-scene--memories" aria-labelledby="memories-title">
      <img aria-hidden="true" className="memory-paper-texture" src="./media/gift-room-paper-garden.jpg" />
      <div className="memories-copy">
        <p className="scene-eyebrow">Gift two</p>
        <h2 id="memories-title">Our Memories</h2>
        <p>Keep adding the little moments that make us, us.</p>
        <p className="memory-caption"><Heart fill="currentColor" size={15} /> {selected.caption}</p>
        <button className="back-button" onClick={onBack} type="button"><ArrowLeft size={17} /> Go back to Gift Room</button>
      </div>
      <div className="polaroid-stack" aria-label="Memory photo gallery">
        {giftContent.memories.map((memory, index) => (
          <button
            aria-pressed={memory.id === selectedId}
            className={`polaroid polaroid--${index + 1}${memory.id === selectedId ? " polaroid--active" : ""}`}
            key={memory.id}
            onClick={() => setSelectedId(memory.id)}
            type="button"
          >
            <span className="polaroid__photo"><img alt={memory.alt} src={memory.src} /></span>
            <span className="polaroid__caption">{memory.caption}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
