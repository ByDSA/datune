import type { Key } from "keys/chromatic";
import type { Key as AKey } from "../../alt/Key";
import { Scales as S } from "scales/chromatic";
import { Pitches as P } from "pitches/chromatic";
import { from } from "./rootScale";

export function fromAltKey(aKey: AKey): Key {
  return from(P.fromAltPitch(aKey.root), S.fromAltScale(aKey.scale));
}
