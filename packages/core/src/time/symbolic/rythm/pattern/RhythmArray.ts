export type RhythmArray = [1, ...(0 | 1)[]];
export namespace RhythmArray {
    export function from(...ints: RhythmArray): RhythmArray {
        return ints;
    }
}