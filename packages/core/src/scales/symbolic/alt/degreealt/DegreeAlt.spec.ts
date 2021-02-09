import { IntervalDiatonicAlt } from "../../../../intervals";
import { IntervalDiatonic } from "../../../../intervals";
import { DegreeAlt } from "./DegreeAlt";
import { DiatonicDegree } from "../../degrees/DiatonicDegree";

it('precalc not undefined', () => {
    expect(DegreeAlt.bVII).toBeDefined();
});

it('withAdd: bVII + a1 = VII', () => {
    let diatonicAltDegree = DegreeAlt.bVII;
    let intervalDiatonic = IntervalDiatonic.UNISON;
    let intervalDiatonicAlt = IntervalDiatonicAlt.fromIntervals(1, intervalDiatonic);

    let sum = diatonicAltDegree.withAdd(intervalDiatonicAlt);
    let expected = DegreeAlt.VII;

    expect(sum).toEqual(expected);
});

it('withAdd: I + m3 = bIII', () => {
    let diatonicAltDegree = DegreeAlt.I;
    let intervalDiatonicAlt = IntervalDiatonicAlt.MINOR_THIRD;

    let sum = diatonicAltDegree.withAdd(intervalDiatonicAlt);
    let expected = DegreeAlt.bIII;

    expect(sum).toEqual(expected);
});

it('withAdd: I + P1 = I', () => {
    let diatonicAltDegree = DegreeAlt.I;
    let intervalDiatonicAlt = IntervalDiatonicAlt.PERFECT_UNISON;

    let sum = diatonicAltDegree.withAdd(intervalDiatonicAlt);
    let expected = DegreeAlt.I;

    expect(sum).toBe(expected);
});

it('withSub: I - P1 = I', () => {
    let diatonicAltDegree = DegreeAlt.I;
    let intervalDiatonicAlt = IntervalDiatonicAlt.PERFECT_UNISON;

    let sum = diatonicAltDegree.withSub(intervalDiatonicAlt);
    let expected = DegreeAlt.I;

    expect(sum).toBe(expected);
});

it('semis: bI.semis == VII.semis', () => {
    let diatonicAltDegree1 = DegreeAlt.from(DiatonicDegree.I, -1);
    let diatonicAltDegree2 = DegreeAlt.VII;

    expect(diatonicAltDegree1.degree).toEqual(diatonicAltDegree2.degree);
});

it("toString", () => {
    expect(DegreeAlt.I.toString()).toBe("I");
    expect(DegreeAlt.VII.toString()).toBe("VII");
})