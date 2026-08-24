/**
 * Style reminder — match the reference doorway beat: one illustrated pink door and a clear,
 * playful invitation to enter, retaining the saturated-magenta world behind it.
 */
import { ArrowRight } from "lucide-react";

export default function GiftDoorScene({ onEnter }: { onEnter: () => void }) {
  return (
    <section className="story-scene story-scene--door" aria-labelledby="door-title">
      <div className="door-copy">
        <p className="scene-eyebrow">Something is waiting inside</p>
        <h2 id="door-title">The Gift Room</h2>
        <p>One small room. Three little surprises.</p>
      </div>
      <button className="door-illustration" onClick={onEnter} type="button" aria-label="Enter the gift room">
        <span className="door-illustration__frame">
          <span className="door-illustration__panel door-illustration__panel--top" />
          <span className="door-illustration__panel door-illustration__panel--bottom" />
          <span className="door-illustration__knob" />
        </span>
        <span className="door-illustration__light" />
        <span className="door-illustration__label">Enter room <ArrowRight size={16} /></span>
      </button>
    </section>
  );
}
