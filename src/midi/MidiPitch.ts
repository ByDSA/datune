import { DiatonicAlt } from '../degrees/DiatonicAlt';
import { Chromatic } from "../degrees/Chromatic";
import { Pitch } from "../pitches/Pitch";
import { SPN } from "../pitches/symbolic/SPN";
import { Tuning } from "../tuning/Tuning";
import { HashingObject, MidiPitchCache } from './MidiPitchCache';

export class MidiPitch extends Pitch {
    static MIN: MidiPitch;

    static C0: MidiPitch;
    static CC0: MidiPitch;
    static D0: MidiPitch;
    static DD0: MidiPitch;
    static E0: MidiPitch;
    static F0: MidiPitch;
    static FF0: MidiPitch;
    static G0: MidiPitch;
    static GG0: MidiPitch;
    static A0: MidiPitch;
    static AA0: MidiPitch;
    static B0: MidiPitch;
    static C1: MidiPitch;
    static CC1: MidiPitch;
    static D1: MidiPitch;
    static DD1: MidiPitch;
    static E1: MidiPitch;
    static F1: MidiPitch;
    static FF1: MidiPitch;
    static G1: MidiPitch;
    static GG1: MidiPitch;
    static A1: MidiPitch;
    static AA1: MidiPitch;
    static B1: MidiPitch;
    static C2: MidiPitch;
    static CC2: MidiPitch;
    static D2: MidiPitch;
    static DD2: MidiPitch;
    static E2: MidiPitch;
    static F2: MidiPitch;
    static FF2: MidiPitch;
    static G2: MidiPitch;
    static GG2: MidiPitch;
    static A2: MidiPitch;
    static AA2: MidiPitch;
    static B2: MidiPitch;
    static C3: MidiPitch;
    static CC3: MidiPitch;
    static D3: MidiPitch;
    static DD3: MidiPitch;
    static E3: MidiPitch;
    static F3: MidiPitch;
    static FF3: MidiPitch;
    static G3: MidiPitch;
    static GG3: MidiPitch;
    static A3: MidiPitch;
    static AA3: MidiPitch;
    static B3: MidiPitch;
    static C4: MidiPitch;
    static CC4: MidiPitch;
    static D4: MidiPitch;
    static DD4: MidiPitch;
    static E4: MidiPitch;
    static F4: MidiPitch;
    static FF4: MidiPitch;
    static G4: MidiPitch;
    static GG4: MidiPitch;
    static A4: MidiPitch;
    static AA4: MidiPitch;
    static B4: MidiPitch;
    static C5: MidiPitch;
    static CC5: MidiPitch;
    static D5: MidiPitch;
    static DD5: MidiPitch;
    static E5: MidiPitch;
    static F5: MidiPitch;
    static FF5: MidiPitch;
    static G5: MidiPitch;
    static GG5: MidiPitch;
    static A5: MidiPitch;
    static AA5: MidiPitch;
    static B5: MidiPitch;
    static C6: MidiPitch;
    static CC6: MidiPitch;
    static D6: MidiPitch;
    static DD6: MidiPitch;
    static E6: MidiPitch;
    static F6: MidiPitch;
    static FF6: MidiPitch;
    static G6: MidiPitch;
    static GG6: MidiPitch;
    static A6: MidiPitch;
    static AA6: MidiPitch;
    static B6: MidiPitch;
    static C7: MidiPitch;
    static CC7: MidiPitch;
    static D7: MidiPitch;
    static DD7: MidiPitch;
    static E7: MidiPitch;
    static F7: MidiPitch;
    static FF7: MidiPitch;
    static G7: MidiPitch;
    static GG7: MidiPitch;
    static A7: MidiPitch;
    static AA7: MidiPitch;
    static B7: MidiPitch;
    static C8: MidiPitch;
    static CC8: MidiPitch;
    static D8: MidiPitch;
    static DD8: MidiPitch;
    static E8: MidiPitch;
    static F8: MidiPitch;
    static FF8: MidiPitch;
    static G8: MidiPitch;
    static GG8: MidiPitch;
    static A8: MidiPitch;
    static AA8: MidiPitch;
    static B8: MidiPitch;
    static C9: MidiPitch;
    static CC9: MidiPitch;
    static D9: MidiPitch;
    static DD9: MidiPitch;
    static E9: MidiPitch;
    static F9: MidiPitch;
    static FF9: MidiPitch;
    static G9: MidiPitch;
    static GG9: MidiPitch;
    static A9: MidiPitch;
    static AA9: MidiPitch;
    static B9: MidiPitch;
    static C10: MidiPitch;
    static CC10: MidiPitch;
    static D10: MidiPitch;
    static DD10: MidiPitch;
    static E10: MidiPitch;
    static F10: MidiPitch;
    static FF10: MidiPitch;
    static G10: MidiPitch;

    static MAX: MidiPitch;

    private static _cache = new MidiPitchCache(
        (hashingObject: HashingObject) => new MidiPitch(hashingObject.spn, hashingObject.detuned)
    );

    private constructor(private _spn: SPN, private _cents: number) {
        super();
    }

    static from(spn: SPN, detuned: number = 0) {
        return this._cache.getOrCreate({ spn: spn, detuned: detuned });
    }

    static fromFrequency(f: number): MidiPitch {
        let semis = 12 * Math.log2(f / 440);
        let code = 69 + Math.round(semis);
        let cents = Math.round(100 * (semis - Math.round(semis)));

        return this.fromCode(code, cents);
    }

    static fromCode(code: number, cents: number = 0): MidiPitch {
        if (Math.floor(code) != code)
            throw new Error();

        if (code < 0 || code > 127)
            throw new Error();

        let octave = Math.floor(code / Chromatic.NUMBER);
        let chromaticInt = code - Chromatic.NUMBER * octave;
        let chromatic: Chromatic = Chromatic.fromInt(chromaticInt);
        let diatonicAlt = DiatonicAlt.fromChromatic(chromatic);
        let spn: SPN = SPN.from(diatonicAlt, octave - 1)

        return this.from(spn, cents);
    }

    get spn(): SPN {
        return this._spn;
    }

    get cents(): number {
        return this._cents;
    }

    private _precalcFrequency: number;
    private _precalcFrequencyWithoutDetuned: number;

    get frequency(): number {
        if (!this._precalcFrequency) {
            this.precalcFreq();
        }

        return this._precalcFrequency;
    }

    get code(): number {
        if (!this._precalcFrequency) {
            this.precalcFreq();
        }
        return 69 + 12 * Math.log2(this._precalcFrequencyWithoutDetuned / 440);
    }

    get octave(): number {
        return this.spn.octave + 1;
    }

    private precalcFreq() {
        this._precalcFrequencyWithoutDetuned = Tuning.EQUAL_440.getFrequency(this.spn);
        this._precalcFrequency = this._precalcFrequencyWithoutDetuned * Math.pow(2, this.cents / 1200);
    }

    toString(): string {
        return this.spn.degree.toString() + this.octave + this.getCentsTxt();
    }

    private getCentsTxt(): string {
        if (this.cents > 0)
            return " (+" + this.cents + ")";
        else if (this.cents < 0)
            return " (" + this.cents.toString() + ")";
        else
            return "";
    }
}