import type { Dto } from "./Dto";
import { StringHashCache } from "@datune/utils";
import { DegreeFunc } from "../DegreeFunc";
import { hashDto } from "./Dto";
import { toDto } from "./toDto";

export const cache = new StringHashCache<DegreeFunc, Dto>( {
  hash: hashDto,
  toDto,
  create: (DegreeFunc as any).create,
} );
