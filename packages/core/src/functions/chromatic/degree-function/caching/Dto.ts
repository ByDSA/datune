import type { Degree } from "degrees/chromatic";
import type { Voicing } from "voicings/chromatic";
import { hash as hashDegree } from "degrees/chromatic/caching";
import { hash as hashVoicing } from "voicings/relative/chromatic/caching/hash";

export type Dto = {
  degree: Degree;
  voicing: Voicing;
};

export function hashDto(obj: Dto): string {
  return `(${hashDegree(obj.degree)}|${hashVoicing(obj.voicing)})`;
}
