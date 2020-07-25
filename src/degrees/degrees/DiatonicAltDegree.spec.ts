import { IntervalDiatonic } from "../../interval/IntervalDiatonic";
import { IntervalDiatonicAlt } from "../../interval/IntervalDiatonicAlt";
import * as precalc from "../../precalc";
import { DiatonicAltDegree } from "./DiatonicAltDegree";
import { DiatonicDegree } from "./DiatonicDegree";
precalc.diatonicAltDegrees();
precalc.intervalDiatonicAlts();
precalc.intervalDiatonics();
precalc.chromatics();
precalc.scaleChromatics();

test('DiatonicAltDegree- getAdd: bVII + a1 = VII', () => {
    let diatonicAltDegree = DiatonicAltDegree.bVII;
    let intervalDiatonic = IntervalDiatonic.UNISON;
    let intervalDiatonicAlt = IntervalDiatonicAlt.fromIntervals(1, intervalDiatonic);

    let sum = diatonicAltDegree.getAdd(intervalDiatonicAlt);
    let expected = DiatonicAltDegree.VII;

    expect(sum).toEqual(expected);
});

test('getAdd: I + m3 = bIII', () => {
    let diatonicAltDegree = DiatonicAltDegree.I;
    let intervalDiatonicAlt = IntervalDiatonicAlt.MINOR_THIRD;

    let sum = diatonicAltDegree.getAdd(intervalDiatonicAlt);
    let expected = DiatonicAltDegree.bIII;

    expect(sum).toEqual(expected);
});

test('getAdd: I + P1 = I', () => {
    let diatonicAltDegree = DiatonicAltDegree.I;
    let intervalDiatonicAlt = IntervalDiatonicAlt.PERFECT_UNISON;

    let sum = diatonicAltDegree.getAdd(intervalDiatonicAlt);
    let expected = DiatonicAltDegree.I;

    expect(sum).toBe(expected);
});

test('getAdd: I - P1 = I', () => {
    let diatonicAltDegree = DiatonicAltDegree.I;
    let intervalDiatonicAlt = IntervalDiatonicAlt.PERFECT_UNISON;

    let sum = diatonicAltDegree.getSub(intervalDiatonicAlt);
    let expected = DiatonicAltDegree.I;

    expect(sum).toBe(expected);
});

test('DiatonicAltDegree- semis: bI.semis == VII.semis', () => {
    let diatonicAltDegree1 = DiatonicAltDegree.from(DiatonicDegree.I, -1);
    let diatonicAltDegree2 = DiatonicAltDegree.VII;

    expect(diatonicAltDegree1.semis).toEqual(diatonicAltDegree2.semis);
});