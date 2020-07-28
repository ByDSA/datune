import { PrecalcCache } from '../common/PrecalcCache';
import { Chromatic } from "../degrees/Chromatic";
import { Pitch } from "../pitch/Pitch";
import { SPN } from "../pitch/symbolic/SPN";
import { Tuning } from "../tuning/Tuning";

type HashingObject = { spn: SPN, detuned: number };
export class MidiPitch extends Pitch {
    public static MIN: MidiPitch;

    public static C0: MidiPitch;
    public static CC0: MidiPitch;
    public static D0: MidiPitch;
    public static DD0: MidiPitch;
    public static E0: MidiPitch;
    public static F0: MidiPitch;
    public static FF0: MidiPitch;
    public static G0: MidiPitch;
    public static GG0: MidiPitch;
    public static A0: MidiPitch;
    public static AA0: MidiPitch;
    public static B0: MidiPitch;
    public static C1: MidiPitch;
    public static CC1: MidiPitch;
    public static D1: MidiPitch;
    public static DD1: MidiPitch;
    public static E1: MidiPitch;
    public static F1: MidiPitch;
    public static FF1: MidiPitch;
    public static G1: MidiPitch;
    public static GG1: MidiPitch;
    public static A1: MidiPitch;
    public static AA1: MidiPitch;
    public static B1: MidiPitch;
    public static C2: MidiPitch;
    public static CC2: MidiPitch;
    public static D2: MidiPitch;
    public static DD2: MidiPitch;
    public static E2: MidiPitch;
    public static F2: MidiPitch;
    public static FF2: MidiPitch;
    public static G2: MidiPitch;
    public static GG2: MidiPitch;
    public static A2: MidiPitch;
    public static AA2: MidiPitch;
    public static B2: MidiPitch;
    public static C3: MidiPitch;
    public static CC3: MidiPitch;
    public static D3: MidiPitch;
    public static DD3: MidiPitch;
    public static E3: MidiPitch;
    public static F3: MidiPitch;
    public static FF3: MidiPitch;
    public static G3: MidiPitch;
    public static GG3: MidiPitch;
    public static A3: MidiPitch;
    public static AA3: MidiPitch;
    public static B3: MidiPitch;
    public static C4: MidiPitch;
    public static CC4: MidiPitch;
    public static D4: MidiPitch;
    public static DD4: MidiPitch;
    public static E4: MidiPitch;
    public static F4: MidiPitch;
    public static FF4: MidiPitch;
    public static G4: MidiPitch;
    public static GG4: MidiPitch;
    public static A4: MidiPitch;
    public static AA4: MidiPitch;
    public static B4: MidiPitch;
    public static C5: MidiPitch;
    public static CC5: MidiPitch;
    public static D5: MidiPitch;
    public static DD5: MidiPitch;
    public static E5: MidiPitch;
    public static F5: MidiPitch;
    public static FF5: MidiPitch;
    public static G5: MidiPitch;
    public static GG5: MidiPitch;
    public static A5: MidiPitch;
    public static AA5: MidiPitch;
    public static B5: MidiPitch;
    public static C6: MidiPitch;
    public static CC6: MidiPitch;
    public static D6: MidiPitch;
    public static DD6: MidiPitch;
    public static E6: MidiPitch;
    public static F6: MidiPitch;
    public static FF6: MidiPitch;
    public static G6: MidiPitch;
    public static GG6: MidiPitch;
    public static A6: MidiPitch;
    public static AA6: MidiPitch;
    public static B6: MidiPitch;
    public static C7: MidiPitch;
    public static CC7: MidiPitch;
    public static D7: MidiPitch;
    public static DD7: MidiPitch;
    public static E7: MidiPitch;
    public static F7: MidiPitch;
    public static FF7: MidiPitch;
    public static G7: MidiPitch;
    public static GG7: MidiPitch;
    public static A7: MidiPitch;
    public static AA7: MidiPitch;
    public static B7: MidiPitch;
    public static C8: MidiPitch;
    public static CC8: MidiPitch;
    public static D8: MidiPitch;
    public static DD8: MidiPitch;
    public static E8: MidiPitch;
    public static F8: MidiPitch;
    public static FF8: MidiPitch;
    public static G8: MidiPitch;
    public static GG8: MidiPitch;
    public static A8: MidiPitch;
    public static AA8: MidiPitch;
    public static B8: MidiPitch;
    public static C9: MidiPitch;
    public static CC9: MidiPitch;
    public static D9: MidiPitch;
    public static DD9: MidiPitch;
    public static E9: MidiPitch;
    public static F9: MidiPitch;
    public static FF9: MidiPitch;
    public static G9: MidiPitch;
    public static GG9: MidiPitch;
    public static A9: MidiPitch;
    public static AA9: MidiPitch;
    public static B9: MidiPitch;
    public static C10: MidiPitch;
    public static CC10: MidiPitch;
    public static D10: MidiPitch;
    public static DD10: MidiPitch;
    public static E10: MidiPitch;
    public static F10: MidiPitch;
    public static FF10: MidiPitch;
    public static G10: MidiPitch;

    public static MAX: MidiPitch;

    private static _cache = new (class Cache extends PrecalcCache<MidiPitch, HashingObject>{
        getHash(hashingObject: HashingObject): string {
            return hashingObject.spn.valueOf() + "-" + hashingObject.detuned;
        }

        getHashingObject(midiNote: MidiPitch): HashingObject {
            return { spn: midiNote.spn, detuned: midiNote.cents };
        }

        create(hashingObject: HashingObject): MidiPitch {
            return new MidiPitch(hashingObject.spn, hashingObject.detuned);
        }
    });

    private constructor(private _spn: SPN, private _cents: number) {
        super();
    }

    public static from(spn: SPN, detuned: number = 0) {
        return this._cache.getOrCreate({ spn: spn, detuned: detuned });
    }

    public static fromFrequency(f: number): MidiPitch {
        let semis = 12 * Math.log2(f / 440);
        let code = 69 + Math.round(semis);
        let cents = Math.round(100 * (semis - Math.round(semis)));

        return this.fromCode(code, cents);
    }

    public static fromCode(code: number, cents: number = 0): MidiPitch {
        if (Math.floor(code) != code)
            throw new Error();

        if (code < 0 || code > 127)
            throw new Error();

        let octave = Math.floor(code / Chromatic.NUMBER);
        let chromaticInt = code - Chromatic.NUMBER * octave;
        let chromatic: Chromatic = Chromatic.fromInt(chromaticInt);
        let spn: SPN = SPN.from(chromatic, octave - 1)

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

    public toString(): string {
        return this.spn.chromatic.toString() + this.octave + this.getCentsTxt();
    }

    private getCentsTxt(): string {
        if (this.cents > 0)
            return " (+" + this.cents + ")";
        else if (this.cents < 0)
            return " (" + this.cents.toString() + ")";
        else
            return "";
    }

    private static initialize() {
        mainLoop: for (let i = 0; i <= 10; i++) {
            for (const chromatic of Chromatic.all) {
                let varStr: string = (<any>chromatic).varStr + i;
                let varSPN = this.getVarSPN(chromatic, i);

                this[varStr] = MidiPitch.from(SPN[varSPN], 0);

                if (varStr == "G10")
                    break mainLoop;
            }
        }

        this.MIN = this.C0;
        this.MAX = this.G10;
    }

    private static getVarSPN(chromatic: Chromatic, octave: number): string {
        let varSPN = (<any>chromatic).varStr;
        if (octave > 0)
            varSPN += octave - 1;
        else
            varSPN += "_S" + (-(octave - 1));

        return varSPN;
    }
}