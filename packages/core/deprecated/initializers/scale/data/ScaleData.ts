import { NumberArray } from "@datune/utils";

export type ScaleData = ScaleSingleData[];
export type ScaleSingleData = { h: string, i: NumberArray, d: NumberArray, m: NumberArray[] };