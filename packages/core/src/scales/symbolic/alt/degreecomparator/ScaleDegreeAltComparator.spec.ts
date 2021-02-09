import { DegreeAlt } from '../degreealt/DegreeAlt';
import { ScaleAlt } from '../scalealt/ScaleAlt';
import { ScaleDegreeAltComparator } from "./ScaleDegreeAltComparator";

it('Scale.MAJOR and itself nonenharmonic', () => {
    let scaleComparator = ScaleDegreeAltComparator.from(ScaleAlt.MAJOR, ScaleAlt.MAJOR);
    scaleComparator.compare();
    let common: Set<DegreeAlt> = scaleComparator.common;

    let expected = [
        DegreeAlt.I,
        DegreeAlt.II,
        DegreeAlt.III,
        DegreeAlt.IV,
        DegreeAlt.V,
        DegreeAlt.VI,
        DegreeAlt.VII,
    ];

    for (const degree of expected)
        expect(common.has(degree)).toEqual(true);
});

it('Scale.MAJOR and Scale.MINOR nonenharmonic', () => {
    let scaleComparator = ScaleDegreeAltComparator.from(ScaleAlt.MAJOR, ScaleAlt.MINOR);
    scaleComparator.compare();
    let common: Set<DegreeAlt> = scaleComparator.common;

    let expected = [
        DegreeAlt.I,
        DegreeAlt.II,
        DegreeAlt.IV,
        DegreeAlt.V
    ];

    expect(common.size).toEqual(4);
    for (const degree of expected)
        expect(common.has(degree)).toEqual(true);
});

it('Scale.LYDIAN and Scale.LOCRIAN nonenharmonic', () => {
    let scaleComparator = ScaleDegreeAltComparator.from(ScaleAlt.LYDIAN, ScaleAlt.LOCRIAN);
    scaleComparator.compare();
    let common: Set<DegreeAlt> = scaleComparator.common;

    let expected = [
        DegreeAlt.I
    ];

    expect(common.size).toEqual(1);
    for (const degree of expected)
        expect(common.has(degree)).toEqual(true);
});