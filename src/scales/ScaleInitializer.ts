import { IntervalDiatonicAlt } from '../intervals/IntervalDiatonicAlt';
import { DiatonicAltDegree } from './degrees/DiatonicAltDegree';
import { DiatonicDegree } from './degrees/DiatonicDegree';
import { Scale } from './Scale';
import { ScaleChromatic } from './ScaleChromatic';
import { ScaleDiatonicAltConversor } from './ScaleDiatonicAltConversor';
import { chromatics, diatonicAltDegrees, scaleChromatics, intervalDiatonicAlts } from '../initializer';

export default () => {
    if (Scale.MAJOR)
        return;

    diatonicAltDegrees.default();
    intervalDiatonicAlts.default();
    chromatics.default();
    scaleChromatics.default();
    
    Scale.MAJOR = Scale.fromDegrees(
        DiatonicAltDegree.I,
        DiatonicAltDegree.II,
        DiatonicAltDegree.III,
        DiatonicAltDegree.IV,
        DiatonicAltDegree.V,
        DiatonicAltDegree.VI,
        DiatonicAltDegree.VII,
    );

    Scale.DORIAN = Scale.MAJOR.getMode(2);
    Scale.PHRYGIAN = Scale.MAJOR.getMode(3);
    Scale.LYDIAN = Scale.MAJOR.getMode(4);
    Scale.MIXOLYDIAN = Scale.MAJOR.getMode(5);
    Scale.MINOR = Scale.MAJOR.getMode(6);
    Scale.LOCRIAN = Scale.MAJOR.getMode(7);

    Scale.HARMONIC_MINOR = ScaleDiatonicAltConversor.from(ScaleChromatic.HARMONIC_MINOR).scaleDiatonicAlt;
    Scale.LOCRIAN_a6 = Scale.HARMONIC_MINOR.getMode(2);
    Scale.IONIAN_a5 = Scale.HARMONIC_MINOR.getMode(3);
    Scale.DORIAN_a4 = Scale.HARMONIC_MINOR.getMode(4);
    Scale.MIXOLYDIAN_b9_b13 = Scale.HARMONIC_MINOR.getMode(5);
    Scale.LYDIAN_a2 = Scale.HARMONIC_MINOR.getMode(6);
    Scale.SUPERLOCRIAN_bb7 = Scale.HARMONIC_MINOR.getMode(7);

    Scale.HARMONIC_MAJOR = ScaleDiatonicAltConversor.from(ScaleChromatic.HARMONIC_MAJOR).scaleDiatonicAlt;
    Scale.DORIAN_b5 = Scale.HARMONIC_MAJOR.getMode(2);
    Scale.PHRYGIAN_b4 = Scale.HARMONIC_MAJOR.getMode(3);
    Scale.LYDIAN_b3 = Scale.HARMONIC_MAJOR.getMode(4);
    Scale.MIXOLYDIAN_b2 = Scale.HARMONIC_MAJOR.getMode(5);
    Scale.AEOLIAN_b1 = Scale.HARMONIC_MAJOR.getMode(6);
    Scale.LOCRIAN_bb7 = Scale.HARMONIC_MAJOR.getMode(7);

    Scale.MELODIC_MINOR = ScaleDiatonicAltConversor.from(ScaleChromatic.MELODIC_MINOR).scaleDiatonicAlt;
    Scale.DORIAN_b2 = Scale.MELODIC_MINOR.getMode(2);
    Scale.LYDIAN_a5 = Scale.MELODIC_MINOR.getMode(3);
    Scale.LYDIAN_b7 = Scale.MELODIC_MINOR.getMode(4);
    Scale.MIXOLYDIAN_b13 = Scale.MELODIC_MINOR.getMode(5);
    Scale.LOCRIAN_a2 = Scale.MELODIC_MINOR.getMode(6);
    Scale.SUPERLOCRIAN = Scale.MELODIC_MINOR.getMode(7);

    Scale.DOUBLE_HARMONIC = ScaleDiatonicAltConversor.from(ScaleChromatic.DOUBLE_HARMONIC).scaleDiatonicAlt;
    Scale.LYDIAN_a2_a6 = Scale.DOUBLE_HARMONIC.getMode(2);
    Scale.ULTRAPHRYGIAN = Scale.DOUBLE_HARMONIC.getMode(3);
    Scale.HUNGARIAN_MINOR = Scale.DOUBLE_HARMONIC.getMode(4);
    Scale.ORIENTAL = Scale.DOUBLE_HARMONIC.getMode(5);
    Scale.IONIAN_AUGMENTED_a2 = Scale.DOUBLE_HARMONIC.getMode(6);
    Scale.LOCRIAN_bb3_bb7 = Scale.DOUBLE_HARMONIC.getMode(7);

    Scale.NEAPOLITAN_MINOR = ScaleDiatonicAltConversor.from(ScaleChromatic.NEAPOLITAN_MINOR).scaleDiatonicAlt;
    Scale.NEAPOLITAN_MAJOR = ScaleDiatonicAltConversor.from(ScaleChromatic.NEAPOLITAN_MAJOR).scaleDiatonicAlt;

    // 6
    Scale.BLUES_b5 = Scale.fromIntraIntervals(
        IntervalDiatonicAlt.MINOR_THIRD,
        IntervalDiatonicAlt.MAJOR_SECOND,
        IntervalDiatonicAlt.MINOR_SECOND,
        IntervalDiatonicAlt.AUGMENTED_UNISON,
        IntervalDiatonicAlt.MINOR_THIRD,
        IntervalDiatonicAlt.MAJOR_SECOND
    );

    Scale.BLUES_a4 = Scale.fromIntraIntervals(
        IntervalDiatonicAlt.MINOR_THIRD,
        IntervalDiatonicAlt.MAJOR_SECOND,
        IntervalDiatonicAlt.AUGMENTED_UNISON,
        IntervalDiatonicAlt.MINOR_SECOND,
        IntervalDiatonicAlt.MINOR_THIRD,
        IntervalDiatonicAlt.MAJOR_SECOND
    );

    // 5
    Scale.PENTATONIC_MINOR = Scale.fromIntraIntervals(
        IntervalDiatonicAlt.MINOR_THIRD,
        IntervalDiatonicAlt.MAJOR_SECOND,
        IntervalDiatonicAlt.MAJOR_SECOND,
        IntervalDiatonicAlt.MINOR_THIRD,
        IntervalDiatonicAlt.MAJOR_SECOND
    );
    Scale.PENTATONIC = Scale.PENTATONIC_MINOR.getMode(2);
    Scale.EGYPCIAN = Scale.PENTATONIC_MINOR.getMode(3);
    Scale.BLUES_MINOR = Scale.PENTATONIC_MINOR.getMode(4);
    Scale.BLUES_MAJOR = Scale.PENTATONIC_MINOR.getMode(5);

    // Symmetric
    Scale.CHROMATIC = Scale.fromDegrees(
        DiatonicAltDegree.I,
        DiatonicAltDegree.from(DiatonicDegree.I, 1),
        DiatonicAltDegree.II,
        DiatonicAltDegree.from(DiatonicDegree.II, 1),
        DiatonicAltDegree.III,
        DiatonicAltDegree.IV,
        DiatonicAltDegree.from(DiatonicDegree.IV, 1),
        DiatonicAltDegree.V,
        DiatonicAltDegree.from(DiatonicDegree.V, 1),
        DiatonicAltDegree.VI,
        DiatonicAltDegree.from(DiatonicDegree.VI, 1),
        DiatonicAltDegree.VII,
    );
    Scale.WHOLE_TONE = Scale.fromDegrees(
        DiatonicAltDegree.I,
        DiatonicAltDegree.II,
        DiatonicAltDegree.III,
        DiatonicAltDegree.bV,
        DiatonicAltDegree.bVI,
        DiatonicAltDegree.bVII
    );
    Scale.AUGMENTED_TRIAD = Scale.fromIntraIntervals(
        IntervalDiatonicAlt.MAJOR_THIRD,
        IntervalDiatonicAlt.MAJOR_THIRD,
        IntervalDiatonicAlt.MAJOR_THIRD
    );
    Scale.DIMINISHED_7th = Scale.fromIntraIntervals(
        IntervalDiatonicAlt.MINOR_THIRD,
        IntervalDiatonicAlt.MINOR_THIRD,
        IntervalDiatonicAlt.MINOR_THIRD,
        IntervalDiatonicAlt.MINOR_THIRD
    );
    Scale.DOM7b5 = Scale.fromDegrees(
        DiatonicAltDegree.I,
        DiatonicAltDegree.III,
        DiatonicAltDegree.bV,
        DiatonicAltDegree.bVII,
    );

    Scale.RAGA_INDRUPRIYA_INDIA = ScaleDiatonicAltConversor.from(ScaleChromatic.RAGA_INDRUPRIYA_INDIA).scaleDiatonicAlt;
    Scale.HALF_DIMINISHED = ScaleDiatonicAltConversor.from(ScaleChromatic.HALF_DIMINISHED).scaleDiatonicAlt;
    Scale.MESSIAEN_V_TRUNCATED = ScaleDiatonicAltConversor.from(ScaleChromatic.MESSIAEN_V_TRUNCATED).scaleDiatonicAlt;
    Scale.MESSIAEN_III_INV = ScaleDiatonicAltConversor.from(ScaleChromatic.MESSIAEN_III_INV).scaleDiatonicAlt;
    Scale.MESSIAEN_II_TRUNCATED_n3 = ScaleDiatonicAltConversor.from(ScaleChromatic.MESSIAEN_II_TRUNCATED_n3).scaleDiatonicAlt;
    Scale.MESSIAEN_INV_III_V_TRUNCATED_n2 = ScaleDiatonicAltConversor.from(ScaleChromatic.MESSIAEN_INV_III_V_TRUNCATED_n2).scaleDiatonicAlt;
    Scale.MESSIAEN_IV = ScaleDiatonicAltConversor.from(ScaleChromatic.MESSIAEN_IV).scaleDiatonicAlt;
    Scale.MESSIAEN_V = ScaleDiatonicAltConversor.from(ScaleChromatic.MESSIAEN_V).scaleDiatonicAlt;
    Scale.MESSIAEN_VI = ScaleDiatonicAltConversor.from(ScaleChromatic.MESSIAEN_VI).scaleDiatonicAlt;
    Scale.MESSIAEN_VII = ScaleDiatonicAltConversor.from(ScaleChromatic.MESSIAEN_VII).scaleDiatonicAlt;

    // Bebop
    Scale.BEBOP_MAJOR = Scale.fromDegrees(
        Scale.MAJOR.degrees[0],
        Scale.MAJOR.degrees[1],
        Scale.MAJOR.degrees[2],
        Scale.MAJOR.degrees[3],
        Scale.MAJOR.degrees[4],
        DiatonicAltDegree.bVI,
        Scale.MAJOR.degrees[5],
        Scale.MAJOR.degrees[6]
    );

    Scale.BEBOP_DORIAN = Scale.fromDegrees(
        Scale.DORIAN.degrees[0],
        Scale.DORIAN.degrees[1],
        Scale.DORIAN.degrees[2],
        DiatonicAltDegree.III,
        Scale.DORIAN.degrees[3],
        Scale.DORIAN.degrees[4],
        Scale.DORIAN.degrees[5],
        Scale.DORIAN.degrees[6]
    );

    Scale.BEBOP_DOMINANT = Scale.fromDegrees(
        Scale.MIXOLYDIAN.degrees[0],
        Scale.MIXOLYDIAN.degrees[1],
        Scale.MIXOLYDIAN.degrees[2],
        Scale.MIXOLYDIAN.degrees[3],
        Scale.MIXOLYDIAN.degrees[4],
        Scale.MIXOLYDIAN.degrees[5],
        Scale.MIXOLYDIAN.degrees[6],
        DiatonicAltDegree.VII,
    );

    Scale.BEBOP_MELODIC_MINOR = Scale.fromDegrees(
        Scale.MELODIC_MINOR.degrees[0],
        Scale.MELODIC_MINOR.degrees[1],
        Scale.MELODIC_MINOR.degrees[2],
        Scale.MELODIC_MINOR.degrees[3],
        Scale.MELODIC_MINOR.degrees[4],
        DiatonicAltDegree.bVI,
        Scale.MELODIC_MINOR.degrees[5],
        Scale.MELODIC_MINOR.degrees[6]
    );

    Scale.BEBOP_HARMONIC_MINOR = Scale.fromDegrees(
        Scale.HARMONIC_MINOR.degrees[0],
        Scale.HARMONIC_MINOR.degrees[1],
        Scale.HARMONIC_MINOR.degrees[2],
        Scale.HARMONIC_MINOR.degrees[3],
        Scale.HARMONIC_MINOR.degrees[4],
        Scale.HARMONIC_MINOR.degrees[5],
        DiatonicAltDegree.bVII,
        Scale.HARMONIC_MINOR.degrees[6]
    );

    Scale.sets.allDiatonicScales = function () {
        return [
            Scale.MAJOR,
            Scale.DORIAN,
            Scale.PHRYGIAN,
            Scale.LYDIAN,
            Scale.MIXOLYDIAN,
            Scale.MINOR,
            Scale.LOCRIAN
        ];
    }

    Scale.sets.allHeptatonicScales = function () {
        return []
            .concat(Scale.sets.allDiatonicScales())
            .concat([
                Scale.HARMONIC_MINOR,
                Scale.LOCRIAN_a6,
                Scale.IONIAN_a5,
                Scale.DORIAN_a4,
                Scale.MIXOLYDIAN_b9_b13,
                Scale.LYDIAN_a2,
                Scale.SUPERLOCRIAN_bb7,

                Scale.HARMONIC_MAJOR,
                Scale.DORIAN_b5,
                Scale.PHRYGIAN_b4,
                Scale.LYDIAN_b3,
                Scale.MIXOLYDIAN_b2,
                Scale.AEOLIAN_b1,
                Scale.LOCRIAN_bb7,

                Scale.MELODIC_MINOR,
                Scale.DORIAN_b2,
                Scale.LYDIAN_a5,
                Scale.LYDIAN_b7,
                Scale.MIXOLYDIAN_b13,
                Scale.LOCRIAN_a2,
                Scale.SUPERLOCRIAN,

                Scale.DOUBLE_HARMONIC,
                Scale.LYDIAN_a2_a6,
                Scale.ULTRAPHRYGIAN,
                Scale.HUNGARIAN_MINOR,
                Scale.ORIENTAL,
                Scale.IONIAN_AUGMENTED_a2,
                Scale.LOCRIAN_bb3_bb7,

                Scale.NEAPOLITAN_MINOR,
                Scale.NEAPOLITAN_MAJOR
            ]);
    }

    Scale.sets.allBebopScales = function () {
        return [
            Scale.BEBOP_MAJOR,
            Scale.BEBOP_DORIAN,
            Scale.BEBOP_DOMINANT,
            Scale.BEBOP_MELODIC_MINOR,
            Scale.BEBOP_HARMONIC_MINOR
        ];
    }

    Scale.sets.allPentatonicScales = function () {
        return [
            Scale.PENTATONIC_MINOR,
            Scale.PENTATONIC,
            Scale.EGYPCIAN,
            Scale.BLUES_MINOR
        ];
    }

    Scale.sets.allHexatonicScales = function () {
        return [
            Scale.BLUES_b5,
            Scale.BLUES_a4,
            Scale.WHOLE_TONE
        ];
    }

    Scale.sets.all = function (): Scale[] {
        let ret: Scale[];
        ret = Scale.sets.allHeptatonicScales();
        ret = ret.concat(Scale.sets.allPentatonicScales());
        ret = ret.concat(Scale.sets.allHexatonicScales());
        ret = ret.concat(Scale.sets.allBebopScales());
        ret = ret.concat(Scale.sets.symmetricScales());

        return ret;
    }

    Scale.sets.symmetricScales = function () {
        return [
            Scale.CHROMATIC,
            Scale.WHOLE_TONE,
            Scale.AUGMENTED_TRIAD,
            Scale.DIMINISHED_7th,
            Scale.MESSIAEN_V_TRUNCATED,
            Scale.DOM7b5,
            Scale.MESSIAEN_INV_III_V_TRUNCATED_n2,
            Scale.HALF_DIMINISHED,
            Scale.MESSIAEN_V,
            Scale.RAGA_INDRUPRIYA_INDIA,
            Scale.MESSIAEN_II_TRUNCATED_n3,
            Scale.MESSIAEN_III_INV,
            Scale.MESSIAEN_IV,
            Scale.MESSIAEN_VI,
            Scale.MESSIAEN_VII
        ];
    };
}