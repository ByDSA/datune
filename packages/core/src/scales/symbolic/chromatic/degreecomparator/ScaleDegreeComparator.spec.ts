import { DegreeAlt } from "../../alt/degreealt/DegreeAlt";
import { DiatonicDegree } from "../../degrees/DiatonicDegree";
import { Degree } from "../degree/Degree";
import { Scale } from "../scale/Scale";
import { ScaleDegreeComparator } from "./ScaleDegreeComparator";

it('Scale.MAJOR and itself enharmonic', () => {
    let scaleComparator = ScaleDegreeComparator.from(Scale.MAJOR, Scale.MAJOR);
    scaleComparator.compare();
    let common: Set<number> = scaleComparator.common;

    let expected = [
        Degree.I,
        Degree.II,
        Degree.III,
        Degree.IV,
        Degree.V,
        Degree.VI,
        Degree.VII,
    ];

    for (const degree of expected)
        expect(common.has(degree)).toEqual(true);
})

it('Scale.LYDIAN and Scale.LOCRIAN enharmonic', () => {
    let scaleComparator = ScaleDegreeComparator.from(Scale.LYDIAN, Scale.LOCRIAN);
    scaleComparator.compare();
    let common: Set<number> = scaleComparator.common;

    let expected = [
        Degree.I,
        DegreeAlt.from(DiatonicDegree.IV, 1).degree,
        DegreeAlt.from(DiatonicDegree.V, -1).degree,
    ];

    expect(common.size).toEqual(2);
    for (const degree of expected)
        expect(common.has(degree)).toBeTruthy();
})

it('Scale.BLUES_b5 and Scale.BLUES_a4 are enharmonic', () => {
    let scaleComparator = ScaleDegreeComparator.from(Scale.BLUES_b5, Scale.BLUES_a4);
    scaleComparator.compare();
    let common: Set<number> = scaleComparator.common;

    let expected = [
        DegreeAlt.I.degree,
        DegreeAlt.bIII.degree,
        DegreeAlt.IV.degree,
        DegreeAlt.bV.degree,
        DegreeAlt.V.degree,
        DegreeAlt.bVII.degree,
    ];

    expect(common.size).toEqual(6);
    for (const degree of expected)
        expect(common.has(degree)).toBeTruthy();
})