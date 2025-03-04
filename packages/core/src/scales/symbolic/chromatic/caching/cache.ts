import type { Dto } from "./Dto";
import { StringHashCache } from "@datune/utils";
import { Scale } from "../Scale";
import { hashDto } from "./Dto";
import { toDto } from "./toDto";

export const cache = new StringHashCache<Scale, Dto>( {
  hash: hashDto,
  toDto,
  create: (Scale as any).create,
} );
