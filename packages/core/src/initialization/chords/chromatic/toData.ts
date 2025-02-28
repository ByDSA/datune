import cache from "./cache/toData";
import type { Data } from "./Data";
import type { Dto } from "./Dto";

export default (dto: Dto): Data => ( {
  cache: cache(dto.cache),
} );
