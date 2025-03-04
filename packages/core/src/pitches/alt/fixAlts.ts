import { Pitches as CP } from "pitches/chromatic";

export function fixAlts(alts: number): number {
  let fixed = alts % CP.NUMBER;

  if (fixed < -CP.NUMBER / 2)
    fixed += CP.NUMBER;
  else if (fixed > CP.NUMBER / 2)
    fixed -= CP.NUMBER;

  return fixed;
}
