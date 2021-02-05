import { TonalApproach } from "@datune/analyzer";
import { Chord, Key, MusicalDuration, Scale } from "@datune/core";
import { Func, HarmonicFunction } from "@datune/core/tonalities";
import { random } from "@datune/utils";
import { GenSeq } from "./GenSeq";

export class GenChordSeq extends GenSeq {
    constructor(tonalApporach: TonalApproach) {
        super(tonalApporach);
    }

    generate() {
        const tonalApproach = this.tonalApporach;
        for (let time = MusicalDuration.ZERO, toTime = time; time < tonalApproach.keySequence.duration; time = toTime) {
            const keyNode = tonalApproach.keySequence.getNodeAt(time);
            const key: Key = <Key>keyNode?.event;

            const fNode = tonalApproach.funcSequence.getNodeAt(time);
            if (!fNode)
                throw new Error(time + " " + tonalApproach.funcSequence.duration);
            const func: HarmonicFunction = fNode.event;

            toTime = fNode.to;

            const chord = func.getChord(key);
            tonalApproach.chordSequence.addEvent(chord,
                time,
                toTime);

            const keyChord = this._pickKeyChord(key, func, chord);
            tonalApproach.keyChordSequence.addEvent(keyChord,
                time,
                toTime);
        }
    }

    private _pickKeyChord(originalKey: Key, f: HarmonicFunction, chord: Chord): Key {
        const root = f.getChord(originalKey).notes[0];
        let available: Key[] = [];

        switch (f) {
            case Func.I:
            case Func.bIII:
                available.push(Key.from(root, Scale.MAJOR));
                break;
            case Func.ii:
            case Func.iv:
                available.push(Key.from(root, Scale.DORIAN));
                break;
            case Func.iii:
            case Func.iv:
                available.push(Key.from(root, Scale.PHRYGIAN));
                break;
            case Func.IV:
            case Func.bVI:
                available.push(Key.from(root, Scale.LYDIAN));
                break;
            case Func.V:
            case Func.bVII:
            case Func.V7:
                available.push(Key.from(root, Scale.MIXOLYDIAN));
                break;
            case Func.vi:
            case Func.i:
                available.push(Key.from(root, Scale.MINOR));
                break;
            case Func.VII0:
            case Func.II0:
                available.push(Key.from(root, Scale.LOCRIAN));
                break;
        }
        // let chord = f.getChord(originalKey);
        // switch (chord.pattern) {
        //     case Pattern.TRIAD_MAJOR:
        //         available.push(
        //             Key.from(root, Scale.MAJOR),
        //             Key.from(root, Scale.LYDIAN),
        //             Key.from(root, Scale.MIXOLYDIAN),
        //         );
        //         break;
        //     case Pattern.SEVENTH_MAJ7:
        //         available.push(
        //             Key.from(root, Scale.MAJOR),
        //             Key.from(root, Scale.LYDIAN)
        //         );
        //         break;
        //     case Pattern.TRIAD_MINOR:
        //         available.push(
        //             Key.from(root, Scale.MINOR),
        //             Key.from(root, Scale.DORIAN),
        //             Key.from(root, Scale.PHRYGIAN)
        //         );
        //         break;
        //     case Pattern.SEVENTH_MINOR:
        //         available.push(
        //             Key.from(root, Scale.MINOR),
        //             Key.from(root, Scale.DORIAN),
        //             Key.from(root, Scale.PHRYGIAN)
        //         );
        //         break;
        //     case Pattern.TRIAD_DIMINISHED:
        //     case Pattern.SEVENTH_b5:
        //         return Key.from(root, Scale.LOCRIAN);
        // }

        if (available.length == 0)
            return originalKey;
        return available[random(available.length)];
    }
}