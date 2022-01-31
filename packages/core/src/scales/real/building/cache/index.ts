import { StringHashCache } from "@datune/utils";
import ScalePitch from "../../ScalePitch";
import { Dto, hash } from "../dto";

const cache = new StringHashCache<ScalePitch, Dto>( {
  hash,
  toDto(scale: ScalePitch): Dto {
    return scale.intraIntervals;
  },
  create: (ScalePitch as any).create,
} );

export default cache;
