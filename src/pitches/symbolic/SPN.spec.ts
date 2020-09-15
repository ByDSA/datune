import { Chromatic } from "../../degrees/Chromatic";
import { Language } from "../../lang/Language";
import * as init from "../../initializer";
import { Settings } from "../../settings/Settings";
import { SPN } from "./SPN";
init.spns.default();

test('SPN - precalc - C5', () => {
    let spn = SPN.C5;
    expect(spn).toBeDefined();
    let chromatic: Chromatic = spn.chromatic;
    let octave = spn.octave;

    let expectedChromatic: Chromatic = Chromatic.C;
    let expectedOctave: number = 5;

    expect(chromatic).toEqual(expectedChromatic);
    expect(octave).toEqual(expectedOctave);
});

test('SPN - precalc - A4', () => {
    let spn = SPN.A4;
    let chromatic: Chromatic = spn.chromatic;
    let octave = spn.octave;

    let expectedChromatic: Chromatic = Chromatic.A;
    let expectedOctave: number = 4;

    expect(chromatic).toBe(expectedChromatic);
    expect(octave).toBe(expectedOctave);
});

test('SPN - precalc - C0', () => {
    let spn = SPN.C0;
    let chromatic: Chromatic = spn.chromatic;
    let octave = spn.octave;

    let expectedChromatic: Chromatic = Chromatic.C;
    let expectedOctave: number = 0;

    expect(chromatic).toBe(expectedChromatic);
    expect(octave).toBe(expectedOctave);
});

test('SPN - precalc - C_S1', () => {
    let spn = SPN.C_S1;
    let chromatic: Chromatic = spn.chromatic;
    let octave = spn.octave;

    let expectedChromatic: Chromatic = Chromatic.C;
    let expectedOctave: number = -1;

    expect(chromatic).toBe(expectedChromatic);
    expect(octave).toBe(expectedOctave);
});

test('SPN - precalc - A_S1', () => {
    let spn = SPN.A_S1;
    let chromatic: Chromatic = spn.chromatic;
    let octave = spn.octave;

    let expectedChromatic: Chromatic = Chromatic.A;
    let expectedOctave: number = -1;

    expect(chromatic).toBe(expectedChromatic);
    expect(octave).toBe(expectedOctave);
});

test('SPN - precalc - G8', () => {
    let spn = SPN.G8;
    let chromatic: Chromatic = spn.chromatic;
    let octave = spn.octave;

    let expectedChromatic: Chromatic = Chromatic.G;
    let expectedOctave: number = 8;

    expect(chromatic).toBe(expectedChromatic);
    expect(octave).toBe(expectedOctave);
});

test('SPN - precalc - G9', () => {
    let spn = SPN.G9;
    let chromatic: Chromatic = spn.chromatic;
    let octave = spn.octave;

    let expectedChromatic: Chromatic = Chromatic.G;
    let expectedOctave: number = 9;

    expect(chromatic).toBe(expectedChromatic);
    expect(octave).toBe(expectedOctave);
});


test('SPN - precalc - B7', () => {
    let spn = SPN.B7;
    let chromatic: Chromatic = spn.chromatic;
    let octave = spn.octave;

    let expectedChromatic: Chromatic = Chromatic.B;
    let expectedOctave: number = 7;

    expect(chromatic).toBe(expectedChromatic);
    expect(octave).toBe(expectedOctave);
});

test('SPN - from - is cached', () => {
    let spn = SPN.B7;
    let chromatic: Chromatic = spn.chromatic;
    let octave = spn.octave;

    let actual: SPN = SPN.from(chromatic, octave);

    expect(actual).toBe(spn);
});

test('SPN - from - not cached value', () => {
    let spn = SPN.B7;
    let chromatic: Chromatic = spn.chromatic;

    let actual: SPN = SPN.from(chromatic, 100);
    let actual2: SPN = SPN.from(chromatic, 100);

    expect(actual.octave).toBe(100);
    expect(actual.chromatic).toBe(chromatic);
    expect(actual).toBe(actual2);
});

test('SPN - toString - ENG - A4', () => {
    let spn = SPN.A4;
    Settings.lang = Language.ENG;
    let str: string = spn.toString();
    let expected = "A4";

    expect(str).toBe(expected);
});


test('SPN - toString - ESP - A4', () => {
    let spn = SPN.A4;
    Settings.lang = Language.ESP;
    let str: string = spn.toString();
    let expected = "La4";

    expect(str).toBe(expected);
});

test('next - A4 => AA4', () => {
    let spn = SPN.A4;
    let actual = spn.next;
    let expected = SPN.AA4;

    expect(actual).toBe(expected);
});

test('next - B4 => C5', () => {
    let spn = SPN.B4;
    let actual = spn.next;
    let expected = SPN.C5;

    expect(actual).toBe(expected);
});

test('next - last: B9 => C10', () => {
    let spn = SPN.B9;
    let actual = spn.next;
    let expected = SPN.from(Chromatic.C, 10);

    expect(actual).toBe(expected);
});

test('previous - A4 => GG4', () => {
    let spn = SPN.A4;
    let actual = spn.previous;
    let expected = SPN.GG4;

    expect(actual).toBe(expected);
});

test('next - C5 => B4', () => {
    let spn = SPN.C5;
    let actual = spn.previous;
    let expected = SPN.B4;

    expect(actual).toBe(expected);
});

test('next - last: C_S1 => C_S2', () => {
    let spn = SPN.C_S1;
    let actual = spn.previous;
    let expected = SPN.from(Chromatic.B, -2);

    expect(actual).toBe(expected);
});