import { DiatonicAlt } from "../../../..";
import { SPNAlt } from "../SPNAlt";

test('from - is cached', () => {
    let spn = SPNAlt.B7;
    let diatonicAlt: DiatonicAlt = spn.degree;
    let octave = spn.octave;

    let actual: SPNAlt = SPNAlt.from(diatonicAlt, octave);

    expect(actual).toBe(spn);
});

test('from - not cached value', () => {
    let spn = SPNAlt.B7;
    let diatonicAlt: DiatonicAlt = spn.degree;

    let actual: SPNAlt = SPNAlt.from(diatonicAlt, 100);
    let actual2: SPNAlt = SPNAlt.from(diatonicAlt, 100);

    expect(actual.octave).toBe(100);
    expect(actual.degree).toBe(diatonicAlt);
    expect(actual).toBe(actual2);
});