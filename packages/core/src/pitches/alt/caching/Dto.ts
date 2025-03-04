import type { Pitch as DPitch } from "pitches/diatonic";

export type Dto = {
  diatonic: DPitch;
  alts: number;
};

export const hashDto = (dto: Dto): string => `${+dto.diatonic}:${dto.alts}`;
