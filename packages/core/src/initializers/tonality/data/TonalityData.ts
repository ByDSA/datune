import { NumberArray } from "@datune/utils";

export type TonalityData = TonalitySingleData[];
export type TonalitySingleData = { h: string, s: NumberArray, n: NumberArray, r3: NumberArray | null, r4: NumberArray | null };