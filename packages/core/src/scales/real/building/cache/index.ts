import { StringHashCache } from "@datune/utils";
import { Scale } from "../../Scale";
import { Dto, hashDto } from "../dto/Dto";

export const cache = new StringHashCache<Scale, Dto>( {
  hash: hashDto,
  toDto(scale: Scale): Dto {
    return scale.intraIntervals;
  },
  create: (Scale as any).create,
} );
