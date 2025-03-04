import type { Dto } from "./Dto";
import { Scale } from "../Scale";
import { cache } from "./cache";

export const toObj = (dto: Dto): Scale => cache.getOrCreate(dto);
