import { Chromatic } from "../../pitches";
import { NoteSet } from "./NoteSet";

it("cache works correctly", () => {
    let noteSet1 = NoteSet.from(Chromatic.C, Chromatic.G);
    let noteSet2 = NoteSet.from(Chromatic.C, Chromatic.G);

    expect(noteSet1).toBe(noteSet2);
})

it("no matter order", () => {
    let noteSet1 = NoteSet.from(Chromatic.C, Chromatic.G);
    let noteSet2 = NoteSet.from(Chromatic.G, Chromatic.C);

    expect(noteSet1).toBe(noteSet2);
})

it("static values", () => {
    let noteSet1 = NoteSet.C5;
    let noteSet2 = NoteSet.from(Chromatic.C, Chromatic.G);

    expect(noteSet1).toBe(noteSet2);
})