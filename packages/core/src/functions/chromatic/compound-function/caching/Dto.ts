import type { DegreeFunction } from "../../degree-function/DegreeFunction";
import { hashDto as degreeFunctionsHash } from "../../degree-function/caching/Dto";
import type { DegreeArray } from "degrees/chromatic";
import { hash as hashDegree } from "degrees/chromatic/caching";

export type Dto = {
  degreeFunction: DegreeFunction;
  degreeChain: DegreeArray;
};

export function hash(obj: Dto): string {
  const degreeFunction = degreeFunctionsHash(obj.degreeFunction);
  const degreeChain = obj.degreeChain.map(hashDegree).join("-");

  return `(${degreeFunction}|${degreeChain})`;
}
