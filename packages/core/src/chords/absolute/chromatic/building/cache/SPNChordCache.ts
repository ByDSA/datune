import { NonEmptyArray, PrecalcCache } from "@datune/utils";
import { SPN } from "../../../../../pitches";
import { SPNChord } from "../../SPNChord";

export type HashingObjectType = NonEmptyArray<SPN>;

export class SPNChordCache extends PrecalcCache<SPNChord, HashingObjectType> {
    getHash(hashingObject: HashingObjectType): string {
        let ret = "";
        for (const spn of hashingObject)
            ret += spn.toString() + ":";

        return ret;
    }

    getHashingObject(chord: SPNChord): HashingObjectType {
        return chord.notes;
    }
}