import { Keys as CKeys, Key as CKey } from "keys/chromatic";
import { Pitches } from "pitches/alt";
import { Scales } from "scales/alt";
import { Key } from "../Key";

export function toChromatic(obj: Key): CKey {
  return CKeys.fromRootScale(Pitches.toChromatic(obj.root), Scales.toChromatic(obj.scale));
}
