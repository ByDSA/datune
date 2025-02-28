import { StringHashCache } from "@datune/utils";
import { Pitch } from "../Pitch";
import type { Dto } from "./Dto";
import { hashDto } from "./Dto";
import { toDto } from "./toDto";

export const cache = new StringHashCache<Pitch, Dto>( {
  hash: hashDto,
  toDto,
  create: (dto: Dto) => new (Pitch as any)(dto),
} );
