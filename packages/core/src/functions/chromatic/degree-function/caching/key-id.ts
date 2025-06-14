import type { Degree } from "degrees/chromatic";
import type { IntervalSet } from "sets/interval-sets/chromatic";
import type { DegreeFunc } from "../DegreeFunc";
import { getObjId as intervalSetGetObjId } from "sets/interval-sets/chromatic/caching/cache";
import { getObjId as degreeGetObjId } from "intervals/symbolic/chromatic/caching/id";

export type Key = {
  degree: Degree;
  intervalSet: IntervalSet;
};

export function getId(key: Key): string {
  return `(${degreeGetObjId(key.degree)}|${intervalSetGetObjId(key.intervalSet)})`;
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
