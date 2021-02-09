import { Note, SPN, Tuning } from "@datune/core";
import { RealPitch } from "@datune/core/pitches";
import { HashingObject, MidiPitchCache } from './MidiPitchCache';

export type MidiCode =
    0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
    10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 |
    20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 |
    30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 |
    40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 |
    50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 |
    60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 |
    70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 |
    80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 |
    90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 |
    100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 |
    110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 |
    120 | 121 | 122 | 123 | 124 | 125 | 126 | 127;

export class MidiPitch extends RealPitch {
    private _precalcFrequency: number | undefined;
    private _precalcFrequencyWithoutDetuned: number | undefined;

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
        const roundSemis = Math.round(semis);
        let code = 69 + roundSemis;
        let cents = Math.round(100 * (semis - roundSemis));

        if (code < 0) {
            code = 0;
            cents = 0;
        } else if (code > 127) {
            code = 127;
            cents = 0;
        }

        return this.fromCode(<MidiCode>code, cents);
    }

    static fromCode(code: MidiCode, cents: number = 0): MidiPitch {
        let octave = Math.floor(code / Note.NUMBER);
        let noteInt = code - Note.NUMBER * octave;
        let note: Note = Note.fromInt(noteInt);
        let spn: SPN = <SPN>SPN.from(note, octave - 1)

        return this.from(spn, cents);
    }

    get spn(): SPN {
        return this._spn;
    }

    get cents(): number {
        return this._cents;
    }

    get frequency(): number {
        this._precalcFrequencyIfNot();

        return <number>this._precalcFrequency;
    }

    private _precalcFrequencyIfNot() {
        if (!this._precalcFrequency) {
            this._precalcFrequency = this._calcFreq();
            Object.freeze(this._precalcFrequency);
        }
    }

    get code(): number {
        this._precalcFrequencyIfNot();

        return 69 + 12 * Math.log2(<number>this._precalcFrequencyWithoutDetuned / 440);
    }

    get octave(): number {
        return this.spn.octave + 1;
    }

    private _calcFreq(): number {
        this._precalcFrequencyWithoutDetuned = Tuning.EQUAL_440.getFrequency(this.spn);
        return this._precalcFrequencyWithoutDetuned * Math.pow(2, this.cents / 1200);
    }

    valueOf(): number {
        return this.frequency;
    }

    toString(): string {
        return this.spn.degree.toString() + this.octave + this._getCentsTxt();
    }

    private _getCentsTxt(): string {
        if (this.cents > 0)
            return " (+" + this.cents + ")";
        else if (this.cents < 0)
            return " (" + this.cents.toString() + ")";
        else
            return "";
    }

    // SETS
    static get MIN(): MidiPitch {
        return MidiPitch.C0;
    }

    static get C0(): MidiPitch {
        return MidiPitch.from(SPN.C_S1, 0);
    }
    static get CC0(): MidiPitch {
        return MidiPitch.from(SPN.CC_S1, 0);
    }
    static get D0(): MidiPitch {
        return MidiPitch.from(SPN.D_S1, 0);
    }
    static get DD0(): MidiPitch {
        return MidiPitch.from(SPN.DD_S1, 0);
    }
    static get E0(): MidiPitch {
        return MidiPitch.from(SPN.E_S1, 0);
    }
    static get F0(): MidiPitch {
        return MidiPitch.from(SPN.F_S1, 0);
    }
    static get FF0(): MidiPitch {
        return MidiPitch.from(SPN.FF_S1, 0);
    }
    static get G0(): MidiPitch {
        return MidiPitch.from(SPN.G_S1, 0);
    }
    static get GG0(): MidiPitch {
        return MidiPitch.from(SPN.GG_S1, 0);
    }
    static get A0(): MidiPitch {
        return MidiPitch.from(SPN.A_S1, 0);
    }
    static get AA0(): MidiPitch {
        return MidiPitch.from(SPN.AA_S1, 0);
    }
    static get B0(): MidiPitch {
        return MidiPitch.from(SPN.B_S1, 0);
    }
    static get C1(): MidiPitch {
        return MidiPitch.from(SPN.C0, 0);
    }
    static get CC1(): MidiPitch {
        return MidiPitch.from(SPN.CC0, 0);
    }
    static get D1(): MidiPitch {
        return MidiPitch.from(SPN.D0, 0);
    }
    static get DD1(): MidiPitch {
        return MidiPitch.from(SPN.DD0, 0);
    }
    static get E1(): MidiPitch {
        return MidiPitch.from(SPN.E0, 0);
    }
    static get F1(): MidiPitch {
        return MidiPitch.from(SPN.F0, 0);
    }
    static get FF1(): MidiPitch {
        return MidiPitch.from(SPN.FF0, 0);
    }
    static get G1(): MidiPitch {
        return MidiPitch.from(SPN.G0, 0);
    }
    static get GG1(): MidiPitch {
        return MidiPitch.from(SPN.GG0, 0);
    }
    static get A1(): MidiPitch {
        return MidiPitch.from(SPN.A0, 0);
    }
    static get AA1(): MidiPitch {
        return MidiPitch.from(SPN.AA0, 0);
    }
    static get B1(): MidiPitch {
        return MidiPitch.from(SPN.B0, 0);
    }
    static get C2(): MidiPitch {
        return MidiPitch.from(SPN.C1, 0);
    }
    static get CC2(): MidiPitch {
        return MidiPitch.from(SPN.CC1, 0);
    }
    static get D2(): MidiPitch {
        return MidiPitch.from(SPN.D1, 0);
    }
    static get DD2(): MidiPitch {
        return MidiPitch.from(SPN.DD1, 0);
    }
    static get E2(): MidiPitch {
        return MidiPitch.from(SPN.E1, 0);
    }
    static get F2(): MidiPitch {
        return MidiPitch.from(SPN.F1, 0);
    }
    static get FF2(): MidiPitch {
        return MidiPitch.from(SPN.FF1, 0);
    }
    static get G2(): MidiPitch {
        return MidiPitch.from(SPN.G1, 0);
    }
    static get GG2(): MidiPitch {
        return MidiPitch.from(SPN.GG1, 0);
    }
    static get A2(): MidiPitch {
        return MidiPitch.from(SPN.A1, 0);
    }
    static get AA2(): MidiPitch {
        return MidiPitch.from(SPN.AA1, 0);
    }
    static get B2(): MidiPitch {
        return MidiPitch.from(SPN.B1, 0);
    }
    static get C3(): MidiPitch {
        return MidiPitch.from(SPN.C2, 0);
    }
    static get CC3(): MidiPitch {
        return MidiPitch.from(SPN.CC2, 0);
    }
    static get D3(): MidiPitch {
        return MidiPitch.from(SPN.D2, 0);
    }
    static get DD3(): MidiPitch {
        return MidiPitch.from(SPN.DD2, 0);
    }
    static get E3(): MidiPitch {
        return MidiPitch.from(SPN.E2, 0);
    }
    static get F3(): MidiPitch {
        return MidiPitch.from(SPN.F2, 0);
    }
    static get FF3(): MidiPitch {
        return MidiPitch.from(SPN.FF2, 0);
    }
    static get G3(): MidiPitch {
        return MidiPitch.from(SPN.G2, 0);
    }
    static get GG3(): MidiPitch {
        return MidiPitch.from(SPN.GG2, 0);
    }
    static get A3(): MidiPitch {
        return MidiPitch.from(SPN.A2, 0);
    }
    static get AA3(): MidiPitch {
        return MidiPitch.from(SPN.AA2, 0);
    }
    static get B3(): MidiPitch {
        return MidiPitch.from(SPN.B2, 0);
    }
    static get C4(): MidiPitch {
        return MidiPitch.from(SPN.C3, 0);
    }
    static get CC4(): MidiPitch {
        return MidiPitch.from(SPN.CC3, 0);
    }
    static get D4(): MidiPitch {
        return MidiPitch.from(SPN.D3, 0);
    }
    static get DD4(): MidiPitch {
        return MidiPitch.from(SPN.DD3, 0);
    }
    static get E4(): MidiPitch {
        return MidiPitch.from(SPN.E3, 0);
    }
    static get F4(): MidiPitch {
        return MidiPitch.from(SPN.F3, 0);
    }
    static get FF4(): MidiPitch {
        return MidiPitch.from(SPN.FF3, 0);
    }
    static get G4(): MidiPitch {
        return MidiPitch.from(SPN.G3, 0);
    }
    static get GG4(): MidiPitch {
        return MidiPitch.from(SPN.GG3, 0);
    }
    static get A4(): MidiPitch {
        return MidiPitch.from(SPN.A3, 0);
    }
    static get AA4(): MidiPitch {
        return MidiPitch.from(SPN.AA3, 0);
    }
    static get B4(): MidiPitch {
        return MidiPitch.from(SPN.B3, 0);
    }
    static get C5(): MidiPitch {
        return MidiPitch.from(SPN.C4, 0);
    }
    static get CC5(): MidiPitch {
        return MidiPitch.from(SPN.CC4, 0);
    }
    static get D5(): MidiPitch {
        return MidiPitch.from(SPN.D4, 0);
    }
    static get DD5(): MidiPitch {
        return MidiPitch.from(SPN.DD4, 0);
    }
    static get E5(): MidiPitch {
        return MidiPitch.from(SPN.E4, 0);
    }
    static get F5(): MidiPitch {
        return MidiPitch.from(SPN.F4, 0);
    }
    static get FF5(): MidiPitch {
        return MidiPitch.from(SPN.FF4, 0);
    }
    static get G5(): MidiPitch {
        return MidiPitch.from(SPN.G4, 0);
    }
    static get GG5(): MidiPitch {
        return MidiPitch.from(SPN.GG4, 0);
    }
    static get A5(): MidiPitch {
        return MidiPitch.from(SPN.A4, 0);
    }
    static get AA5(): MidiPitch {
        return MidiPitch.from(SPN.AA4, 0);
    }
    static get B5(): MidiPitch {
        return MidiPitch.from(SPN.B4, 0);
    }
    static get C6(): MidiPitch {
        return MidiPitch.from(SPN.C5, 0);
    }
    static get CC6(): MidiPitch {
        return MidiPitch.from(SPN.CC5, 0);
    }
    static get D6(): MidiPitch {
        return MidiPitch.from(SPN.D5, 0);
    }
    static get DD6(): MidiPitch {
        return MidiPitch.from(SPN.DD5, 0);
    }
    static get E6(): MidiPitch {
        return MidiPitch.from(SPN.E5, 0);
    }
    static get F6(): MidiPitch {
        return MidiPitch.from(SPN.F5, 0);
    }
    static get FF6(): MidiPitch {
        return MidiPitch.from(SPN.FF5, 0);
    }
    static get G6(): MidiPitch {
        return MidiPitch.from(SPN.G5, 0);
    }
    static get GG6(): MidiPitch {
        return MidiPitch.from(SPN.GG5, 0);
    }
    static get A6(): MidiPitch {
        return MidiPitch.from(SPN.A5, 0);
    }
    static get AA6(): MidiPitch {
        return MidiPitch.from(SPN.AA5, 0);
    }
    static get B6(): MidiPitch {
        return MidiPitch.from(SPN.B5, 0);
    }
    static get C7(): MidiPitch {
        return MidiPitch.from(SPN.C6, 0);
    }
    static get CC7(): MidiPitch {
        return MidiPitch.from(SPN.CC6, 0);
    }
    static get D7(): MidiPitch {
        return MidiPitch.from(SPN.D6, 0);
    }
    static get DD7(): MidiPitch {
        return MidiPitch.from(SPN.DD6, 0);
    }
    static get E7(): MidiPitch {
        return MidiPitch.from(SPN.E6, 0);
    }
    static get F7(): MidiPitch {
        return MidiPitch.from(SPN.F6, 0);
    }
    static get FF7(): MidiPitch {
        return MidiPitch.from(SPN.FF6, 0);
    }
    static get G7(): MidiPitch {
        return MidiPitch.from(SPN.G6, 0);
    }
    static get GG7(): MidiPitch {
        return MidiPitch.from(SPN.GG6, 0);
    }
    static get A7(): MidiPitch {
        return MidiPitch.from(SPN.A6, 0);
    }
    static get AA7(): MidiPitch {
        return MidiPitch.from(SPN.AA6, 0);
    }
    static get B7(): MidiPitch {
        return MidiPitch.from(SPN.B6, 0);
    }
    static get C8(): MidiPitch {
        return MidiPitch.from(SPN.C7, 0);
    }
    static get CC8(): MidiPitch {
        return MidiPitch.from(SPN.CC7, 0);
    }
    static get D8(): MidiPitch {
        return MidiPitch.from(SPN.D7, 0);
    }
    static get DD8(): MidiPitch {
        return MidiPitch.from(SPN.DD7, 0);
    }
    static get E8(): MidiPitch {
        return MidiPitch.from(SPN.E7, 0);
    }
    static get F8(): MidiPitch {
        return MidiPitch.from(SPN.F7, 0);
    }
    static get FF8(): MidiPitch {
        return MidiPitch.from(SPN.FF7, 0);
    }
    static get G8(): MidiPitch {
        return MidiPitch.from(SPN.G7, 0);
    }
    static get GG8(): MidiPitch {
        return MidiPitch.from(SPN.GG7, 0);
    }
    static get A8(): MidiPitch {
        return MidiPitch.from(SPN.A7, 0);
    }
    static get AA8(): MidiPitch {
        return MidiPitch.from(SPN.AA7, 0);
    }
    static get B8(): MidiPitch {
        return MidiPitch.from(SPN.B7, 0);
    }
    static get C9(): MidiPitch {
        return MidiPitch.from(SPN.C8, 0);
    }
    static get CC9(): MidiPitch {
        return MidiPitch.from(SPN.CC8, 0);
    }
    static get D9(): MidiPitch {
        return MidiPitch.from(SPN.D8, 0);
    }
    static get DD9(): MidiPitch {
        return MidiPitch.from(SPN.DD8, 0);
    }
    static get E9(): MidiPitch {
        return MidiPitch.from(SPN.E8, 0);
    }
    static get F9(): MidiPitch {
        return MidiPitch.from(SPN.F8, 0);
    }
    static get FF9(): MidiPitch {
        return MidiPitch.from(SPN.FF8, 0);
    }
    static get G9(): MidiPitch {
        return MidiPitch.from(SPN.G8, 0);
    }
    static get GG9(): MidiPitch {
        return MidiPitch.from(SPN.GG8, 0);
    }
    static get A9(): MidiPitch {
        return MidiPitch.from(SPN.A8, 0);
    }
    static get AA9(): MidiPitch {
        return MidiPitch.from(SPN.AA8, 0);
    }
    static get B9(): MidiPitch {
        return MidiPitch.from(SPN.B8, 0);
    }
    static get C10(): MidiPitch {
        return MidiPitch.from(SPN.C9, 0);
    }
    static get CC10(): MidiPitch {
        return MidiPitch.from(SPN.CC9, 0);
    }
    static get D10(): MidiPitch {
        return MidiPitch.from(SPN.D9, 0);
    }
    static get DD10(): MidiPitch {
        return MidiPitch.from(SPN.DD9, 0);
    }
    static get E10(): MidiPitch {
        return MidiPitch.from(SPN.E9, 0);
    }
    static get F10(): MidiPitch {
        return MidiPitch.from(SPN.F9, 0);
    }
    static get FF10(): MidiPitch {
        return MidiPitch.from(SPN.FF9, 0);
    }
    static get G10(): MidiPitch {
        return MidiPitch.from(SPN.G9, 0);
    }

    static get MAX(): MidiPitch {
        return MidiPitch.G10;
    }
}