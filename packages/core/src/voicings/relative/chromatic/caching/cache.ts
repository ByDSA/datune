import type { Dto } from "./Dto";
import type { Interval } from "intervals/chromatic";
import { StringHashCache } from "@datune/utils";
import { Voicing } from "../Voicing";

export const cache = new StringHashCache<Voicing, Dto>( {
  hash(hashingObject: Interval[]) {
    return hashingObject.toString();
  },
  toDto(voicing: Voicing) {
    return voicing.rootIntervals;
  },
  create: (Voicing as any).create,
} );
