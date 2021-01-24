import { DiatonicAlt } from "../../pitches";
import { Chromatic } from "../../pitches";
import { RelativePitch } from "./RelativePitch";

test('from - C 0', () => {
    let degree = Chromatic.C;
    let octaveRelative = 0;
    let actual = RelativePitch.from(degree, octaveRelative);

    expect(actual.octaveRelative).toEqual(octaveRelative);
    expect(actual.degree).toEqual(degree);
});

test('from - Bb 2', () => {
    let degree = DiatonicAlt.Bb;
    let octaveRelative = 2;
    let actual = RelativePitch.from(degree, octaveRelative);

    expect(actual.octaveRelative).toEqual(octaveRelative);
    expect(actual.degree).toEqual(degree);
});