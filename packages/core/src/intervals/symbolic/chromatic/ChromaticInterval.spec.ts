import { Chromatic } from "../../../pitches";
import { ChromaticInterval } from "./ChromaticInterval";

it("chromaticInterval C->A", () => {
    let actual = ChromaticInterval.between(Chromatic.C, Chromatic.A);
    let expected = ChromaticInterval.MAJOR_SIXTH;

    expect(actual).toBe(expected);
})

it("chromaticInterval A->C", () => {
    let actual = ChromaticInterval.between(Chromatic.A, Chromatic.C);
    let expected = ChromaticInterval.MINOR_THIRD;

    expect(actual).toBe(expected);
})

it("chromaticInterval B->C", () => {
    let actual = ChromaticInterval.between(Chromatic.B, Chromatic.C);
    let expected = ChromaticInterval.MINOR_SECOND;

    expect(actual).toBe(expected);
})

it("chromaticInterval C->B", () => {
    let actual = ChromaticInterval.between(Chromatic.C, Chromatic.B);
    let expected = ChromaticInterval.MAJOR_SEVENTH;

    expect(actual).toBe(expected);
})