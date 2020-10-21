import * as init from "../../initializer";
import { IntervalDiatonic } from "../../intervals/IntervalDiatonic";
import { IntervalDiatonicAlt } from "../../intervals/IntervalDiatonicAlt";
import { DiatonicAltDegree } from "./DiatonicAltDegree";
import { DiatonicDegree } from "./DiatonicDegree";
init.diatonicAltDegrees.default();
init.intervalDiatonicAlts.default();
init.intervalDiatonics.default();
init.chromatics.default();
init.scaleChromatics.default();

test('precalc not undefined', () => {
    expect(DiatonicAltDegree.bVII).toBeDefined();
});

test('withAdd: bVII + a1 = VII', () => {
    let diatonicAltDegree = DiatonicAltDegree.bVII;
    let intervalDiatonic = IntervalDiatonic.UNISON;
    let intervalDiatonicAlt = IntervalDiatonicAlt.fromIntervals(1, intervalDiatonic);

    let sum = diatonicAltDegree.withAdd(intervalDiatonicAlt);
    let expected = DiatonicAltDegree.VII;

    expect(sum).toEqual(expected);
});

test('withAdd: I + m3 = bIII', () => {
    let diatonicAltDegree = DiatonicAltDegree.I;
    let intervalDiatonicAlt = IntervalDiatonicAlt.MINOR_THIRD;

    let sum = diatonicAltDegree.withAdd(intervalDiatonicAlt);
    let expected = DiatonicAltDegree.bIII;

    expect(sum).toEqual(expected);
});

test('withAdd: I + P1 = I', () => {
    let diatonicAltDegree = DiatonicAltDegree.I;
    let intervalDiatonicAlt = IntervalDiatonicAlt.PERFECT_UNISON;

    let sum = diatonicAltDegree.withAdd(intervalDiatonicAlt);
    let expected = DiatonicAltDegree.I;

    expect(sum).toBe(expected);
});

test('withSub: I - P1 = I', () => {
    let diatonicAltDegree = DiatonicAltDegree.I;
    let intervalDiatonicAlt = IntervalDiatonicAlt.PERFECT_UNISON;

    let sum = diatonicAltDegree.withSub(intervalDiatonicAlt);
    let expected = DiatonicAltDegree.I;

    expect(sum).toBe(expected);
});

test('semis: bI.semis == VII.semis', () => {
    let diatonicAltDegree1 = DiatonicAltDegree.from(DiatonicDegree.I, -1);
    let diatonicAltDegree2 = DiatonicAltDegree.VII;

    expect(diatonicAltDegree1.semis).toEqual(diatonicAltDegree2.semis);
});

it("toString", () => {
    expect(DiatonicAltDegree.I.toString()).toBe("I");
    expect(DiatonicAltDegree.VII.toString()).toBe("VII");
})