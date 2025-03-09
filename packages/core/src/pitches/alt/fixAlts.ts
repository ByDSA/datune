import { NUMBER as CNUMBER } from "pitches/chromatic/constants/Number";

;

export function fixAlts(alts: number): number {
  let fixed = alts % CNUMBER;

  if (fixed < -CNUMBER / 2)
    fixed += CNUMBER;
  else if (fixed > CNUMBER / 2)
    fixed -= CNUMBER;

  return fixed;
}
