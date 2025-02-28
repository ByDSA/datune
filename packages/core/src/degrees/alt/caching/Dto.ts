import { Degree as DiatonicDegree } from "degrees/diatonic";

export type Dto = {
  diatonicDegree: DiatonicDegree;
  alts: number;
 };

export function hashDto(obj: Dto): string {
  return `${+obj.diatonicDegree}:${obj.alts}`;
}
