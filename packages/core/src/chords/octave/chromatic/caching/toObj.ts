import { Chord } from "../Chord";
import { cache } from "./cache";
import type { Dto } from "./Dto";

export const toObj = (dto: Dto): Chord => cache.getOrCreate(dto);
