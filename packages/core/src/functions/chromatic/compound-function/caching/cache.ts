import { KeyMappedFlyweightCache } from "@datune/utils";
import { CompoundFunc } from "../CompoundFunc";
import { getId, getKey, type Key } from "./key-id";

export const cache = new KeyMappedFlyweightCache<CompoundFunc, Key, string>( {
  getId,
  getKey,
  create: key=>new (CompoundFunc as any)(key),
} );
