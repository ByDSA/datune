import type { Data } from "./Data";
import type { Dto } from "./Dto";
import { cache } from "scales/symbolic/chromatic/caching/cache";

export default (dto: Dto): Data => dto.map((entry) => [entry[0], cache.getOrCreate(entry[1])]);
