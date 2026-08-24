/**
 * Style reminder — video-reference fidelity: flat celebratory doodles on a deep-magenta scene.
 * This component keeps the heart burst lightweight, tactile, and respectful of reduced motion.
 */
import type { CSSProperties } from "react";

const particles = Array.from({ length: 22 }, (_, index) => {
  const angle = (index / 22) * Math.PI * 2 - Math.PI / 2;
  const distance = 126 + (index % 5) * 30;

  return {
    delay: `${(index % 6) * 38}ms`,
    rotation: `${-28 + (index % 7) * 11}deg`,
    x: `${Math.cos(angle) * distance}px`,
    y: `${Math.sin(angle) * distance + 28}px`,
  };
});

export function HeartConfetti({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <div aria-hidden="true" className="heart-confetti">
      {particles.map((particle, index) => (
        <span
          className="heart-confetti__piece"
          key={`${particle.x}-${particle.y}`}
          style={
            {
              "--confetti-delay": particle.delay,
              "--confetti-rotation": particle.rotation,
              "--confetti-x": particle.x,
              "--confetti-y": particle.y,
            } as CSSProperties
          }
        >
          {index % 5 === 0 ? "✦" : index % 3 === 0 ? "♥" : "❤"}
        </span>
      ))}
    </div>
  );
}
