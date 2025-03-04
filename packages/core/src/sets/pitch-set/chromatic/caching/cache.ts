import type { Dto } from "./Dto";
import { StringHashCache } from "@datune/utils";
import { PitchSet } from "../PitchSet";
import { hashDto } from "./Dto";
import { toDto } from "./toDto";

export const cache = new StringHashCache( {
  hash: hashDto,
  toDto,
  create: (dto: Dto) => new (PitchSet as any)(dto),
} );
