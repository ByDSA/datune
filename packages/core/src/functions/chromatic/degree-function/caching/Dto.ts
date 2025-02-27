import { Degree } from "degrees/chromatic";
import { Voicing } from "voicings/chromatic";
import { Degrees } from "degrees/chromatic";
import { Voicings } from "voicings/chromatic";

export type Dto = {
  degree: Degree;
  voicing: Voicing;
};

export function hashDto(obj: Dto): string {
  return `(${Degrees.hash(obj.degree)}|${Voicings.hash(obj.voicing)})`;
}
