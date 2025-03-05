import type { Dto } from "./Dto";
import { StringHashCache } from "@datune/utils";
import { CompoundFunc } from "../CompoundFunc";
import { hashDto } from "./Dto";
import { toDto } from "./toDto";

export const cache = new StringHashCache<CompoundFunc, Dto>( {
  hash: hashDto,
  toDto,
  create: (CompoundFunc as any).create,
} );
