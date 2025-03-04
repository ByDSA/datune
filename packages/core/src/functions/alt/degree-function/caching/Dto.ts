import type { Degree } from "degrees/alt";
import type { Voicing } from "voicings/alt";
import { hash as hashVoicing } from "voicings/relative/alt/caching/hashObj";
import { hash as hashDegree } from "degrees/alt/caching/hash";

export type Dto = {
  degree: Degree;
  voicing: Voicing;
};

export function hashDto(obj: Dto): string {
  const voicingHashCode = hashVoicing(obj.voicing);
  const degreeHashCode = hashDegree(obj.degree);

  return `(${degreeHashCode})|(${voicingHashCode})`;
}
