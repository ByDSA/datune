import type { Dto } from "./Dto";
import { StringHashCache } from "@datune/utils";
import { ConcertPitch } from "../ConcertPitch";
import { hashDto } from "./Dto";
import { toDto } from "./toDto";

export const cache = new StringHashCache<ConcertPitch, Dto>( {
  hash: hashDto,
  toDto,
  create: (dto: Dto) => new (ConcertPitch as any)(dto),
} );
