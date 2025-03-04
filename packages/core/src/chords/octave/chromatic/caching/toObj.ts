import type { Dto } from "./Dto";
import { Chord } from "../Chord";
import { cache } from "./cache";

export const toObj = (dto: Dto): Chord => cache.getOrCreate(dto);
