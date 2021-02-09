import { PrecalcCache } from '@datune/utils';
import { AbsolutePitchAny } from '../../../../symbolic/absolute/AbsolutePitch';
import { SPN } from '../../../../symbolic/absolute/spn/SPN';
import { SPNAlt } from '../../../../symbolic/absolute/spnalt/SPNAlt';
import { ConcertPitch } from '../../ConcertPitch';

export type HashingObject = { frequency: number, absPitch: AbsolutePitchAny };
export class ConcertPitchCache extends PrecalcCache<ConcertPitch, HashingObject>{
    getHash(hashingObject: HashingObject): string {
        let absPitchHashCode: any = hashCode(hashingObject.absPitch);

        return absPitchHashCode + ":" + hashingObject.frequency;
    }

    getHashingObject(concertPitch: ConcertPitch): HashingObject {
        return { frequency: concertPitch.frequency, absPitch: concertPitch.absPitch };
    }
}

function spnHashCode(spn: SPN): string {
    return "c" + spn.valueOf();
}

function spnAltHashCode(spn: SPNAlt): string {
    let ret = spn.degree.note.toString() + ":" + spn.octave;
    return "d" + ret;
}

function hashCode(spn: AbsolutePitchAny): string {
    if (spn instanceof SPN)
        return spnHashCode(spn);
    else if (spn instanceof SPNAlt)
        return spnAltHashCode(spn);
    else
        throw new Error();
}