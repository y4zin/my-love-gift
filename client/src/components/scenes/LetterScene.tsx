/**
 * Style reminder — reference-led digital stationery: a warm paper letter emerging over magenta,
 * with handwritten accents and rounded controls rather than generic card UI.
 */
import { Sparkles } from "lucide-react";
import { giftContent } from "@/data/giftContent";

export default function LetterScene({ onContinue }: { onContinue: () => void }) {
  const { letter } = giftContent;
  const paragraphs = letter.split("\n\n");

  return (
    <section className="story-scene story-scene--letter" aria-labelledby="letter-title">
      <div aria-hidden="true" className="letter-doodle letter-doodle--one">♥</div>
      <div aria-hidden="true" className="letter-doodle letter-doodle--two">✦</div>
      <article className="letter-paper">
        <div className="letter-paper__seal" aria-hidden="true"><Sparkles size={18} /></div>
        <p className="letter-greeting">A letter from my heart</p>
        <h2 id="letter-title">Only for you</h2>
        <div className="typewritten-copy" role="document">
          {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
        <div className="letter-meta" aria-label="Letter details">
          <span>From: {giftContent.sender}</span>
          <span>To: {giftContent.recipient}</span>
        </div>
        <button className="surprise-button" onClick={onContinue} type="button">
          <Sparkles size={17} /> Surprise
        </button>
      </article>
    </section>
  );
}
