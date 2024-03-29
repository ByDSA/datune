import { StringHashCache } from "@datune/utils";
import { toDto } from "../../conversions";
import Key from "../../Key";
import { Dto, hash } from "../dto";

const cache = new StringHashCache<Key, Dto>( {
  hash,
  toDto,
  create: (Key as any).create,
} );

export default cache;
