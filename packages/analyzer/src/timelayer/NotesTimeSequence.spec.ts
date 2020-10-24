import { DiatonicAlt } from "@datune/core/degrees/DiatonicAlt";
import * as init from "@datune/core/initializer";
import { SPN } from "@datune/core/pitches/symbolic/SPN";
import { MusicalDuration } from "@datune/core/tempo/MusicalDuration";
import { Tonality } from "@datune/core/tonalities/Tonality";
import { Interval } from "@datune/utils/Interval";
import { Note } from "./Note";
import { NotesTimeSequence } from "./NotesTimeSequence";
init.musicalDurations.default();
init.diatonicAlts.default();
init.tonalities.default();
init.spns.default();

function generateCMajorTest() {
    let s = new NotesTimeSequence();
    for (let diatonicAlt of Tonality.C.notes) {
        let spn = SPN.from(diatonicAlt, 4);
        let note = Note.from(spn, MusicalDuration.QUARTER);
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

    expect(s.nodes[4].event.pitch.degree).toBe(DiatonicAlt.G);
})

it("pick by interval", () => {
    const s = generateCMajorTest();

    const interval = Interval.fromInclusiveToExclusive(MusicalDuration.QUARTER, MusicalDuration.WHOLE);
    const nodes = s.getNodesAtInterval(interval);

    const diatonicAlts = nodes.map(node => node.event.pitch.degree);

    expect(diatonicAlts).toEqual([
        DiatonicAlt.D,
        DiatonicAlt.E,
        DiatonicAlt.F
    ]);
})