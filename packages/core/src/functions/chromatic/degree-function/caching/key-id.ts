import type { Degree } from "degrees/chromatic";
import type { Voicing } from "voicings/chromatic";
import type { DegreeFunc } from "../DegreeFunc";
import { getObjId as degreeGetObjId } from "degrees/chromatic/caching";
import { getObjId as voicingGetObjId } from "voicings/relative/chromatic/caching/cache";

export type Key = {
  degree: Degree;
  voicing: Voicing;
};

export function getId(key: Key): string {
  return `(${degreeGetObjId(key.degree)}|${voicingGetObjId(key.voicing)})`;
}

export function getKey(func: DegreeFunc): Key {
  return {
    degree: func.degree,
    voicing: func.voicing,
  };
}

export function getObjId(func: DegreeFunc): string {
  return getId(getKey(func));
}
