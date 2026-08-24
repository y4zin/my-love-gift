/**
 * Style reminder — the romantic finale is built entirely from live browser elements:
 * violet countdown and question, an authored layered rose, then a 15-second text-heart sequence.
 */
import { Heart, Play, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const countdownValues = ["3", "2", "1"];
const loveWords = ["You", "Are", "My", "Love"];
const loadingMessages = ["Loading Love.css...", "Growing digital petals...", "Saving this moment...", "Ready to bloom!"];
const rosePetalGeometry = [
  [50, 17, 0, 1.16], [31, 26, -54, 1.12], [69, 26, 54, 1.12], [22, 45, -84, 1.06], [78, 45, 84, 1.06],
  [35, 47, -34, 1], [65, 47, 34, 1], [50, 42, 0, .96], [42, 33, -18, .82], [58, 33, 18, .82], [50, 31, 0, .66],
] as const;

const particleStyle = (index: number) => ({
  left: `${4 + ((index * 29) % 92)}%`,
  top: `${7 + ((index * 17) % 82)}%`,
  "--particle-delay": `${index * -0.14}s`,
});
const heartStyle = (index: number) => ({
  left: `${3 + ((index * 37) % 92)}%`,
  top: `${6 + ((index * 23) % 84)}%`,
  "--heart-delay": `${index * -0.11}s`,
});
const rosePetalStyle = (index: number) => {
  const [left, top, rotate, scale] = rosePetalGeometry[index];
  return {
    "--petal-left": `${left}%`,
    "--petal-top": `${top}%`,
    "--petal-rotate": `${rotate}deg`,
    "--petal-scale": scale,
    "--petal-delay": `${index * 0.07}s`,
  };
};
const fallingPetalStyle = (index: number) => ({
  left: `${6 + ((index * 31) % 90)}%`,
  "--fall-delay": `${index * -0.47}s`,
  "--fall-duration": `${3.8 + ((index % 4) * 0.55)}s`,
});
const heartGlyphStyle = (index: number, total: number) => {
  const angle = (Math.PI * 2 * index) / total;
  const x = 16 * Math.sin(angle) ** 3;
  const y = 13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle);
  return {
    left: `${50 + x * 2.42}%`,
    top: `${49 - y * 2.16}%`,
    "--glyph-delay": `${index * -0.09}s`,
    "--glyph-tilt": `${(index % 7) * 6 - 18}deg`,
  };
};

