import { StringHashCache } from "@datune/utils";
import Key from "../Key";
import Dto from "./Dto";
import hash from "./hash";
import toDto from "./toDto";

const cache = new StringHashCache<Key, Dto>( {
  hash,
  toDto,
  create: (dto: Dto) => new (Key as any)(dto),
} );

export default cache;
