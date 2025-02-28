import { Key } from "../Key";
import { cache } from "./cache";
import type { Dto } from "./Dto";

export const toObj = (dto: Dto): Key => cache.getOrCreate(dto);
