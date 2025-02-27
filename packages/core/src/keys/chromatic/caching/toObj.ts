import { Key } from "../Key";
import { cache } from "./cache";
import { Dto } from "./Dto";

export const toObj = (dto: Dto): Key => cache.getOrCreate(dto);
