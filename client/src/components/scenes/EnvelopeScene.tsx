/**
 * Style reminder — match the video reference: a centered white-and-pink envelope on a saturated
 * magenta gradient, framed by playful celebratory doodles and a single deliberate action.
 */
import { Heart, Music2, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import { HeartConfetti } from "@/components/HeartConfetti";

export default function EnvelopeScene({ onContinue, onStartMusic }: { onContinue: () => void; onStartMusic: () => void }) {
  const [opened, setOpened] = useState(false);

  return (
    <section className="gift-scene" aria-labelledby="mail-title">
      <div aria-hidden="true" className="scene-glow scene-glow--one" />
      <div aria-hidden="true" className="scene-glow scene-glow--two" />

      <div aria-hidden="true" className="scene-doodles">
        <Heart className="doodle doodle--heart-one" fill="currentColor" strokeWidth={0} />
        <Music2 className="doodle doodle--music-one" strokeWidth={2.4} />
        <Sparkles className="doodle doodle--sparkles-one" strokeWidth={2.4} />
        <Star className="doodle doodle--star-one" fill="currentColor" strokeWidth={0} />
        <Heart className="doodle doodle--heart-two" fill="currentColor" strokeWidth={0} />
        <Music2 className="doodle doodle--music-two" strokeWidth={2.4} />
        <span className="doodle doodle--ribbon">〰</span>
        <span className="doodle doodle--dot" />
        <span className="doodle doodle--dot-two" />
      </div>

      <div className="mail-content">
        <p className="mail-kicker">A tiny delivery, just for you</p>
        <h1 id="mail-title">You&apos;ve got mail</h1>
        <p className="mail-instruction">
          {opened ? "A little piece of my heart found its way to you." : "Tap the envelope to open it."}
        </p>

        <div className="envelope-stage">
          <HeartConfetti active={opened} />
          <button
            aria-label={opened ? "The envelope is open" : "Open your surprise letter"}
            aria-pressed={opened}
            className={`envelope-button${opened ? " envelope-button--open" : ""}`}
            onClick={() => {
              onStartMusic();
              setOpened(true);
            }}
            type="button"
          >
            <span className="envelope-shadow" />
            <span className="envelope-card">
              <span className="envelope-letter">
                <span className="envelope-letter__label">For you</span>
                <span className="envelope-letter__line" />
                <span className="envelope-letter__line envelope-letter__line--short" />
                <span className="envelope-letter__heart">♥</span>
              </span>
              <span className="envelope-back" />
              <span className="envelope-flap" />
              <span className="envelope-front">
                <span className="envelope-front__fold envelope-front__fold--left" />
                <span className="envelope-front__fold envelope-front__fold--right" />
              </span>
              <span className="envelope-seal" aria-hidden="true">♥</span>
            </span>
            <span className="envelope-cta">{opened ? "Opened with love" : "Open me"}</span>
          </button>
        </div>

        <p className={`mail-reveal${opened ? " mail-reveal--visible" : ""}`} aria-live="polite">
          Dear bestie, this is only the beginning.
        </p>
        {opened && <button className="mail-continue" onClick={onContinue} type="button">Read the letter</button>}
      </div>
    </section>
  );
}
