import { StringHashCache } from "@datune/utils";
import { CompoundFunc } from "../CompoundFunc";
import { Dto, hash } from "./Dto";
import { toDto } from "./toDto";

export const cache = new StringHashCache<CompoundFunc, Dto>( {
  hash,
  toDto,
  create: (CompoundFunc as any).create,
} );
