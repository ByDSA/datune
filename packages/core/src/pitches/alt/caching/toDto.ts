import type { Pitch } from "../Pitch";
import type { Dto } from "./Dto";

export const toDto = (obj: Pitch): Dto => ( {
  diatonic: obj.diatonic,
  alts: obj.alts,
} );
