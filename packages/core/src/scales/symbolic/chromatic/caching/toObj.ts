import { Scale } from "../Scale";
import { cache } from "./cache";
import type { Dto } from "./Dto";

export const toObj = (dto: Dto): Scale => cache.getOrCreate(dto);
