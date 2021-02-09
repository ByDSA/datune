import { SPN } from "../../../../../pitches";
import { NearStepsGen } from "./NearStepsGenerator";

it("near motion C5-E5-G5 in C", () => {
    const fromNotes = [SPN.C5, SPN.E5, SPN.G5];
    let nearMotion = NearStepsGen.create()
        .notesLength(fromNotes.length)
        .maxStep(2);
    let steps = nearMotion.generateSteps();
    let actual = steps.length;
    let expected = 125 - 1;

    expect(actual).toEqual(expected);
})