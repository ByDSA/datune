import { StringHashCache } from "@datune/utils";
import type { MusicalDuration } from "./MusicalDuration";

// UNUSED
export type Dto = number;

export const cache = new StringHashCache<MusicalDuration, Dto>( {
  hash: (dto: Dto) => String(dto),
  toDto: (obj: MusicalDuration): Dto => +obj,
  create: (dto: Dto): MusicalDuration => dto,
} );
