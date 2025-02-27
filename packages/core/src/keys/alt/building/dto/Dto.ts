import { Pitch } from "pitches/alt";
import { Scale } from "scales/alt";
import { Pitches } from "pitches/alt";
import { hash as hashScale } from "scales/symbolic/alt/caching/hash";

export type Dto = {
  root: Pitch;
  scale: Scale;
};

export function hash(obj: Dto): string {
  const rootHashCode = Pitches.hash(obj.root);
  const scaleHashCode = hashScale(obj.scale);

  return `${rootHashCode}|(${scaleHashCode})`;
}
