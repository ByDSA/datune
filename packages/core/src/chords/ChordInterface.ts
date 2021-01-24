import { NonEmptyArray } from "@datune/utils";
import { Pattern } from "../voicings";

export interface ChordInterface<D, P extends Pattern<D, any>> {
    pattern: P;
    notes: NonEmptyArray<D>;
    has(note: D): boolean;
    length: number;
}