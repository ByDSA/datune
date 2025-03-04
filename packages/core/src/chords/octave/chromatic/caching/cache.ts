import type { Dto } from "./Dto";
import { StringHashCache } from "@datune/utils";
import { Chord } from "../Chord";
import { hashDto } from "./Dto";
import { toDto } from "./toDto";

export const cache = new StringHashCache<Chord, Dto>( {
  hash: hashDto,
  toDto,
  create: (Chord as any).create,
} );
