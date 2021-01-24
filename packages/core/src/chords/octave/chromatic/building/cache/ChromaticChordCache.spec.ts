import { Chromatic } from "pitches";
import { ChromaticChord } from "../../ChromaticChord"

it("", () => {
    let actual1 = ChromaticChord.fromNotes(Chromatic.C, Chromatic.E, Chromatic.G);
    let actual2 = ChromaticChord.fromNotes(Chromatic.C, Chromatic.E, Chromatic.G);

    expect(actual1).toBe(actual2);
})