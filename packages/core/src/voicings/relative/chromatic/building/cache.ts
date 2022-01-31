import { StringHashCache } from "@datune/utils";
import { Interval } from "intervals/chromatic";
import Voicing from "../Voicing";
import Dto from "./Dto";

const cache = new StringHashCache<Voicing, Dto>( {
  hash(hashingObject: Interval[]) {
    return hashingObject.toString();
  },
  toDto(voicing: Voicing) {
    return voicing.rootIntervals;
  },
  create: (Voicing as any).create,
} );

export default cache;
