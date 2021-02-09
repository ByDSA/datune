import { NumberArray } from "@datune/utils";

export type ChromaticChordData = ChromaticChordSingleData[];
export type ChromaticChordSingleData = { h: string, n: NumberArray, p: NumberArray };