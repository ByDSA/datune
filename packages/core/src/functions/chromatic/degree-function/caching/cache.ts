import { KeyMappedFlyweightCache } from "@datune/utils";
import { DegreeFunc } from "../DegreeFunc";
import { getId, getKey, type Key } from "./key-id";

export const cache = new KeyMappedFlyweightCache<DegreeFunc, Key, string>( {
  getId,
  getKey,
  create: key=>new (DegreeFunc as any)(key),
} );
