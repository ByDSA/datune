import { StringHashCache } from "@datune/utils";
import { Key } from "../Key";
import { Dto } from "./Dto";
import { hashDto } from "./Dto";
import { toDto } from "./toDto";

export const cache = new StringHashCache<Key, Dto>( {
  hash: hashDto,
  toDto,
  create: (dto: Dto) => new (Key as any)(dto),
} );
