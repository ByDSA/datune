import { DiatonicAltChord } from '../chords/diatonicalt/DiatonicAltChord';
import { RootPatternChord } from '../chords/root-pattern/RootPatternChord';
import { PrecalcCache } from '../common/PrecalcCache';
import { Chromatic } from '../degrees/Chromatic';
import { Diatonic } from '../degrees/Diatonic';
import { DiatonicAlt } from '../degrees/DiatonicAlt';
import { DiatonicAltDegree } from '../degrees/degrees/DiatonicAltDegree';
import { DiatonicDegree } from '../degrees/degrees/DiatonicDegree';
import { DiatonicAltPattern } from '../patterns/DiatonicAltPattern';
import { Tonality } from '../tonality/Tonality';
import { HarmonicFunction } from './HarmonicFunction';

type HashingObjectType = { degree: DiatonicAltDegree, pattern: DiatonicAltPattern };
export class DegreeFunction extends HarmonicFunction {
    public static I5: DegreeFunction;
    public static bII5: DegreeFunction;
    public static II5: DegreeFunction;
    public static bIII5: DegreeFunction;
    public static III5: DegreeFunction;
    public static IV5: DegreeFunction;
    public static bV5: DegreeFunction;
    public static V5: DegreeFunction;
    public static bVI5: DegreeFunction;
    public static VI5: DegreeFunction;
    public static bVII5: DegreeFunction;
    public static VII5: DegreeFunction;

    public static I: DegreeFunction;
    public static bII: DegreeFunction;
    public static N6: DegreeFunction;
    public static II: DegreeFunction;
    public static bIII: DegreeFunction;
    public static III: DegreeFunction;
    public static IV: DegreeFunction;
    public static bV: DegreeFunction;
    public static V: DegreeFunction;
    public static bVI: DegreeFunction;
    public static VI: DegreeFunction;
    public static bVII: DegreeFunction;
    public static VII: DegreeFunction;

    public static ISUS4: DegreeFunction;
    public static bIISUS4: DegreeFunction;
    public static IISUS4: DegreeFunction;
    public static bIIISUS4: DegreeFunction;
    public static IIISUS4: DegreeFunction;
    public static IVSUS4: DegreeFunction;
    public static bVSUS4: DegreeFunction;
    public static VSUS4: DegreeFunction;
    public static bVISUS4: DegreeFunction;
    public static VISUS4: DegreeFunction;
    public static bVIISUS4: DegreeFunction;
    public static VIISUS4: DegreeFunction;

    public static i: DegreeFunction;
    public static bii: DegreeFunction;
    public static ii: DegreeFunction;
    public static biii: DegreeFunction;
    public static iii: DegreeFunction;
    public static iv: DegreeFunction;
    public static bv: DegreeFunction;
    public static v: DegreeFunction;
    public static bvi: DegreeFunction;
    public static vi: DegreeFunction;
    public static bvii: DegreeFunction;
    public static vii: DegreeFunction;

    public static I0: DegreeFunction;
    public static bII0: DegreeFunction;
    public static II0: DegreeFunction;
    public static bIII0: DegreeFunction;
    public static III0: DegreeFunction;
    public static IV0: DegreeFunction;
    public static bV0: DegreeFunction;
    public static V0: DegreeFunction;
    public static bVI0: DegreeFunction;
    public static VI0: DegreeFunction;
    public static bVII0: DegreeFunction;
    public static VII0: DegreeFunction;


    public static Iaug: DegreeFunction;
    public static bIIaug: DegreeFunction;
    public static IIaug: DegreeFunction;
    public static bIIIaug: DegreeFunction;
    public static IIIaug: DegreeFunction;
    public static IVaug: DegreeFunction;
    public static bVaug: DegreeFunction;
    public static Vaug: DegreeFunction;
    public static bVIaug: DegreeFunction;
    public static VIaug: DegreeFunction;
    public static bVIIaug: DegreeFunction;
    public static VIIaug: DegreeFunction;

    /* Seventh */

    public static I7: DegreeFunction;
    public static bII7: DegreeFunction;
    public static II7: DegreeFunction;
    public static bIII7: DegreeFunction;
    public static III7: DegreeFunction;
    public static IV7: DegreeFunction;
    public static bV7: DegreeFunction;
    public static V7: DegreeFunction;
    public static bVI7: DegreeFunction;
    public static VI7: DegreeFunction;
    public static bVII7: DegreeFunction;
    public static VII7: DegreeFunction;

    public static I7SUS4: DegreeFunction;
    public static bII7SUS4: DegreeFunction;
    public static II7SUS4: DegreeFunction;
    public static bIII7SUS4: DegreeFunction;
    public static III7SUS4: DegreeFunction;
    public static IV7SUS4: DegreeFunction;
    public static bV7SUS4: DegreeFunction;
    public static V7SUS4: DegreeFunction;
    public static bVI7SUS4: DegreeFunction;
    public static VI7SUS4: DegreeFunction;
    public static bVII7SUS4: DegreeFunction;
    public static VII7SUS4: DegreeFunction;

