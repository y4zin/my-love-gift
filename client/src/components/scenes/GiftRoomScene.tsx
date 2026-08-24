/**
 * Style reminder — reference-led gift room: three floating pink parcels, playful asymmetry,
 * and no dashboard/grid conventions. Each package is a large touch target with a unique feeling.
 */
import { CakeSlice, Flower2, Images } from "lucide-react";

type GiftChoice = "bouquet" | "memories" | "cake";

const gifts: Array<{ id: GiftChoice; icon: typeof Flower2; label: string; description: string; tone: string }> = [
  { id: "bouquet", icon: Flower2, label: "Gift one", description: "A few flowers for you", tone: "bouquet" },
  { id: "memories", icon: Images, label: "Gift two", description: "Our tiny gallery", tone: "memories" },
  { id: "cake", icon: CakeSlice, label: "Gift three", description: "Make a wish", tone: "cake" },
];

export default function GiftRoomScene({ onSelect }: { onSelect: (gift: GiftChoice) => void }) {
  return (
    <section className="story-scene story-scene--room" aria-labelledby="gift-room-title">
      <div className="room-heading">
        <p className="scene-eyebrow">Choose a ribbon to pull</p>
        <h2 id="gift-room-title">The Gift Room</h2>
        <p>Every box has something made just for you.</p>
      </div>
      <div className="gift-row" aria-label="Three gift options">
        {gifts.map(({ id, icon: Icon, label, description, tone }) => (
          <button className={`gift-box gift-box--${tone}`} key={id} onClick={() => onSelect(id)} type="button">
            <span className="gift-box__bow" aria-hidden="true"><i /><i /></span>
            <span className="gift-box__lid" />
            <span className="gift-box__body"><Icon aria-hidden="true" size={31} strokeWidth={1.9} /></span>
            <span className="gift-box__tag">
              <strong>{label}</strong>
              <small>{description}</small>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
