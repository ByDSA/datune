import { ScaleChromatic } from './ScaleChromatic';

export default () => {
    if (ScaleChromatic.MAJOR)
        return;

    ScaleChromatic.MAJOR = ScaleChromatic.fromIntraIntervals(2, 2, 1, 2, 2, 2, 1);

    ScaleChromatic.DORIAN = ScaleChromatic.MAJOR.getMode(2);
    ScaleChromatic.PHRYGIAN = ScaleChromatic.MAJOR.getMode(3);
    ScaleChromatic.LYDIAN = ScaleChromatic.MAJOR.getMode(4);
    ScaleChromatic.MIXOLYDIAN = ScaleChromatic.MAJOR.getMode(5);
    ScaleChromatic.MINOR = ScaleChromatic.MAJOR.getMode(6);
    ScaleChromatic.LOCRIAN = ScaleChromatic.MAJOR.getMode(7);

    ScaleChromatic.HARMONIC_MINOR = ScaleChromatic.fromIntraIntervals(2, 1, 2, 2, 1, 3, 1);
    ScaleChromatic.LOCRIAN_a6 = ScaleChromatic.HARMONIC_MINOR.getMode(2);
    ScaleChromatic.IONIAN_a5 = ScaleChromatic.HARMONIC_MINOR.getMode(3);
    ScaleChromatic.DORIAN_a4 = ScaleChromatic.HARMONIC_MINOR.getMode(4);
    ScaleChromatic.MIXOLYDIAN_b9_b13 = ScaleChromatic.HARMONIC_MINOR.getMode(5);
    ScaleChromatic.LYDIAN_a2 = ScaleChromatic.HARMONIC_MINOR.getMode(6);
    ScaleChromatic.SUPERLOCRIAN_bb7 = ScaleChromatic.HARMONIC_MINOR.getMode(7);

    ScaleChromatic.HARMONIC_MAJOR = ScaleChromatic.fromIntraIntervals(2, 2, 1, 2, 1, 3, 1);
    ScaleChromatic.DORIAN_b5 = ScaleChromatic.HARMONIC_MAJOR.getMode(2);
    ScaleChromatic.PHRYGIAN_b4 = ScaleChromatic.HARMONIC_MAJOR.getMode(3);
    ScaleChromatic.LYDIAN_b3 = ScaleChromatic.HARMONIC_MAJOR.getMode(4);
    ScaleChromatic.MIXOLYDIAN_b2 = ScaleChromatic.HARMONIC_MAJOR.getMode(5);
    ScaleChromatic.AEOLIAN_b1 = ScaleChromatic.HARMONIC_MAJOR.getMode(6);
    ScaleChromatic.LOCRIAN_bb7 = ScaleChromatic.HARMONIC_MAJOR.getMode(7);

    ScaleChromatic.MELODIC_MINOR = ScaleChromatic.fromIntraIntervals(2, 1, 2, 2, 2, 2, 1);
    ScaleChromatic.DORIAN_b2 = ScaleChromatic.MELODIC_MINOR.getMode(2);
    ScaleChromatic.LYDIAN_a5 = ScaleChromatic.MELODIC_MINOR.getMode(3);
    ScaleChromatic.LYDIAN_b7 = ScaleChromatic.MELODIC_MINOR.getMode(4);
    ScaleChromatic.MIXOLYDIAN_b13 = ScaleChromatic.MELODIC_MINOR.getMode(5);
    ScaleChromatic.LOCRIAN_a2 = ScaleChromatic.MELODIC_MINOR.getMode(6);
    ScaleChromatic.SUPERLOCRIAN = ScaleChromatic.MELODIC_MINOR.getMode(7);

    ScaleChromatic.DOUBLE_HARMONIC = ScaleChromatic.fromIntraIntervals(1, 3, 1, 2, 1, 3, 1);
    ScaleChromatic.LYDIAN_a2_a6 = ScaleChromatic.DOUBLE_HARMONIC.getMode(2);
    ScaleChromatic.ULTRAPHRYGIAN = ScaleChromatic.DOUBLE_HARMONIC.getMode(3);
    ScaleChromatic.HUNGARIAN_MINOR = ScaleChromatic.DOUBLE_HARMONIC.getMode(4);
    ScaleChromatic.ORIENTAL = ScaleChromatic.DOUBLE_HARMONIC.getMode(5);
    ScaleChromatic.IONIAN_AUGMENTED_a2 = ScaleChromatic.DOUBLE_HARMONIC.getMode(6);
    ScaleChromatic.LOCRIAN_bb3_bb7 = ScaleChromatic.DOUBLE_HARMONIC.getMode(7);

    ScaleChromatic.NEAPOLITAN_MINOR = ScaleChromatic.fromIntraIntervals(1, 2, 2, 2, 1, 3, 1);
    ScaleChromatic.NEAPOLITAN_MAJOR = ScaleChromatic.fromIntraIntervals(1, 2, 2, 2, 2, 2, 1);

    ScaleChromatic.MESSIAEN_V_TRUNCATED = ScaleChromatic.fromIntraIntervals(1, 5, 1, 5);
    ScaleChromatic.MESSIAEN_INV_III_V_TRUNCATED_n2 = ScaleChromatic.fromIntraIntervals(1, 3, 1, 3, 1, 3);
    ScaleChromatic.HALF_DIMINISHED = ScaleChromatic.fromIntraIntervals(1, 2, 1, 2, 1, 2, 1, 2);
    ScaleChromatic.MESSIAEN_V = ScaleChromatic.fromIntraIntervals(1, 1, 4, 1, 1, 4);
    ScaleChromatic.RAGA_INDRUPRIYA_INDIA = ScaleChromatic.fromIntraIntervals(1, 3, 2, 3, 1, 2);
    ScaleChromatic.MESSIAEN_II_TRUNCATED_n3 = ScaleChromatic.fromIntraIntervals(3, 1, 2, 3, 1, 2);
    ScaleChromatic.MESSIAEN_III_INV = ScaleChromatic.fromIntraIntervals(2, 1, 1, 2, 1, 1, 2, 1, 1);
    ScaleChromatic.MESSIAEN_IV = ScaleChromatic.fromIntraIntervals(1, 1, 1, 3, 1, 1, 1, 3);
    ScaleChromatic.MESSIAEN_VI = ScaleChromatic.fromIntraIntervals(1, 1, 2, 2, 1, 1, 2, 2);
    ScaleChromatic.MESSIAEN_VII = ScaleChromatic.fromIntraIntervals(1, 1, 1, 1, 2, 1, 1, 1, 1, 2);

    ScaleChromatic.BLUES_b5 = ScaleChromatic.fromIntraIntervals(3, 2, 1, 1, 3, 2);
    ScaleChromatic.BLUES_a4 = ScaleChromatic.BLUES_b5;

    // 5
    ScaleChromatic.PENTATONIC_MINOR = ScaleChromatic.fromIntraIntervals(3, 2, 2, 3, 2);
    ScaleChromatic.PENTATONIC = ScaleChromatic.PENTATONIC_MINOR.getMode(2);
    ScaleChromatic.EGYPCIAN = ScaleChromatic.PENTATONIC_MINOR.getMode(3);
    ScaleChromatic.BLUES_MINOR = ScaleChromatic.PENTATONIC_MINOR.getMode(4);
    ScaleChromatic.BLUES_MAJOR = ScaleChromatic.PENTATONIC_MINOR.getMode(5);

    // Symmetric
    ScaleChromatic.CHROMATIC = ScaleChromatic.fromIntraIntervals(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
    ScaleChromatic.WHOLE_TONE = ScaleChromatic.fromIntraIntervals(2, 2, 2, 2, 2, 2);
    ScaleChromatic.AUGMENTED_TRIAD = ScaleChromatic.fromIntraIntervals(4, 4, 4);
    ScaleChromatic.DIMINISHED_7th = ScaleChromatic.fromIntraIntervals(3, 3, 3, 3);
    ScaleChromatic.DOM7b5 = ScaleChromatic.fromIntraIntervals(4, 2, 4, 2);

    // Bebop
    ScaleChromatic.BEBOP_MAJOR = ScaleChromatic.fromRootIntervals(
        ScaleChromatic.MAJOR.degrees[0],
        ScaleChromatic.MAJOR.degrees[1],
        ScaleChromatic.MAJOR.degrees[2],
        ScaleChromatic.MAJOR.degrees[3],
        ScaleChromatic.MAJOR.degrees[4],
        8,
        ScaleChromatic.MAJOR.degrees[5],
        ScaleChromatic.MAJOR.degrees[6]
    );

    ScaleChromatic.BEBOP_DORIAN = ScaleChromatic.fromRootIntervals(
        ScaleChromatic.DORIAN.degrees[0],
        ScaleChromatic.DORIAN.degrees[1],
        ScaleChromatic.DORIAN.degrees[2],
        4,
        ScaleChromatic.DORIAN.degrees[3],
        ScaleChromatic.DORIAN.degrees[4],
        ScaleChromatic.DORIAN.degrees[5],
        ScaleChromatic.DORIAN.degrees[6]
    );

    ScaleChromatic.BEBOP_DOMINANT = ScaleChromatic.fromRootIntervals(
        ScaleChromatic.MIXOLYDIAN.degrees[0],
        ScaleChromatic.MIXOLYDIAN.degrees[1],
        ScaleChromatic.MIXOLYDIAN.degrees[2],
        ScaleChromatic.MIXOLYDIAN.degrees[3],
        ScaleChromatic.MIXOLYDIAN.degrees[4],
        ScaleChromatic.MIXOLYDIAN.degrees[5],
        ScaleChromatic.MIXOLYDIAN.degrees[6],
        11,
    );

    ScaleChromatic.BEBOP_MELODIC_MINOR = ScaleChromatic.fromRootIntervals(
        ScaleChromatic.MELODIC_MINOR.degrees[0],
        ScaleChromatic.MELODIC_MINOR.degrees[1],
        ScaleChromatic.MELODIC_MINOR.degrees[2],
        ScaleChromatic.MELODIC_MINOR.degrees[3],
        ScaleChromatic.MELODIC_MINOR.degrees[4],
        8,
        ScaleChromatic.MELODIC_MINOR.degrees[5],
        ScaleChromatic.MELODIC_MINOR.degrees[6]
    );

    ScaleChromatic.BEBOP_HARMONIC_MINOR = ScaleChromatic.fromRootIntervals(
        ScaleChromatic.HARMONIC_MINOR.degrees[0],
        ScaleChromatic.HARMONIC_MINOR.degrees[1],
        ScaleChromatic.HARMONIC_MINOR.degrees[2],
        ScaleChromatic.HARMONIC_MINOR.degrees[3],
        ScaleChromatic.HARMONIC_MINOR.degrees[4],
        ScaleChromatic.HARMONIC_MINOR.degrees[5],
        10,
        ScaleChromatic.HARMONIC_MINOR.degrees[6]
    );

    ScaleChromatic.sets.allDiatonicScales = function () {
        return [
            ScaleChromatic.MAJOR,
            ScaleChromatic.DORIAN,
            ScaleChromatic.PHRYGIAN,
            ScaleChromatic.LYDIAN,
            ScaleChromatic.MIXOLYDIAN,
            ScaleChromatic.MINOR,
            ScaleChromatic.LOCRIAN
        ];
    }

    ScaleChromatic.sets.allHeptatonicScales = function () {
        return []
            .concat(ScaleChromatic.sets.allDiatonicScales())
            .concat([
                ScaleChromatic.HARMONIC_MINOR,
                ScaleChromatic.LOCRIAN_a6,
                ScaleChromatic.IONIAN_a5,
                ScaleChromatic.DORIAN_a4,
                ScaleChromatic.MIXOLYDIAN_b9_b13,
                ScaleChromatic.LYDIAN_a2,
                ScaleChromatic.SUPERLOCRIAN_bb7,

                ScaleChromatic.HARMONIC_MAJOR,
                ScaleChromatic.DORIAN_b5,
                ScaleChromatic.PHRYGIAN_b4,
                ScaleChromatic.LYDIAN_b3,
                ScaleChromatic.MIXOLYDIAN_b2,
                ScaleChromatic.AEOLIAN_b1,
                ScaleChromatic.LOCRIAN_bb7,

                ScaleChromatic.MELODIC_MINOR,
                ScaleChromatic.DORIAN_b2,
                ScaleChromatic.LYDIAN_a5,
                ScaleChromatic.LYDIAN_b7,
                ScaleChromatic.MIXOLYDIAN_b13,
                ScaleChromatic.LOCRIAN_a2,
                ScaleChromatic.SUPERLOCRIAN,

                ScaleChromatic.DOUBLE_HARMONIC,
                ScaleChromatic.LYDIAN_a2_a6,
                ScaleChromatic.ULTRAPHRYGIAN,
                ScaleChromatic.HUNGARIAN_MINOR,
                ScaleChromatic.ORIENTAL,
                ScaleChromatic.IONIAN_AUGMENTED_a2,
                ScaleChromatic.LOCRIAN_bb3_bb7,

                ScaleChromatic.NEAPOLITAN_MINOR,
                ScaleChromatic.NEAPOLITAN_MAJOR
            ]);
    }

    ScaleChromatic.sets.allBebopScales = function () {
        return [
            ScaleChromatic.BEBOP_MAJOR,
            ScaleChromatic.BEBOP_DORIAN,
            ScaleChromatic.BEBOP_DOMINANT,
            ScaleChromatic.BEBOP_MELODIC_MINOR,
            ScaleChromatic.BEBOP_HARMONIC_MINOR
        ];
    }

    ScaleChromatic.sets.allPentatonicScales = function () {
        return [
            ScaleChromatic.PENTATONIC_MINOR,
            ScaleChromatic.PENTATONIC,
            ScaleChromatic.EGYPCIAN,
            ScaleChromatic.BLUES_MINOR
        ];
    }

    ScaleChromatic.sets.allHexatonicScales = function () {
        return [
            ScaleChromatic.BLUES_b5,
            ScaleChromatic.BLUES_a4,
            ScaleChromatic.WHOLE_TONE
        ];
    }

    ScaleChromatic.sets.all = function (): ScaleChromatic[] {
        let ret: ScaleChromatic[];
        ret = ScaleChromatic.sets.allHeptatonicScales();
        ret = ret.concat(ScaleChromatic.sets.allPentatonicScales());
        ret = ret.concat(ScaleChromatic.sets.allHexatonicScales());
        ret = ret.concat(ScaleChromatic.sets.allBebopScales());
        ret = ret.concat(ScaleChromatic.sets.symmetricScales());

        return ret;
    }

    ScaleChromatic.sets.symmetricScales = function () {
        return [
            ScaleChromatic.CHROMATIC,
            ScaleChromatic.WHOLE_TONE,
            ScaleChromatic.AUGMENTED_TRIAD,
            ScaleChromatic.DIMINISHED_7th,
            ScaleChromatic.MESSIAEN_V_TRUNCATED,
            ScaleChromatic.DOM7b5,
            ScaleChromatic.MESSIAEN_INV_III_V_TRUNCATED_n2,
            ScaleChromatic.HALF_DIMINISHED,
            ScaleChromatic.MESSIAEN_V,
            ScaleChromatic.RAGA_INDRUPRIYA_INDIA,
            ScaleChromatic.MESSIAEN_II_TRUNCATED_n3,
            ScaleChromatic.MESSIAEN_III_INV,
            ScaleChromatic.MESSIAEN_IV,
            ScaleChromatic.MESSIAEN_VI,
            ScaleChromatic.MESSIAEN_VII
        ];
    };
}
