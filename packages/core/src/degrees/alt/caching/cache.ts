import type { Dto } from "./Dto";
import { StringHashCache } from "@datune/utils";
import { Degree } from "../Degree";
import { toDto } from "./toDto";
import { hashDto } from "./Dto";

export const cache = new StringHashCache<Degree, Dto>( {
  hash: hashDto,
  toDto,
  create: (Degree as any).create,
} );
