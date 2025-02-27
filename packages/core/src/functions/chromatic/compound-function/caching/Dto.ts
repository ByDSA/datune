import { DegreeFunction } from "../../degree-function/DegreeFunction";
import { hashDto as degreeFunctionsHash } from "../../degree-function/caching/Dto";
import { DegreeArray } from "degrees/chromatic";
import { Degrees } from "degrees/chromatic";

export type Dto = {
  degreeFunction: DegreeFunction;
  degreeChain: DegreeArray;
};

export function hash(obj: Dto): string {
  const degreeFunction = degreeFunctionsHash(obj.degreeFunction);
  const degreeChain = obj.degreeChain.map(Degrees.hash).join("-");

  return `(${degreeFunction}|${degreeChain})`;
}