    public static I7SUS4b9: DegreeFunction;
    public static bII7SUS4b9: DegreeFunction;
    public static II7SUS4b9: DegreeFunction;
    public static bIII7SUS4b9: DegreeFunction;
    public static III7SUS4b9: DegreeFunction;
    public static IV7SUS4b9: DegreeFunction;
    public static bV7SUS4b9: DegreeFunction;
    public static V7SUS4b9: DegreeFunction;
    public static bVI7SUS4b9: DegreeFunction;
    public static VI7SUS4b9: DegreeFunction;
    public static bVII7SUS4b9: DegreeFunction;
    public static VII7SUS4b9: DegreeFunction;

    public static I6: DegreeFunction;
    public static bII6: DegreeFunction;
    public static II6: DegreeFunction;
    public static bIII6: DegreeFunction;
    public static III6: DegreeFunction;
    public static IV6: DegreeFunction;
    public static bV6: DegreeFunction;
    public static V6: DegreeFunction;
    public static bVI6: DegreeFunction;
    public static VI6: DegreeFunction;
    public static bVII6: DegreeFunction;
    public static VII6: DegreeFunction;

    public static Im6: DegreeFunction;
    public static bIIm6: DegreeFunction;
    public static IIm6: DegreeFunction;
    public static bIIIm6: DegreeFunction;
    public static IIIm6: DegreeFunction;
    public static IVm6: DegreeFunction;
    public static bVm6: DegreeFunction;
    public static Vm6: DegreeFunction;
    public static bVIm6: DegreeFunction;
    public static VIm6: DegreeFunction;
    public static bVIIm6: DegreeFunction;
    public static VIIm6: DegreeFunction;

    public static IMaj7: DegreeFunction;
    public static bIIMaj7: DegreeFunction;
    public static IIMaj7: DegreeFunction;
    public static bIIIMaj7: DegreeFunction;
    public static IIIMaj7: DegreeFunction;
    public static IVMaj7: DegreeFunction;
    public static bVMaj7: DegreeFunction;
    public static VMaj7: DegreeFunction;
    public static bVIMaj7: DegreeFunction;
    public static VIMaj7: DegreeFunction;
    public static bVIIMaj7: DegreeFunction;
    public static VIIMaj7: DegreeFunction;

    public static IMaj7b5: DegreeFunction;
    public static bIIMaj7b5: DegreeFunction;
    public static IIMaj7b5: DegreeFunction;
    public static bIIIMaj7b5: DegreeFunction;
    public static IIIMaj7b5: DegreeFunction;
    public static IVMaj7b5: DegreeFunction;
    public static bVMaj7b5: DegreeFunction;
    public static VMaj7b5: DegreeFunction;
    public static bVIMaj7b5: DegreeFunction;
    public static VIMaj7b5: DegreeFunction;
    public static bVIIMaj7b5: DegreeFunction;
    public static VIIMaj7b5: DegreeFunction;

    public static Im7: DegreeFunction;
    public static bIIm7: DegreeFunction;
    public static IIm7: DegreeFunction;
    public static bIIIm7: DegreeFunction;
    public static IIIm7: DegreeFunction;
    public static IVm7: DegreeFunction;
    public static bVm7: DegreeFunction;
    public static Vm7: DegreeFunction;
    public static bVIm7: DegreeFunction;
    public static VIm7: DegreeFunction;
    public static bVIIm7: DegreeFunction;
    public static VIIm7: DegreeFunction;

    public static Im7b5: DegreeFunction;
    public static bIIm7b5: DegreeFunction;
    public static IIm7b5: DegreeFunction;
    public static bIIIm7b5: DegreeFunction;
    public static IIIm7b5: DegreeFunction;
    public static IVm7b5: DegreeFunction;
    public static bVm7b5: DegreeFunction;
    public static Vm7b5: DegreeFunction;
    public static bVIm7b5: DegreeFunction;
    public static VIm7b5: DegreeFunction;
    public static bVIIm7b5: DegreeFunction;
    public static VIIm7b5: DegreeFunction;


    public static TRIAD_FUNCTIONS: DegreeFunction[];

    public static SEVENTH_FUNCTIONS: DegreeFunction[];

    public static POWER_CHORD_FUNCTIONS: DegreeFunction[];

    public static SUS4_FUNCTIONS: DegreeFunction[];

    /********* END CONSTANTS ***********/

    private static hashCodeFunction(degree: DiatonicAltDegree, pattern: DiatonicAltPattern): string {
        return degree.hashCode() + "|" + pattern.hashCode();
    }

    private static immutablesCache = new PrecalcCache<DegreeFunction, HashingObjectType>(
        function (hashingObject: HashingObjectType): string {
            return DegreeFunction.hashCodeFunction(hashingObject.degree, hashingObject.pattern);
        },
        function (degreeFunction: DegreeFunction): HashingObjectType {
            return { degree: degreeFunction.degree, pattern: degreeFunction.pattern };
        },
        function (hashingObject: HashingObjectType): DegreeFunction {
            return new DegreeFunction(hashingObject.degree, hashingObject.pattern);
        }
    );

