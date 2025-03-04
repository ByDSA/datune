import type { MusicalDuration } from "./MusicalDuration";
import { StringHashCache } from "@datune/utils";

// UNUSED
export type Dto = number;

export const cache = new StringHashCache<MusicalDuration, Dto>( {
  hash: (dto: Dto) => String(dto),
  toDto: (obj: MusicalDuration): Dto => +obj,
  create: (dto: Dto): MusicalDuration => dto,
} );
