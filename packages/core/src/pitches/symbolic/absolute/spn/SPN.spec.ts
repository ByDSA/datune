import { Language, Settings } from "../../../../config";
import { Chromatic } from "../../octave/chromatic/Chromatic";
import { SPN } from "./SPN";

it('SPN - precalc - C5', () => {
    let spn = SPN.C5;
    expect(spn).toBeDefined();
    let chromatic: Chromatic = spn.degree;
    let octave = spn.octave;

    let expectedChromatic: Chromatic = Chromatic.C;
    let expectedOctave: number = 5;

    expect(chromatic).toEqual(expectedChromatic);
    expect(octave).toEqual(expectedOctave);
});

it('SPN - precalc - A4', () => {
    let spn = SPN.A4;
    let chromatic: Chromatic = spn.degree;
    let octave = spn.octave;

    let expectedChromatic: Chromatic = Chromatic.A;
    let expectedOctave: number = 4;

    expect(chromatic).toBe(expectedChromatic);
    expect(octave).toBe(expectedOctave);
});

it('SPN - precalc - C0', () => {
    let spn = SPN.C0;
    let chromatic: Chromatic = spn.degree;
    let octave = spn.octave;

    let expectedChromatic: Chromatic = Chromatic.C;
    let expectedOctave: number = 0;

    expect(chromatic).toBe(expectedChromatic);
    expect(octave).toBe(expectedOctave);
});

it('SPN - precalc - C_S1', () => {
    let spn = SPN.C_S1;
    let chromatic: Chromatic = spn.degree;
    let octave = spn.octave;

    let expectedChromatic: Chromatic = Chromatic.C;
    let expectedOctave: number = -1;

    expect(chromatic).toBe(expectedChromatic);
    expect(octave).toBe(expectedOctave);
});

it('SPN - precalc - A_S1', () => {
    let spn = SPN.A_S1;
    let chromatic: Chromatic = spn.degree;
    let octave = spn.octave;

    let expectedChromatic: Chromatic = Chromatic.A;
    let expectedOctave: number = -1;

    expect(chromatic).toBe(expectedChromatic);
    expect(octave).toBe(expectedOctave);
});

it('SPN - precalc - G8', () => {
    let spn = SPN.G8;
    let chromatic: Chromatic = spn.degree;
    let octave = spn.octave;

    let expectedChromatic: Chromatic = Chromatic.G;
    let expectedOctave: number = 8;

    expect(chromatic).toBe(expectedChromatic);
    expect(octave).toBe(expectedOctave);
});

it('SPN - precalc - G9', () => {
    let spn = SPN.G9;
    let chromatic: Chromatic = spn.degree;
    let octave = spn.octave;

    let expectedChromatic: Chromatic = Chromatic.G;
    let expectedOctave: number = 9;

    expect(chromatic).toBe(expectedChromatic);
    expect(octave).toBe(expectedOctave);
});


it('SPN - precalc - B7', () => {
    let spn = SPN.B7;
    let chromatic: Chromatic = spn.degree;
    let octave = spn.octave;

    let expectedChromatic: Chromatic = Chromatic.B;
    let expectedOctave: number = 7;

    expect(chromatic).toBe(expectedChromatic);
    expect(octave).toBe(expectedOctave);
});

it('SPN - from - is cached', () => {
    let spn = SPN.B7;
    let chromatic: Chromatic = spn.degree;
    let octave = spn.octave;

    let actual = SPN.from(chromatic, octave);

    expect(actual).toBe(spn);
});

it('SPN - from - not cached value', () => {
    let spn = SPN.B7;
    let chromatic: Chromatic = spn.degree;

    let actual = SPN.from(chromatic, 100);

    expect(actual).toBeNull();
});

it('SPN - toString - ENG - A4', () => {
    let spn = SPN.A4;
    Settings.lang = Language.ENG;
    let str: string = spn.toString();
    let expected = "A4";

    expect(str).toBe(expected);
});

it('SPN - toString - ESP - A4', () => {
    let spn = SPN.A4;
    Settings.lang = Language.ESP;
    let str: string = spn.toString();
    let expected = "La4";

    expect(str).toBe(expected);
});