    protected constructor(private _degree: DiatonicAltDegree, private _pattern: DiatonicAltPattern) {
        super();
    }

    public static from(degree: DiatonicAltDegree, pattern: DiatonicAltPattern): DegreeFunction {
        return this.immutablesCache.getOrCreate({ degree: degree, pattern: pattern });
    }

    public get degree(): DiatonicAltDegree {
        return this._degree;
    }

    public get pattern(): DiatonicAltPattern {
        return this._pattern;
    }

    public calculateChord(tonality: Tonality): DiatonicAltChord {
        let noteBase: DiatonicAlt = DegreeFunction.getNoteBaseFromChromaticFunctionAndTonality(tonality, this);

        return <DiatonicAltChord>RootPatternChord.from(noteBase, this._pattern).chord;
    }

    private static getNoteBaseFromChromaticFunctionAndTonality(tonality: Tonality, degreeFunction: DegreeFunction): DiatonicAlt {
        return tonality.root.getAdd(degreeFunction.degree.intervalDiatonicAlt);
    }

    private _degrees: DiatonicAltDegree[];

    public get degrees(): DiatonicAltDegree[] {
        if (!this._degrees) {
            this._degrees = [];
            for (let value of this.pattern) {
                let diatonicDegreeInt = this.degree.diatonicDegree.intValue + value.intervalDiatonic.intValue;
                let diatonicDegree = DiatonicDegree.fromInt(diatonicDegreeInt);
                let alts = (this.degree.semis + value.intervalChromatic) - Diatonic.fromInt(diatonicDegree.intValue).chromatic.intValue;
                alts %= Chromatic.NUMBER;
                let degree = DiatonicAltDegree.from(diatonicDegree, alts);
                this._degrees.push(degree);
            }
        }

        return this._degrees;
    }

    /* Object */

    public toString(): string {
        switch (this._pattern) {
            case DiatonicAltPattern.TRIAD_MINOR: return this._degree.toString().toLowerCase();
        }

        return this._degree + this._pattern.shortName;
    }

    public hashCode(): string {
        return DegreeFunction.hashCodeFunction(this._degree, this._pattern);
    }

    private static initialize() {
        DegreeFunction.I5 = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.POWER_CHORD);
        DegreeFunction.bII5 = DegreeFunction.from(DiatonicAltDegree.bII, DiatonicAltPattern.POWER_CHORD);
        DegreeFunction.II5 = DegreeFunction.from(DiatonicAltDegree.II, DiatonicAltPattern.POWER_CHORD);
        DegreeFunction.bIII5 = DegreeFunction.from(DiatonicAltDegree.bIII, DiatonicAltPattern.POWER_CHORD);
        DegreeFunction.III5 = DegreeFunction.from(DiatonicAltDegree.III, DiatonicAltPattern.POWER_CHORD);
        DegreeFunction.IV5 = DegreeFunction.from(DiatonicAltDegree.IV, DiatonicAltPattern.POWER_CHORD);
        DegreeFunction.bV5 = DegreeFunction.from(DiatonicAltDegree.bV, DiatonicAltPattern.POWER_CHORD);
        DegreeFunction.V5 = DegreeFunction.from(DiatonicAltDegree.V, DiatonicAltPattern.POWER_CHORD);
        DegreeFunction.bVI5 = DegreeFunction.from(DiatonicAltDegree.bVI, DiatonicAltPattern.POWER_CHORD);
        DegreeFunction.VI5 = DegreeFunction.from(DiatonicAltDegree.VI, DiatonicAltPattern.POWER_CHORD);
        DegreeFunction.bVII5 = DegreeFunction.from(DiatonicAltDegree.bVII, DiatonicAltPattern.POWER_CHORD);
        DegreeFunction.VII5 = DegreeFunction.from(DiatonicAltDegree.VII, DiatonicAltPattern.POWER_CHORD);

