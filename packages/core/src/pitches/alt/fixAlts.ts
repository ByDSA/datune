import { Pitches as CPitches } from "pitches/chromatic";

export function fixAlts(alts: number): number {
  let fixed = alts % CPitches.NUMBER;

  if (fixed < -CPitches.NUMBER / 2)
    fixed += CPitches.NUMBER;
  else if (fixed > CPitches.NUMBER / 2)
    fixed -= CPitches.NUMBER;

  return fixed;
}
