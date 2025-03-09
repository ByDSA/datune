import type { Pitch } from "pitches/alt";
import type { Scale } from "scales/alt";
import { hash as hashPitch } from "pitches/alt/caching/hash";
import { hash as hashScale } from "scales/symbolic/alt/caching/hash";

export type Dto = {
  root: Pitch;
  scale: Scale;
};

export function hash(obj: Dto): string {
  const rootHashCode = hashPitch(obj.root);
  const scaleHashCode = hashScale(obj.scale);

  return `${rootHashCode}|(${scaleHashCode})`;
}
