import type { Data } from "./Data";
import type { Dto } from "./Dto";
import cache from "./cache/toData";

export const toData = (dto: Dto): Data => ( {
  cache: cache(dto.cache),
} );
