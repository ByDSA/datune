import type { DegreeFunc } from "../../degree-function/DegreeFunc";
import type { DegreeArray } from "degrees/alt";
import { KeyMappedFlyweightCache } from "datils/patterns/caching";
import { getObjId as degreeGetObjId } from "degrees/alt/caching/cache";
import { CompoundFunc } from "../CompoundFunc";
import { getObjId as degreeFuncGetObjId } from "../../degree-function/caching/cache";

export type Key = {
  degreeFunc: DegreeFunc;
  degreeChain: DegreeArray;
};

export function getId(key: Key): string {
  const degreeFunc = degreeFuncGetObjId(key.degreeFunc);
  const degreeChain = key.degreeChain.map(degreeGetObjId).join("-");

  return `(${degreeFunc}|${degreeChain})`;
}

export function getKey(func: CompoundFunc): Key {
  return {
    degreeFunc: func.degreeFunc,
    degreeChain: func.degreeChain,
  };
}

export const cache = new KeyMappedFlyweightCache<CompoundFunc, Key, string>( {
  getId,
  getKey,
  create: key=>new (CompoundFunc as any)(key),
} );
