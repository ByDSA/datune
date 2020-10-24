import { PrecalcCache } from '@datune/utils/PrecalcCache';
import { MidiPitch } from './MidiPitch';
import { SPN } from '@datune/core/pitches/symbolic/SPN';

export type HashingObject = { spn: SPN, detuned: number };
export class MidiPitchCache extends PrecalcCache<MidiPitch, HashingObject>{
    getHash(hashingObject: HashingObject): string {
        return hashingObject.spn.valueOf() + "-" + hashingObject.detuned;
    }

    getHashingObject(midiNote: MidiPitch): HashingObject {
        return { spn: midiNote.spn, detuned: midiNote.cents };
    }
}