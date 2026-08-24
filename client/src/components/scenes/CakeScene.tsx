/**
 * Style reminder — a theatrical birthday-cake moment inspired by the reference.
 * The flame extinguishes directly by tap or through the visible blow slider, so the user never
 * needs to grant microphone access for this gift.
 */
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useCallback, useState } from "react";

export default function CakeScene({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
  const [blownOut, setBlownOut] = useState(false);
  const [blowValue, setBlowValue] = useState(0);
  const extinguish = useCallback(() => setBlownOut(true), []);

  const resetCandle = () => {
    setBlownOut(false);
    setBlowValue(0);
  };

  const changeSlider = (value: number) => {
    setBlowValue(value);
    if (value >= 78) extinguish();
  };

  return (
    <section className="story-scene story-scene--cake" aria-labelledby="cake-title">
      <div className="cake-copy">
        <p className="scene-eyebrow">Gift three</p>
        <h2 id="cake-title">Here&apos;s your<br />virtual cake</h2>
        <p>{blownOut ? "Wish safely delivered." : "Blow your candle and make your wish."}</p>
        <div className="cake-controls">
          {!blownOut ? (
            <>
              <label className="blow-slider" htmlFor="blow-slider">
                <span>Slide to blow out the candle</span>
                <input id="blow-slider" max="100" min="0" onChange={(event) => changeSlider(Number(event.target.value))} type="range" value={blowValue} />
              </label>
            </>
          ) : (
            <div className="cake-success">
              <button className="surprise-button" onClick={onContinue} type="button">Open your birthday wish</button>
              <button className="text-button" onClick={resetCandle} type="button"><RotateCcw size={15} /> Light it again</button>
            </div>
          )}
        </div>
        <button className="back-button" onClick={onBack} type="button"><ArrowLeft size={17} /> Go back to Gift Room</button>
      </div>
      <button aria-label={blownOut ? "The candle is already blown out" : "Tap the candle to blow it out"} className={`cake-art${blownOut ? " cake-art--blown" : ""}`} disabled={blownOut} onClick={extinguish} type="button">
        <img alt="" src="./media/gift-room-cake.jpg" />
        <span className="cake-candle"><span className="cake-flame" /></span>
        {blownOut && <span className="cake-smoke">〰</span>}
      </button>
    </section>
  );
}
