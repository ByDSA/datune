import type { DegreeFunc } from "../../degree-function/DegreeFunc";
import type { DegreeArray } from "degrees/alt";
import { hash as hashDegree } from "degrees/alt/caching/hash";
import { hash as degreeFuncHash } from "../../degree-function/caching/hashObj";

export type Dto = {
  degreeFunc: DegreeFunc;
  degreeChain: DegreeArray;
};

export function hashDto(obj: Dto): string {
  const degreeFunc = degreeFuncHash(obj.degreeFunc);
  const degreeChain = obj.degreeChain.map(hashDegree).join("-");

  return `(${degreeFunc}|${degreeChain})`;
}