export default function LoveQuestionScene({ onContinue }: { onContinue: () => void }) {
  const preview = new URLSearchParams(window.location.search).get("preview");
  const previewFinale = preview === "final";
  const previewBloom = preview === "bloom";
  const [step, setStep] = useState(previewFinale || previewBloom || preview === "heart" ? countdownValues.length : 0);
  const [showFinale, setShowFinale] = useState(previewFinale);
  const [wordIndex, setWordIndex] = useState(previewFinale ? loveWords.length : 0);
  const [showBloom, setShowBloom] = useState(previewBloom);
  const [loadingStep, setLoadingStep] = useState(previewBloom ? loadingMessages.length : 0);
  const [bloomed, setBloomed] = useState(previewBloom);
  const [showHeartSequence, setShowHeartSequence] = useState(preview === "heart");

  useEffect(() => {
    if (step >= countdownValues.length) return;
    const timer = window.setTimeout(() => setStep((value) => value + 1), 1050);
    return () => window.clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    if (!showFinale || wordIndex >= loveWords.length) return;
    const timer = window.setTimeout(() => setWordIndex((value) => value + 1), 700);
    return () => window.clearTimeout(timer);
  }, [showFinale, wordIndex]);

  useEffect(() => {
    if (!showBloom || loadingStep >= loadingMessages.length) return;
    const timer = window.setTimeout(() => setLoadingStep((value) => value + 1), 850);
    return () => window.clearTimeout(timer);
  }, [loadingStep, showBloom]);

  useEffect(() => {
    if (!showHeartSequence) return;
    const timer = window.setTimeout(onContinue, 15000);
    return () => window.clearTimeout(timer);
  }, [onContinue, showHeartSequence]);

  if (showHeartSequence) {
    return (
      <section className="heart-code-scene" aria-label="A fifteen second i love you heart animation">
        <div className="heart-code-scene__dust" aria-hidden="true" />
        <div className="heart-code-sculpture" aria-hidden="true">
          {Array.from({ length: 48 }, (_, index) => <span key={index} style={heartGlyphStyle(index, 48) as React.CSSProperties}>i love you</span>)}
        </div>
        <div className="heart-code-message">
          <p>every word leads back to you</p>
          <strong>I LOVE YOU</strong>
        </div>
      </section>
    );
  }

  if (showBloom) {
    const readyToBloom = loadingStep >= loadingMessages.length;
    return (
      <section className="rose-bloom-scene" aria-label="A rose coded with love">
        {!bloomed ? (
          <div className="love-code-card">
            <div className="love-code-card__title"><span>✿</span> Love.css</div>
            <p>{loadingMessages[Math.min(loadingStep, loadingMessages.length - 1)]}</p>
            <div className="love-loader" aria-label="Love is loading"><i style={{ width: `${(loadingStep / loadingMessages.length) * 100}%` }} /></div>
            {readyToBloom && <button className="bloom-button" onClick={() => setBloomed(true)} type="button">Tap to bloom <Sparkles size={17} /></button>}
          </div>
        ) : (
          <div className="bloomed-rose-wrap">
            <div className="falling-petals" aria-hidden="true">
              {Array.from({ length: 18 }, (_, index) => <i key={index} style={fallingPetalStyle(index) as React.CSSProperties} />)}
            </div>
            <div className="coded-rose coded-rose--bloomed" aria-hidden="true">
              <div className="rose-stem" />
              <i className="rose-leaf rose-leaf--left" /><i className="rose-leaf rose-leaf--right" />
              <div className="rose-flower">
                {rosePetalGeometry.map((_, index) => <i className="rose-petal" key={index} style={rosePetalStyle(index) as React.CSSProperties} />)}
                <i className="rose-core" />
              </div>
            </div>
            <p className="coded-love-note">i coded this for you</p>
            <button className="rose-continue" onClick={() => setShowHeartSequence(true)} type="button">Keep this moment <Heart fill="currentColor" size={16} /></button>
          </div>
        )}
      </section>
    );
  }

  if (showFinale) {
    const completed = wordIndex >= loveWords.length;
    return (
      <section className="love-finale-scene" aria-label="A final message of love">
        <div className="love-finale-rain" aria-hidden="true">
          {Array.from({ length: 30 }, (_, index) => <span key={index} style={{ "--rain-index": index } as React.CSSProperties}>♥</span>)}
        </div>
        <div className={`love-finale-core${completed ? " love-finale-core--complete" : ""}`}>
          {!completed ? (
            <p className="love-word" aria-live="polite">{loveWords[wordIndex]}</p>
          ) : (
            <>
              <div className="finale-hearts" aria-hidden="true">
                {Array.from({ length: 17 }, (_, index) => <Heart fill="currentColor" key={index} style={heartStyle(index) as React.CSSProperties} />)}
              </div>
              <p className="love-final-line">I LOVE YOU</p>
              <p className="love-final-note">You are my favourite place to be.</p>
              <button className="love-next-button" onClick={() => setShowBloom(true)} type="button">One more thing <Sparkles size={17} /></button>
            </>
          )}
        </div>
      </section>
    );
  }

  const ready = step >= countdownValues.length;
  return (
    <section className="love-question-scene" aria-labelledby="love-question-title">
      <div className="love-question-scene__grain" aria-hidden="true" />
      <div className="violet-particles" aria-hidden="true">
        {Array.from({ length: 22 }, (_, index) => <span key={index} style={particleStyle(index) as React.CSSProperties}>✦</span>)}
      </div>
      <div className="layered-heart layered-heart--outer" aria-hidden="true"><Heart /></div>
      <div className="layered-heart layered-heart--middle" aria-hidden="true"><Heart /></div>
      <div className="layered-heart layered-heart--inner" aria-hidden="true"><Heart fill="currentColor" /></div>
      {!ready ? (
        <div className="countdown-wrap" aria-live="polite">
          <p>Something is about to bloom</p>
          <strong className="love-countdown">{countdownValues[step] ?? ""}</strong>
          <span>Count with me</span>
        </div>
      ) : (
        <div className="love-question-content">
          <p className="love-question-content__eyebrow">A little question from my heart</p>
          <h2 id="love-question-title">Do you<br /><em>love me?</em></h2>
          <p>Tap the glowing heart to find out what I saved for us.</p>
          <button className="love-heart-button" onClick={() => setShowFinale(true)} type="button">
            <Heart fill="currentColor" size={22} /> Yes, always <Play fill="currentColor" size={16} />
          </button>
        </div>
      )}
    </section>
  );
}
