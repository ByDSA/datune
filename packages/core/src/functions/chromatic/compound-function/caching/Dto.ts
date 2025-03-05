import type { DegreeFunc } from "../../degree-function/DegreeFunc";
import type { DegreeArray } from "degrees/chromatic";
import { hash as hashDegree } from "degrees/chromatic/caching";
import { hashDto as degreeFuncsHash } from "../../degree-function/caching/Dto";

export type Dto = {
  degreeFunc: DegreeFunc;
  degreeChain: DegreeArray;
};

export function hash(obj: Dto): string {
  const degreeFunc = degreeFuncsHash(obj.degreeFunc);
  const degreeChain = obj.degreeChain.map(hashDegree).join("-");

  return `(${degreeFunc}|${degreeChain})`;
}
