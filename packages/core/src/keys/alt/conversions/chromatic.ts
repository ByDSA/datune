import { Key } from "../Key";
import { Keys as CKeys, Key as CKey } from "keys/chromatic";
import { Pitches } from "pitches/alt";
import { Scales } from "scales/alt";

export function toChromatic(obj: Key): CKey {
  return CKeys.fromRootScale(Pitches.toChromatic(obj.root), Scales.toChromatic(obj.scale));
}
