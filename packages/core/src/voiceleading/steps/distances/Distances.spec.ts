import { Chromatic } from "../../../pitches";
import { minDistanceBetweenArraysOfNotes } from "./Distances";

it("min distances", () => {
    const a1 = [Chromatic.C, Chromatic.E, Chromatic.G];
    const a2 = [Chromatic.B, Chromatic.D, Chromatic.F];
    const actual = minDistanceBetweenArraysOfNotes(a1, a2);
    const expected = 4;
    expect(actual).toBe(expected);
})