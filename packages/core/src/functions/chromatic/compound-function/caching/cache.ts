import { StringHashCache } from "@datune/utils";
import { CompoundFunction } from "../CompoundFunction";
import { Dto, hash } from "./Dto";
import { toDto } from "./toDto";

export const cache = new StringHashCache<CompoundFunction, Dto>( {
  hash,
  toDto,
  create: (CompoundFunction as any).create,
} );
