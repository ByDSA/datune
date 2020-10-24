import { DiatonicAltChord } from '../../chords/DiatonicAltChord';
import { RootPatternChord } from '../../chords/parametric/RootPatternChord';
import { Chromatic } from '../../degrees/Chromatic';
import { DiatonicAltDegree } from '../../scales/degrees/DiatonicAltDegree';
import { DiatonicDegree } from '../../scales/degrees/DiatonicDegree';
import { Diatonic } from '../../degrees/Diatonic';
import { DiatonicAlt } from '../../degrees/DiatonicAlt';
import { DiatonicAltPattern } from '../../patterns/DiatonicAltPattern';
import { Tonality } from '../Tonality';
import { HarmonicFunction } from './HarmonicFunction';
import { HashingObjectType, DegreeFunctionCache, hashCodeFunction } from './DegreeFunctionCache';

export class DegreeFunction extends HarmonicFunction {
    static I5: DegreeFunction;
    static bII5: DegreeFunction;
    static II5: DegreeFunction;
    static bIII5: DegreeFunction;
    static III5: DegreeFunction;
    static IV5: DegreeFunction;
    static bV5: DegreeFunction;
    static V5: DegreeFunction;
    static bVI5: DegreeFunction;
    static VI5: DegreeFunction;
    static bVII5: DegreeFunction;
    static VII5: DegreeFunction;

    static I: DegreeFunction;
    static bII: DegreeFunction;
    static N6: DegreeFunction;
    static II: DegreeFunction;
    static bIII: DegreeFunction;
    static III: DegreeFunction;
    static IV: DegreeFunction;
    static bV: DegreeFunction;
    static V: DegreeFunction;
    static bVI: DegreeFunction;
    static VI: DegreeFunction;
    static bVII: DegreeFunction;
    static VII: DegreeFunction;

    static ISUS4: DegreeFunction;
    static bIISUS4: DegreeFunction;
    static IISUS4: DegreeFunction;
    static bIIISUS4: DegreeFunction;
    static IIISUS4: DegreeFunction;
    static IVSUS4: DegreeFunction;
    static bVSUS4: DegreeFunction;
    static VSUS4: DegreeFunction;
    static bVISUS4: DegreeFunction;
    static VISUS4: DegreeFunction;
    static bVIISUS4: DegreeFunction;
    static VIISUS4: DegreeFunction;

    static i: DegreeFunction;
    static bii: DegreeFunction;
    static ii: DegreeFunction;
    static biii: DegreeFunction;
    static iii: DegreeFunction;
    static iv: DegreeFunction;
    static bv: DegreeFunction;
    static v: DegreeFunction;
    static bvi: DegreeFunction;
    static vi: DegreeFunction;
    static bvii: DegreeFunction;
    static vii: DegreeFunction;

    static I0: DegreeFunction;
    static bII0: DegreeFunction;
    static II0: DegreeFunction;
    static bIII0: DegreeFunction;
    static III0: DegreeFunction;
    static IV0: DegreeFunction;
    static bV0: DegreeFunction;
    static V0: DegreeFunction;
    static bVI0: DegreeFunction;
    static VI0: DegreeFunction;
    static bVII0: DegreeFunction;
    static VII0: DegreeFunction;


    static Iaug: DegreeFunction;
    static bIIaug: DegreeFunction;
    static IIaug: DegreeFunction;
    static bIIIaug: DegreeFunction;
    static IIIaug: DegreeFunction;
    static IVaug: DegreeFunction;
    static bVaug: DegreeFunction;
    static Vaug: DegreeFunction;
    static bVIaug: DegreeFunction;
    static VIaug: DegreeFunction;
    static bVIIaug: DegreeFunction;
    static VIIaug: DegreeFunction;

    /* Seventh */

    static I7: DegreeFunction;
    static bII7: DegreeFunction;
    static II7: DegreeFunction;
    static bIII7: DegreeFunction;
    static III7: DegreeFunction;
    static IV7: DegreeFunction;
    static bV7: DegreeFunction;
    static V7: DegreeFunction;
    static bVI7: DegreeFunction;
    static VI7: DegreeFunction;
    static bVII7: DegreeFunction;
    static VII7: DegreeFunction;

    static I7SUS4: DegreeFunction;
    static bII7SUS4: DegreeFunction;
    static II7SUS4: DegreeFunction;
    static bIII7SUS4: DegreeFunction;
    static III7SUS4: DegreeFunction;
    static IV7SUS4: DegreeFunction;
    static bV7SUS4: DegreeFunction;
    static V7SUS4: DegreeFunction;
    static bVI7SUS4: DegreeFunction;
    static VI7SUS4: DegreeFunction;
    static bVII7SUS4: DegreeFunction;
    static VII7SUS4: DegreeFunction;

    static I7SUS4b9: DegreeFunction;
    static bII7SUS4b9: DegreeFunction;
    static II7SUS4b9: DegreeFunction;
    static bIII7SUS4b9: DegreeFunction;
    static III7SUS4b9: DegreeFunction;
    static IV7SUS4b9: DegreeFunction;
    static bV7SUS4b9: DegreeFunction;
    static V7SUS4b9: DegreeFunction;
    static bVI7SUS4b9: DegreeFunction;
    static VI7SUS4b9: DegreeFunction;
    static bVII7SUS4b9: DegreeFunction;
    static VII7SUS4b9: DegreeFunction;

