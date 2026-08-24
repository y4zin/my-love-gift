/**
 * Style reminder — a playful final birthday beat in the video’s language: magenta, a cute drawn
 * character, oversized friendly lettering, and one tiny interaction before the outro.
 */
import { Heart } from "lucide-react";
import { useState } from "react";

export default function WishScene({ onContinue }: { onContinue: () => void }) {
  const [poked, setPoked] = useState(false);

  return (
    <section className="story-scene story-scene--wish" aria-labelledby="wish-title">
      <div className="birthday-character" aria-hidden="true">
        <span className="birthday-character__hair" />
        <span className="birthday-character__face"><i /><i /><b /></span>
        <span className="birthday-character__body" />
        <img alt="" className="birthday-character__stamp" src="./media/gift-room-seal-logo.png" />
      </div>
      <div className="wish-copy">
        <p className="scene-eyebrow">One last thing</p>
        <h2 id="wish-title">Happy Birthday,<br />bestie!</h2>
        <p>{poked ? "The bubble says: you deserve every lovely thing." : "I packed a tiny note in that bubble."}</p>
        <button className={`bubble-button${poked ? " bubble-button--poked" : ""}`} onClick={() => setPoked(true)} type="button">
          <Heart fill="currentColor" size={18} /> {poked ? "A little love for you" : "Poke the bubble"}
        </button>
        {poked && <button className="surprise-button wish-continue" onClick={onContinue} type="button">One more click</button>}
      </div>
    </section>
  );
}
