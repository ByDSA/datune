import { StringHashCache } from "@datune/utils";
import { CompoundFunction } from "../CompoundFunction";
import type { Dto } from "./Dto";
import { hashDto } from "./Dto";
import { toDto } from "./toDto";

export const cache = new StringHashCache<CompoundFunction, Dto>( {
  hash: hashDto,
  toDto,
  create: (CompoundFunction as any).create,
} );