        DegreeFunction.I = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.TRIAD_MAJOR);
        DegreeFunction.bII = DegreeFunction.from(DiatonicAltDegree.bII, DiatonicAltPattern.TRIAD_MAJOR);
        DegreeFunction.N6 = DegreeFunction.bII;
        DegreeFunction.II = DegreeFunction.from(DiatonicAltDegree.II, DiatonicAltPattern.TRIAD_MAJOR);
        DegreeFunction.bIII = DegreeFunction.from(DiatonicAltDegree.bIII, DiatonicAltPattern.TRIAD_MAJOR);
        DegreeFunction.III = DegreeFunction.from(DiatonicAltDegree.III, DiatonicAltPattern.TRIAD_MAJOR);
        DegreeFunction.IV = DegreeFunction.from(DiatonicAltDegree.IV, DiatonicAltPattern.TRIAD_MAJOR);
        DegreeFunction.bV = DegreeFunction.from(DiatonicAltDegree.bV, DiatonicAltPattern.TRIAD_MAJOR);
        DegreeFunction.V = DegreeFunction.from(DiatonicAltDegree.V, DiatonicAltPattern.TRIAD_MAJOR);
        DegreeFunction.bVI = DegreeFunction.from(DiatonicAltDegree.bVI, DiatonicAltPattern.TRIAD_MAJOR);
        DegreeFunction.VI = DegreeFunction.from(DiatonicAltDegree.VI, DiatonicAltPattern.TRIAD_MAJOR);
        DegreeFunction.bVII = DegreeFunction.from(DiatonicAltDegree.bVII, DiatonicAltPattern.TRIAD_MAJOR);
        DegreeFunction.VII = DegreeFunction.from(DiatonicAltDegree.VII, DiatonicAltPattern.TRIAD_MAJOR);

        DegreeFunction.ISUS4 = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.TRIAD_SUS4);
        DegreeFunction.bIISUS4 = DegreeFunction.from(DiatonicAltDegree.bII, DiatonicAltPattern.TRIAD_SUS4);
        DegreeFunction.IISUS4 = DegreeFunction.from(DiatonicAltDegree.II, DiatonicAltPattern.TRIAD_SUS4);
        DegreeFunction.bIIISUS4 = DegreeFunction.from(DiatonicAltDegree.bIII, DiatonicAltPattern.TRIAD_SUS4);
        DegreeFunction.IIISUS4 = DegreeFunction.from(DiatonicAltDegree.III, DiatonicAltPattern.TRIAD_SUS4);
        DegreeFunction.IVSUS4 = DegreeFunction.from(DiatonicAltDegree.IV, DiatonicAltPattern.TRIAD_SUS4);
        DegreeFunction.bVSUS4 = DegreeFunction.from(DiatonicAltDegree.bV, DiatonicAltPattern.TRIAD_SUS4);
        DegreeFunction.VSUS4 = DegreeFunction.from(DiatonicAltDegree.V, DiatonicAltPattern.TRIAD_SUS4);
        DegreeFunction.bVISUS4 = DegreeFunction.from(DiatonicAltDegree.bVI, DiatonicAltPattern.TRIAD_SUS4);
        DegreeFunction.VISUS4 = DegreeFunction.from(DiatonicAltDegree.VI, DiatonicAltPattern.TRIAD_SUS4);
        DegreeFunction.bVIISUS4 = DegreeFunction.from(DiatonicAltDegree.bVII, DiatonicAltPattern.TRIAD_SUS4);
        DegreeFunction.VIISUS4 = DegreeFunction.from(DiatonicAltDegree.VII, DiatonicAltPattern.TRIAD_SUS4);

        DegreeFunction.i = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.TRIAD_MINOR);
        DegreeFunction.bii = DegreeFunction.from(DiatonicAltDegree.bII, DiatonicAltPattern.TRIAD_MINOR);
        DegreeFunction.ii = DegreeFunction.from(DiatonicAltDegree.II, DiatonicAltPattern.TRIAD_MINOR);
        DegreeFunction.biii = DegreeFunction.from(DiatonicAltDegree.bIII, DiatonicAltPattern.TRIAD_MINOR);
        DegreeFunction.iii = DegreeFunction.from(DiatonicAltDegree.III, DiatonicAltPattern.TRIAD_MINOR);
        DegreeFunction.iv = DegreeFunction.from(DiatonicAltDegree.IV, DiatonicAltPattern.TRIAD_MINOR);
        DegreeFunction.bv = DegreeFunction.from(DiatonicAltDegree.bV, DiatonicAltPattern.TRIAD_MINOR);
        DegreeFunction.v = DegreeFunction.from(DiatonicAltDegree.V, DiatonicAltPattern.TRIAD_MINOR);
        DegreeFunction.bvi = DegreeFunction.from(DiatonicAltDegree.bVI, DiatonicAltPattern.TRIAD_MINOR);
        DegreeFunction.vi = DegreeFunction.from(DiatonicAltDegree.VI, DiatonicAltPattern.TRIAD_MINOR);
        DegreeFunction.bvii = DegreeFunction.from(DiatonicAltDegree.bVII, DiatonicAltPattern.TRIAD_MINOR);
        DegreeFunction.vii = DegreeFunction.from(DiatonicAltDegree.VII, DiatonicAltPattern.TRIAD_MINOR);

        DegreeFunction.I0 = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.TRIAD_DIMINISHED);
        DegreeFunction.bII0 = DegreeFunction.from(DiatonicAltDegree.bII, DiatonicAltPattern.TRIAD_DIMINISHED);
        DegreeFunction.II0 = DegreeFunction.from(DiatonicAltDegree.II, DiatonicAltPattern.TRIAD_DIMINISHED);
        DegreeFunction.bIII0 = DegreeFunction.from(DiatonicAltDegree.bIII, DiatonicAltPattern.TRIAD_DIMINISHED);
        DegreeFunction.III0 = DegreeFunction.from(DiatonicAltDegree.III, DiatonicAltPattern.TRIAD_DIMINISHED);
        DegreeFunction.IV0 = DegreeFunction.from(DiatonicAltDegree.IV, DiatonicAltPattern.TRIAD_DIMINISHED);
        DegreeFunction.bV0 = DegreeFunction.from(DiatonicAltDegree.bV, DiatonicAltPattern.TRIAD_DIMINISHED);
        DegreeFunction.V0 = DegreeFunction.from(DiatonicAltDegree.V, DiatonicAltPattern.TRIAD_DIMINISHED);
        DegreeFunction.bVI0 = DegreeFunction.from(DiatonicAltDegree.bVI, DiatonicAltPattern.TRIAD_DIMINISHED);
        DegreeFunction.VI0 = DegreeFunction.from(DiatonicAltDegree.VI, DiatonicAltPattern.TRIAD_DIMINISHED);
        DegreeFunction.bVII0 = DegreeFunction.from(DiatonicAltDegree.bVII, DiatonicAltPattern.TRIAD_DIMINISHED);
        DegreeFunction.VII0 = DegreeFunction.from(DiatonicAltDegree.VII, DiatonicAltPattern.TRIAD_DIMINISHED);


        DegreeFunction.Iaug = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.TRIAD_AUGMENTED);
        DegreeFunction.bIIaug = DegreeFunction.from(DiatonicAltDegree.bII, DiatonicAltPattern.TRIAD_AUGMENTED);
        DegreeFunction.IIaug = DegreeFunction.from(DiatonicAltDegree.II, DiatonicAltPattern.TRIAD_AUGMENTED);
        DegreeFunction.bIIIaug = DegreeFunction.from(DiatonicAltDegree.bIII, DiatonicAltPattern.TRIAD_AUGMENTED);
        DegreeFunction.IIIaug = DegreeFunction.from(DiatonicAltDegree.III, DiatonicAltPattern.TRIAD_AUGMENTED);
        DegreeFunction.IVaug = DegreeFunction.from(DiatonicAltDegree.IV, DiatonicAltPattern.TRIAD_AUGMENTED);
        DegreeFunction.bVaug = DegreeFunction.from(DiatonicAltDegree.bV, DiatonicAltPattern.TRIAD_AUGMENTED);
        DegreeFunction.Vaug = DegreeFunction.from(DiatonicAltDegree.V, DiatonicAltPattern.TRIAD_AUGMENTED);
        DegreeFunction.bVIaug = DegreeFunction.from(DiatonicAltDegree.bVI, DiatonicAltPattern.TRIAD_AUGMENTED);
        DegreeFunction.VIaug = DegreeFunction.from(DiatonicAltDegree.VI, DiatonicAltPattern.TRIAD_AUGMENTED);
        DegreeFunction.bVIIaug = DegreeFunction.from(DiatonicAltDegree.bVII, DiatonicAltPattern.TRIAD_AUGMENTED);
        DegreeFunction.VIIaug = DegreeFunction.from(DiatonicAltDegree.VII, DiatonicAltPattern.TRIAD_AUGMENTED);

        /* Seventh */

        DegreeFunction.I7 = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.SEVENTH);
        DegreeFunction.bII7 = DegreeFunction.from(DiatonicAltDegree.bII, DiatonicAltPattern.SEVENTH);
        DegreeFunction.II7 = DegreeFunction.from(DiatonicAltDegree.II, DiatonicAltPattern.SEVENTH);
        DegreeFunction.bIII7 = DegreeFunction.from(DiatonicAltDegree.bIII, DiatonicAltPattern.SEVENTH);
        DegreeFunction.III7 = DegreeFunction.from(DiatonicAltDegree.III, DiatonicAltPattern.SEVENTH);
        DegreeFunction.IV7 = DegreeFunction.from(DiatonicAltDegree.IV, DiatonicAltPattern.SEVENTH);
        DegreeFunction.bV7 = DegreeFunction.from(DiatonicAltDegree.bV, DiatonicAltPattern.SEVENTH);
        DegreeFunction.V7 = DegreeFunction.from(DiatonicAltDegree.V, DiatonicAltPattern.SEVENTH);
        DegreeFunction.bVI7 = DegreeFunction.from(DiatonicAltDegree.bVI, DiatonicAltPattern.SEVENTH);
        DegreeFunction.VI7 = DegreeFunction.from(DiatonicAltDegree.VI, DiatonicAltPattern.SEVENTH);
        DegreeFunction.bVII7 = DegreeFunction.from(DiatonicAltDegree.bVII, DiatonicAltPattern.SEVENTH);
        DegreeFunction.VII7 = DegreeFunction.from(DiatonicAltDegree.VII, DiatonicAltPattern.SEVENTH);

        DegreeFunction.I7SUS4 = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.SEVENTH_SUS4);
        DegreeFunction.bII7SUS4 = DegreeFunction.from(DiatonicAltDegree.bII, DiatonicAltPattern.SEVENTH_SUS4);
        DegreeFunction.II7SUS4 = DegreeFunction.from(DiatonicAltDegree.II, DiatonicAltPattern.SEVENTH_SUS4);
        DegreeFunction.bIII7SUS4 = DegreeFunction.from(DiatonicAltDegree.bIII, DiatonicAltPattern.SEVENTH_SUS4);
        DegreeFunction.III7SUS4 = DegreeFunction.from(DiatonicAltDegree.III, DiatonicAltPattern.SEVENTH_SUS4);
        DegreeFunction.IV7SUS4 = DegreeFunction.from(DiatonicAltDegree.IV, DiatonicAltPattern.SEVENTH_SUS4);
        DegreeFunction.bV7SUS4 = DegreeFunction.from(DiatonicAltDegree.bV, DiatonicAltPattern.SEVENTH_SUS4);
        DegreeFunction.V7SUS4 = DegreeFunction.from(DiatonicAltDegree.V, DiatonicAltPattern.SEVENTH_SUS4);
        DegreeFunction.bVI7SUS4 = DegreeFunction.from(DiatonicAltDegree.bVI, DiatonicAltPattern.SEVENTH_SUS4);
        DegreeFunction.VI7SUS4 = DegreeFunction.from(DiatonicAltDegree.VI, DiatonicAltPattern.SEVENTH_SUS4);
        DegreeFunction.bVII7SUS4 = DegreeFunction.from(DiatonicAltDegree.bVII, DiatonicAltPattern.SEVENTH_SUS4);
        DegreeFunction.VII7SUS4 = DegreeFunction.from(DiatonicAltDegree.VII, DiatonicAltPattern.SEVENTH_SUS4);

        DegreeFunction.I7SUS4b9 = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.SEVENTH_SUS4_b9);
        DegreeFunction.bII7SUS4b9 = DegreeFunction.from(DiatonicAltDegree.bII, DiatonicAltPattern.SEVENTH_SUS4_b9);
        DegreeFunction.II7SUS4b9 = DegreeFunction.from(DiatonicAltDegree.II, DiatonicAltPattern.SEVENTH_SUS4_b9);
        DegreeFunction.bIII7SUS4b9 = DegreeFunction.from(DiatonicAltDegree.bIII, DiatonicAltPattern.SEVENTH_SUS4_b9);
        DegreeFunction.III7SUS4b9 = DegreeFunction.from(DiatonicAltDegree.III, DiatonicAltPattern.SEVENTH_SUS4_b9);
        DegreeFunction.IV7SUS4b9 = DegreeFunction.from(DiatonicAltDegree.IV, DiatonicAltPattern.SEVENTH_SUS4_b9);
        DegreeFunction.bV7SUS4b9 = DegreeFunction.from(DiatonicAltDegree.bV, DiatonicAltPattern.SEVENTH_SUS4_b9);
        DegreeFunction.V7SUS4b9 = DegreeFunction.from(DiatonicAltDegree.V, DiatonicAltPattern.SEVENTH_SUS4_b9);
        DegreeFunction.bVI7SUS4b9 = DegreeFunction.from(DiatonicAltDegree.bVI, DiatonicAltPattern.SEVENTH_SUS4_b9);
        DegreeFunction.VI7SUS4b9 = DegreeFunction.from(DiatonicAltDegree.VI, DiatonicAltPattern.SEVENTH_SUS4_b9);
        DegreeFunction.bVII7SUS4b9 = DegreeFunction.from(DiatonicAltDegree.bVII, DiatonicAltPattern.SEVENTH_SUS4_b9);
        DegreeFunction.VII7SUS4b9 = DegreeFunction.from(DiatonicAltDegree.VII, DiatonicAltPattern.SEVENTH_SUS4_b9);

        DegreeFunction.I6 = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.SIXTH);
        DegreeFunction.bII6 = DegreeFunction.from(DiatonicAltDegree.bII, DiatonicAltPattern.SIXTH);
        DegreeFunction.II6 = DegreeFunction.from(DiatonicAltDegree.II, DiatonicAltPattern.SIXTH);
        DegreeFunction.bIII6 = DegreeFunction.from(DiatonicAltDegree.bIII, DiatonicAltPattern.SIXTH);
        DegreeFunction.III6 = DegreeFunction.from(DiatonicAltDegree.III, DiatonicAltPattern.SIXTH);
        DegreeFunction.IV6 = DegreeFunction.from(DiatonicAltDegree.IV, DiatonicAltPattern.SIXTH);
        DegreeFunction.bV6 = DegreeFunction.from(DiatonicAltDegree.bV, DiatonicAltPattern.SIXTH);
        DegreeFunction.V6 = DegreeFunction.from(DiatonicAltDegree.V, DiatonicAltPattern.SIXTH);
        DegreeFunction.bVI6 = DegreeFunction.from(DiatonicAltDegree.bVI, DiatonicAltPattern.SIXTH);
        DegreeFunction.VI6 = DegreeFunction.from(DiatonicAltDegree.VI, DiatonicAltPattern.SIXTH);
        DegreeFunction.bVII6 = DegreeFunction.from(DiatonicAltDegree.bVII, DiatonicAltPattern.SIXTH);
        DegreeFunction.VII6 = DegreeFunction.from(DiatonicAltDegree.VII, DiatonicAltPattern.SIXTH);

        DegreeFunction.Im6 = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.SIXTH_MINOR);
        DegreeFunction.bIIm6 = DegreeFunction.from(DiatonicAltDegree.bII, DiatonicAltPattern.SIXTH_MINOR);
        DegreeFunction.IIm6 = DegreeFunction.from(DiatonicAltDegree.II, DiatonicAltPattern.SIXTH_MINOR);
        DegreeFunction.bIIIm6 = DegreeFunction.from(DiatonicAltDegree.bIII, DiatonicAltPattern.SIXTH_MINOR);
        DegreeFunction.IIIm6 = DegreeFunction.from(DiatonicAltDegree.III, DiatonicAltPattern.SIXTH_MINOR);
        DegreeFunction.IVm6 = DegreeFunction.from(DiatonicAltDegree.IV, DiatonicAltPattern.SIXTH_MINOR);
        DegreeFunction.bVm6 = DegreeFunction.from(DiatonicAltDegree.bV, DiatonicAltPattern.SIXTH_MINOR);
        DegreeFunction.Vm6 = DegreeFunction.from(DiatonicAltDegree.V, DiatonicAltPattern.SIXTH_MINOR);
        DegreeFunction.bVIm6 = DegreeFunction.from(DiatonicAltDegree.bVI, DiatonicAltPattern.SIXTH_MINOR);
        DegreeFunction.VIm6 = DegreeFunction.from(DiatonicAltDegree.VI, DiatonicAltPattern.SIXTH_MINOR);
        DegreeFunction.bVIIm6 = DegreeFunction.from(DiatonicAltDegree.bVII, DiatonicAltPattern.SIXTH_MINOR);
        DegreeFunction.VIIm6 = DegreeFunction.from(DiatonicAltDegree.VII, DiatonicAltPattern.SIXTH_MINOR);

        DegreeFunction.IMaj7 = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.SEVENTH_MAJ7);
        DegreeFunction.bIIMaj7 = DegreeFunction.from(DiatonicAltDegree.bII, DiatonicAltPattern.SEVENTH_MAJ7);
        DegreeFunction.IIMaj7 = DegreeFunction.from(DiatonicAltDegree.II, DiatonicAltPattern.SEVENTH_MAJ7);
        DegreeFunction.bIIIMaj7 = DegreeFunction.from(DiatonicAltDegree.bIII, DiatonicAltPattern.SEVENTH_MAJ7);
        DegreeFunction.IIIMaj7 = DegreeFunction.from(DiatonicAltDegree.III, DiatonicAltPattern.SEVENTH_MAJ7);
        DegreeFunction.IVMaj7 = DegreeFunction.from(DiatonicAltDegree.IV, DiatonicAltPattern.SEVENTH_MAJ7);
        DegreeFunction.bVMaj7 = DegreeFunction.from(DiatonicAltDegree.bV, DiatonicAltPattern.SEVENTH_MAJ7);
        DegreeFunction.VMaj7 = DegreeFunction.from(DiatonicAltDegree.V, DiatonicAltPattern.SEVENTH_MAJ7);
        DegreeFunction.bVIMaj7 = DegreeFunction.from(DiatonicAltDegree.bVI, DiatonicAltPattern.SEVENTH_MAJ7);
        DegreeFunction.VIMaj7 = DegreeFunction.from(DiatonicAltDegree.VI, DiatonicAltPattern.SEVENTH_MAJ7);
        DegreeFunction.bVIIMaj7 = DegreeFunction.from(DiatonicAltDegree.bVII, DiatonicAltPattern.SEVENTH_MAJ7);
        DegreeFunction.VIIMaj7 = DegreeFunction.from(DiatonicAltDegree.VII, DiatonicAltPattern.SEVENTH_MAJ7);

        DegreeFunction.IMaj7b5 = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.SEVENTH_MAJ7_b5);
        DegreeFunction.bIIMaj7b5 = DegreeFunction.from(DiatonicAltDegree.bII, DiatonicAltPattern.SEVENTH_MAJ7_b5);
        DegreeFunction.IIMaj7b5 = DegreeFunction.from(DiatonicAltDegree.II, DiatonicAltPattern.SEVENTH_MAJ7_b5);
        DegreeFunction.bIIIMaj7b5 = DegreeFunction.from(DiatonicAltDegree.bIII, DiatonicAltPattern.SEVENTH_MAJ7_b5);
        DegreeFunction.IIIMaj7b5 = DegreeFunction.from(DiatonicAltDegree.III, DiatonicAltPattern.SEVENTH_MAJ7_b5);
        DegreeFunction.IVMaj7b5 = DegreeFunction.from(DiatonicAltDegree.IV, DiatonicAltPattern.SEVENTH_MAJ7_b5);
        DegreeFunction.bVMaj7b5 = DegreeFunction.from(DiatonicAltDegree.bV, DiatonicAltPattern.SEVENTH_MAJ7_b5);
        DegreeFunction.VMaj7b5 = DegreeFunction.from(DiatonicAltDegree.V, DiatonicAltPattern.SEVENTH_MAJ7_b5);
        DegreeFunction.bVIMaj7b5 = DegreeFunction.from(DiatonicAltDegree.bVI, DiatonicAltPattern.SEVENTH_MAJ7_b5);
        DegreeFunction.VIMaj7b5 = DegreeFunction.from(DiatonicAltDegree.VI, DiatonicAltPattern.SEVENTH_MAJ7_b5);
        DegreeFunction.bVIIMaj7b5 = DegreeFunction.from(DiatonicAltDegree.bVII, DiatonicAltPattern.SEVENTH_MAJ7_b5);
        DegreeFunction.VIIMaj7b5 = DegreeFunction.from(DiatonicAltDegree.VII, DiatonicAltPattern.SEVENTH_MAJ7_b5);

        DegreeFunction.Im7 = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.SEVENTH_MINOR);
        DegreeFunction.bIIm7 = DegreeFunction.from(DiatonicAltDegree.bII, DiatonicAltPattern.SEVENTH_MINOR);
        DegreeFunction.IIm7 = DegreeFunction.from(DiatonicAltDegree.II, DiatonicAltPattern.SEVENTH_MINOR);
        DegreeFunction.bIIIm7 = DegreeFunction.from(DiatonicAltDegree.bIII, DiatonicAltPattern.SEVENTH_MINOR);
        DegreeFunction.IIIm7 = DegreeFunction.from(DiatonicAltDegree.III, DiatonicAltPattern.SEVENTH_MINOR);
        DegreeFunction.IVm7 = DegreeFunction.from(DiatonicAltDegree.IV, DiatonicAltPattern.SEVENTH_MINOR);
        DegreeFunction.bVm7 = DegreeFunction.from(DiatonicAltDegree.bV, DiatonicAltPattern.SEVENTH_MINOR);
        DegreeFunction.Vm7 = DegreeFunction.from(DiatonicAltDegree.V, DiatonicAltPattern.SEVENTH_MINOR);
        DegreeFunction.bVIm7 = DegreeFunction.from(DiatonicAltDegree.bVI, DiatonicAltPattern.SEVENTH_MINOR);
        DegreeFunction.VIm7 = DegreeFunction.from(DiatonicAltDegree.VI, DiatonicAltPattern.SEVENTH_MINOR);
        DegreeFunction.bVIIm7 = DegreeFunction.from(DiatonicAltDegree.bVII, DiatonicAltPattern.SEVENTH_MINOR);
        DegreeFunction.VIIm7 = DegreeFunction.from(DiatonicAltDegree.VII, DiatonicAltPattern.SEVENTH_MINOR);

        DegreeFunction.Im7b5 = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.SEVENTH_MINOR_b5);
        DegreeFunction.bIIm7b5 = DegreeFunction.from(DiatonicAltDegree.bII, DiatonicAltPattern.SEVENTH_MINOR_b5);
        DegreeFunction.IIm7b5 = DegreeFunction.from(DiatonicAltDegree.II, DiatonicAltPattern.SEVENTH_MINOR_b5);
        DegreeFunction.bIIIm7b5 = DegreeFunction.from(DiatonicAltDegree.bIII, DiatonicAltPattern.SEVENTH_MINOR_b5);
        DegreeFunction.IIIm7b5 = DegreeFunction.from(DiatonicAltDegree.III, DiatonicAltPattern.SEVENTH_MINOR_b5);
        DegreeFunction.IVm7b5 = DegreeFunction.from(DiatonicAltDegree.IV, DiatonicAltPattern.SEVENTH_MINOR_b5);
        DegreeFunction.bVm7b5 = DegreeFunction.from(DiatonicAltDegree.bV, DiatonicAltPattern.SEVENTH_MINOR_b5);
        DegreeFunction.Vm7b5 = DegreeFunction.from(DiatonicAltDegree.V, DiatonicAltPattern.SEVENTH_MINOR_b5);
        DegreeFunction.bVIm7b5 = DegreeFunction.from(DiatonicAltDegree.bVI, DiatonicAltPattern.SEVENTH_MINOR_b5);
        DegreeFunction.VIm7b5 = DegreeFunction.from(DiatonicAltDegree.VI, DiatonicAltPattern.SEVENTH_MINOR_b5);
        DegreeFunction.bVIIm7b5 = DegreeFunction.from(DiatonicAltDegree.bVII, DiatonicAltPattern.SEVENTH_MINOR_b5);
        DegreeFunction.VIIm7b5 = DegreeFunction.from(DiatonicAltDegree.VII, DiatonicAltPattern.SEVENTH_MINOR_b5);

        //Immutables.lockrIf(DegreeFunction, (obj) => !(obj instanceof ImmutablesCache));
    }
}
