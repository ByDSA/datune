import type { Dto } from "./Dto";
import { StringHashCache } from "@datune/utils";
import { Key } from "../../Key";
import { toDto } from "./toDto";
import { hash } from "./Dto";

export const cache = new StringHashCache<Key, Dto>( {
  hash,
  toDto,
  create: (Key as any).create,
} );
