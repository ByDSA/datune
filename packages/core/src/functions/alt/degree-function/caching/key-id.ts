import type { Degree } from "degrees/alt";
import type { IntervalSet } from "sets/interval-sets/alt";
import type { DegreeFunc } from "../DegreeFunc";
import { getObjId as intervalSetGetObjId } from "sets/interval-sets/alt/caching/cache";
import { getObjId as degreeGetObjId } from "intervals/symbolic/alt/caching/cache";

export type Key = {
  degree: Degree;
  intervalSet: IntervalSet;
};

export function getId(key: Key): string {
  const intervalSetId = intervalSetGetObjId(key.intervalSet);
  const degreeId = degreeGetObjId(key.degree);

  return `(${degreeId})|(${intervalSetId})`;
}

export function getKey(func: DegreeFunc): Key {
  return {
    degree: func.baseDegree,
    intervalSet: func.intervalSet,
  };
}

export function getObjId(func: DegreeFunc): string {
  return getId(getKey(func));
}
