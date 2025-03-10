import type { Dto } from "./Dto";
import { StringHashCache } from "@datune/utils";
import { Key } from "../Key";
import { hashDto } from "./Dto";
import { toDto } from "./toDto";

export const cache = new StringHashCache<Key, Dto>( {
  hash: hashDto,
  toDto,
  create: (dto: Dto) => new (Key as any)(dto),
} );
