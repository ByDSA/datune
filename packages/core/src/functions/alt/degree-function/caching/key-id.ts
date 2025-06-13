import type { Degree } from "degrees/alt";
import type { Voicing } from "voicings/alt";
import type { DegreeFunc } from "../DegreeFunc";
import { getObjId as degreeGetObjId } from "intervals/symbolic/alt/caching/cache";
import { getObjId as voicingGetObjId } from "voicings/relative/alt/caching/cache";

export type Key = {
  degree: Degree;
  voicing: Voicing;
};

export function getId(key: Key): string {
  const voicingId = voicingGetObjId(key.voicing);
  const degreeId = degreeGetObjId(key.degree);

  return `(${degreeId})|(${voicingId})`;
}

export function getKey(func: DegreeFunc): Key {
  return {
    degree: func.baseDegree,
    voicing: func.voicing,
  };
}

export function getObjId(func: DegreeFunc): string {
  return getId(getKey(func));
}
