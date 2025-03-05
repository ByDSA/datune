import type { Key as CKey } from "keys/chromatic";
import type { Key } from "../Key";
import { Keys as CK } from "keys/chromatic";
import { Pitches as P } from "pitches/alt";
import { Scales as S } from "scales/alt";

export function toChromatic(obj: Key): CKey {
  return CK.from(P.toChromatic(obj.root), S.toChromatic(obj.scale));
}
