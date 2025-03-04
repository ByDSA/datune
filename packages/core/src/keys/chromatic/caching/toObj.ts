import type { Dto } from "./Dto";
import { Key } from "../Key";
import { cache } from "./cache";

export const toObj = (dto: Dto): Key => cache.getOrCreate(dto);
