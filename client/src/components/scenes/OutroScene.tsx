/**
 * Style reminder — retain the reference’s mischievous self-destruct ending, but provide a friendly
 * restart so the gift remains reusable rather than a dead-end screen.
 */
import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

export default function OutroScene({ onRestart }: { onRestart: () => void }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) return;
    const timer = window.setTimeout(() => setCount((value) => value - 1), 760);
    return () => window.clearTimeout(timer);
  }, [count]);

  return (
    <section className="story-scene story-scene--outro" aria-labelledby="outro-title">
      <div className="outro-bow" aria-hidden="true">🎀</div>
      <p className="scene-eyebrow">A tiny dramatic ending</p>
      <h2 id="outro-title">This website will self-destruct in <span>{count || "…"}</span></h2>
      {count === 0 ? (
        <div className="outro-punchline">
          <p>Just kidding, hehe.</p>
          <button className="surprise-button" onClick={onRestart} type="button"><RotateCcw size={17} /> Open it again</button>
        </div>
      ) : <p className="outro-count">3... 2... 1...</p>}
    </section>
  );
}
