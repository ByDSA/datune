import { StringHashCache } from "@datune/utils";
import { DegreeFunction } from "../DegreeFunction";
import { Dto } from "./Dto";
import { hashDto } from "./Dto";
import { toDto } from "./toDto";

export const cache = new StringHashCache<DegreeFunction, Dto>( {
  hash: hashDto,
  toDto,
  create: (DegreeFunction as any).create,
} );
