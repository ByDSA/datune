import type { DegreeFunction } from "../../degree-function/DegreeFunction";
import { hash as degreeFunctionHash } from "../../degree-function/caching/hashObj";
import type { DegreeArray } from "degrees/alt";
import { hash as hashDegree } from "degrees/alt/caching/hash";

export type Dto = {
  degreeFunction: DegreeFunction;
  degreeChain: DegreeArray;
};

export function hashDto(obj: Dto): string {
  const degreeFunction = degreeFunctionHash(obj.degreeFunction);
  const degreeChain = obj.degreeChain.map(hashDegree).join("-");

  return `(${degreeFunction}|${degreeChain})`;
}
