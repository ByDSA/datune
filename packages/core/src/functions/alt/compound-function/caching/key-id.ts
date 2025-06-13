import type { DegreeFunc } from "../../degree-function/DegreeFunc";
import type { DegreeArray } from "degrees/alt";
import type { CompoundFunc } from "../CompoundFunc";
import { getObjId as degreeGetObjId } from "intervals/symbolic/alt/caching/cache";
import { getObjId as degreeFuncGetObjId } from "../../degree-function/caching/key-id";

export type Key = {
  degreeFunc: DegreeFunc;
  degreeChain: DegreeArray | Readonly<DegreeArray>;
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
