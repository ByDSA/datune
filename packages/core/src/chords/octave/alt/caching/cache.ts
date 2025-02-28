import { StringHashCache } from "@datune/utils";
import { Chord } from "../Chord";
import type { Dto } from "./Dto";
import { hashDto } from "./Dto";
import { toDto } from "./toDto";

export const cache = new StringHashCache<Chord, Dto>( {
  hash: hashDto,
  toDto,
  create: (dto: Dto) => new (Chord as any)(dto),
} );
