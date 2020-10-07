import { DiatonicAlt } from "../degrees/DiatonicAlt";
import * as init from "../initializer";
import { SPN } from "../pitches/symbolic/SPN";
import { MusicalDuration } from "../tempo/MusicalDuration";
import { Tonality } from "../tonalities/Tonality";
import { Interval } from "../utils/Interval";
import { Note } from "./Note";
import { NotesSequence } from "./NotesSequence";
init.musicalDurations.default();
init.diatonicAlts.default();
init.tonalities.default();
init.spns.default();

function generateCMajorTest() {
    let s = new NotesSequence();
    for (let diatonicAlt of Tonality.C.notes) {
        let spn = SPN.from(diatonicAlt, 4);
        let note = Note.from(spn, MusicalDuration.QUARTER);
        s.addAtEnd(note);
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

it("pick by node position", () => {
    const s = generateCMajorTest();

    expect(s.nodes[4].event.pitch.degree).toBe(DiatonicAlt.G);
})

it("pick by interval", () => {
    const s = generateCMajorTest();

    const interval = Interval.fromInclusiveToExclusive(MusicalDuration.QUARTER, MusicalDuration.WHOLE);
    const nodes = s.getAtInterval(interval);

    const diatonicAlts = nodes.map(node => node.event.pitch.degree);

    expect(diatonicAlts).toEqual([
        DiatonicAlt.D,
        DiatonicAlt.E,
        DiatonicAlt.F
    ]);
})