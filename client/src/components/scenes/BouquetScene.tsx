/**
 * Style reminder — one warm bouquet hero with concise, staggered reasons. Keep the image bright
 * against the magenta scene and frame it like a gift, not an e-commerce product card.
 */
import { ArrowLeft, Heart } from "lucide-react";
import { giftContent } from "@/data/giftContent";

export default function BouquetScene({ onBack }: { onBack: () => void }) {
  return (
    <section className="story-scene story-scene--bouquet" aria-labelledby="bouquet-title">
      <div className="bouquet-copy">
        <p className="scene-eyebrow">Gift one</p>
        <h2 id="bouquet-title">Tadaaa...<br />your virtual bouquet!</h2>
        <p className="bouquet-intro">Reasons why you&apos;re my favourite human:</p>
        <ol className="reason-list">
          {giftContent.reasons.map((reason, index) => (
            <li key={reason} style={{ "--reason-delay": `${index * 85}ms` } as React.CSSProperties}>
              <Heart fill="currentColor" size={15} /> <span>{reason}</span>
            </li>
          ))}
        </ol>
        <button className="back-button" onClick={onBack} type="button"><ArrowLeft size={17} /> Go back to Gift Room</button>
      </div>
      <div className="bouquet-art" aria-hidden="true">
        <img alt="A virtual bouquet of roses" src="./media/gift-room-bouquet.jpg" />
        <span className="bouquet-art__spark bouquet-art__spark--one">✦</span>
        <span className="bouquet-art__spark bouquet-art__spark--two">♥</span>
      </div>
    </section>
  );
}
