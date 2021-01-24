import { Key, MusicalDuration, Note, SPN } from "@datune/core";
import { Interval } from "@datune/utils";
import { NoteEvent } from "./NoteEvent";
import { NotesSequence } from "./NotesSequence";

function generateCMajorTest() {
    let s = new NotesSequence();
    for (let n of Key.C.notes.map(n => Note.fromInt(n.valueOf()))) {
        let spn = <SPN>SPN.from(n, 4);
        let note = NoteEvent.from(spn, MusicalDuration.QUARTER);
        s.addEventAtEnd(note);
    }

    return s;
}

it("every note time marks", () => {
    const s = generateCMajorTest();

    for (let n = 0; n < 7; n++) {
        let node = s.nodes[n];
        expect(node.from).toEqual(MusicalDuration.ZERO.withAdd(MusicalDuration.QUARTER.withMult(n)));
        expect(node.to).toEqual(MusicalDuration.QUARTER.withMult(n + 1));
    }
})

it("musical length", () => {
    const s = generateCMajorTest();

    expect(s.duration).toEqual(MusicalDuration.QUARTER.withMult(7));
})

it("number of notes", () => {
    const s = generateCMajorTest();

    expect(s.nodes.length).toBe(7);
})

it("remove", () => {
    const s = generateCMajorTest();

    const n2 = s.nodes[2];

    expect(s.nodes.indexOf(n2)).not.toBe(-1);

    let ok = s.removeNode(n2);

    expect(ok).toBeTruthy();
    expect(s.nodes.indexOf(n2)).toBe(-1);
    expect(s.nodes.length).toBe(6);

    ok = s.removeNode(n2);
    expect(ok).toBeFalsy();
    expect(s.nodes.length).toBe(6);
})

it("pick by node position", () => {
    const s = generateCMajorTest();

    expect(s.nodes[4].event.pitch.degree).toBe(Note.G);
})

it(`a`, () => {
    const expected = Note.D;
    const actual = Note.C.withShift(2);

    expect(actual).toBe(expected);
});

it("pick by interval", () => {
    const s = generateCMajorTest();

    const interval = Interval.fromInclusiveToExclusive(MusicalDuration.QUARTER, MusicalDuration.WHOLE);
    const nodes = s.getNodesAtInterval(interval);
    const notes = nodes.map(node => node.event.pitch.degree);

    expect(notes).toEqual([
        Note.D,
        Note.E,
        Note.F
    ]);
})