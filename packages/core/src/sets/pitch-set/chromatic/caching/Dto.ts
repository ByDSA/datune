/* eslint-disable @typescript-eslint/naming-convention */
import type { Pitch } from "pitches/chromatic";
import { Pitches } from "pitches/chromatic";

export type Dto = Set<Pitch>;

export const hashDto = (dto: Dto): string => {
  const { A, AA, B, C, CC, D, DD, E, F, FF, G, GG } = Pitches;
  const hasC = dto.has(C) ? 1 : 0;
  const hasCC = dto.has(CC) ? 1 : 0;
  const hasD = dto.has(D) ? 1 : 0;
  const hasDD = dto.has(DD) ? 1 : 0;
  const hasE = dto.has(E) ? 1 : 0;
  const hasF = dto.has(F) ? 1 : 0;
  const hasFF = dto.has(FF) ? 1 : 0;
  const hasG = dto.has(G) ? 1 : 0;
  const hasGG = dto.has(GG) ? 1 : 0;
  const hasA = dto.has(A) ? 1 : 0;
  const hasAA = dto.has(AA) ? 1 : 0;
  const hasB = dto.has(B) ? 1 : 0;
  const intHash = (hasC * 2)
        + (hasCC * 3)
        + (hasD * 5)
        + (hasDD * 7)
        + (hasE * 11)
        + (hasF * 13)
        + (hasFF * 17)
        + (hasG * 19)
        + (hasGG * 23)
        + (hasA * 29)
        + (hasAA * 31)
        + (hasB * 37);

  return intHash.toString();
};
