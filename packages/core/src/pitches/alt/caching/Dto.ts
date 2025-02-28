import type { Pitch as Diatonic } from "pitches/diatonic";

export type Dto = {
  diatonic: Diatonic;
  alts: number;
};

export const hashDto = (dto: Dto): string => `${+dto.diatonic}:${dto.alts}`;