    static I6: DegreeFunction;
    static bII6: DegreeFunction;
    static II6: DegreeFunction;
    static bIII6: DegreeFunction;
    static III6: DegreeFunction;
    static IV6: DegreeFunction;
    static bV6: DegreeFunction;
    static V6: DegreeFunction;
    static bVI6: DegreeFunction;
    static VI6: DegreeFunction;
    static bVII6: DegreeFunction;
    static VII6: DegreeFunction;

    static Im6: DegreeFunction;
    static bIIm6: DegreeFunction;
    static IIm6: DegreeFunction;
    static bIIIm6: DegreeFunction;
    static IIIm6: DegreeFunction;
    static IVm6: DegreeFunction;
    static bVm6: DegreeFunction;
    static Vm6: DegreeFunction;
    static bVIm6: DegreeFunction;
    static VIm6: DegreeFunction;
    static bVIIm6: DegreeFunction;
    static VIIm6: DegreeFunction;

    static IMaj7: DegreeFunction;
    static bIIMaj7: DegreeFunction;
    static IIMaj7: DegreeFunction;
    static bIIIMaj7: DegreeFunction;
    static IIIMaj7: DegreeFunction;
    static IVMaj7: DegreeFunction;
    static bVMaj7: DegreeFunction;
    static VMaj7: DegreeFunction;
    static bVIMaj7: DegreeFunction;
    static VIMaj7: DegreeFunction;
    static bVIIMaj7: DegreeFunction;
    static VIIMaj7: DegreeFunction;

    static IMaj7b5: DegreeFunction;
    static bIIMaj7b5: DegreeFunction;
    static IIMaj7b5: DegreeFunction;
    static bIIIMaj7b5: DegreeFunction;
    static IIIMaj7b5: DegreeFunction;
    static IVMaj7b5: DegreeFunction;
    static bVMaj7b5: DegreeFunction;
    static VMaj7b5: DegreeFunction;
    static bVIMaj7b5: DegreeFunction;
    static VIMaj7b5: DegreeFunction;
    static bVIIMaj7b5: DegreeFunction;
    static VIIMaj7b5: DegreeFunction;

    static Im7: DegreeFunction;
    static bIIm7: DegreeFunction;
    static IIm7: DegreeFunction;
    static bIIIm7: DegreeFunction;
    static IIIm7: DegreeFunction;
    static IVm7: DegreeFunction;
    static bVm7: DegreeFunction;
    static Vm7: DegreeFunction;
    static bVIm7: DegreeFunction;
    static VIm7: DegreeFunction;
    static bVIIm7: DegreeFunction;
    static VIIm7: DegreeFunction;

    static Im7b5: DegreeFunction;
    static bIIm7b5: DegreeFunction;
    static IIm7b5: DegreeFunction;
    static bIIIm7b5: DegreeFunction;
    static IIIm7b5: DegreeFunction;
    static IVm7b5: DegreeFunction;
    static bVm7b5: DegreeFunction;
    static Vm7b5: DegreeFunction;
    static bVIm7b5: DegreeFunction;
    static VIm7b5: DegreeFunction;
    static bVIIm7b5: DegreeFunction;
    static VIIm7b5: DegreeFunction;


    static TRIAD_FUNCTIONS: DegreeFunction[];

    static SEVENTH_FUNCTIONS: DegreeFunction[];

    static POWER_CHORD_FUNCTIONS: DegreeFunction[];

    static SUS4_FUNCTIONS: DegreeFunction[];

    /********* END CONSTANTS ***********/

    private static _cache = new DegreeFunctionCache(
        (hashingObject: HashingObjectType) => new DegreeFunction(hashingObject.degree, hashingObject.pattern)
    );

    protected constructor(private _degree: DiatonicAltDegree, private _pattern: DiatonicAltPattern) {
        super();
    }

    static from(degree: DiatonicAltDegree, pattern: DiatonicAltPattern): DegreeFunction {
        return this._cache.getOrCreate({ degree: degree, pattern: pattern });
    }

    get degree(): DiatonicAltDegree {
        return this._degree;
    }

    get pattern(): DiatonicAltPattern {
        return this._pattern;
    }

    calculateChord(tonality: Tonality): DiatonicAltChord {
        let noteBase: DiatonicAlt = DegreeFunction.getNoteBaseFromChromaticFunctionAndTonality(tonality, this);

        return <DiatonicAltChord>RootPatternChord.from(noteBase, this._pattern).chord;
    }

    private static getNoteBaseFromChromaticFunctionAndTonality(tonality: Tonality, degreeFunction: DegreeFunction): DiatonicAlt {
        return tonality.root.withAdd(degreeFunction.degree.intervalDiatonicAlt);
    }

    private _degrees: DiatonicAltDegree[];

    get degrees(): DiatonicAltDegree[] {
        if (!this._degrees) {
            this._degrees = [];
            for (let value of this.pattern) {
                let diatonicDegreeInt = this.degree.diatonicDegree.valueOf() + value.intervalDiatonic.valueOf();
                let diatonicDegree = DiatonicDegree.fromInt(diatonicDegreeInt);
                let alts = (this.degree.semis + value.intervalChromatic) - Diatonic.fromInt(diatonicDegree.valueOf()).chromatic.valueOf();
                alts %= Chromatic.NUMBER;
                let degree = DiatonicAltDegree.from(diatonicDegree, alts);
                this._degrees.push(degree);
            }
        }

        return this._degrees;
    }

    /* Object */

    toString(): string {
        switch (this._pattern) {
            case DiatonicAltPattern.TRIAD_MINOR: return this._degree.toString().toLowerCase();
        }

        return this._degree.toString() + this._pattern.shortName;
    }

    hashCode(): string {
        return hashCodeFunction(this._degree, this._pattern);
    }
}
