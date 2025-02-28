import cache from "./cache/toDto";
import type { Data } from "./Data";
import type { Dto } from "./Dto";

export const toDto = (data: Data): Dto => ( {
  cache: cache(data.cache),
} );
