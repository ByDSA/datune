import { PrecalcCache } from "@datune/utils";
import { ChromaticInterval } from "../../ChromaticInterval";


export type HashingObject = number;

export class ChromaticIntervalCache extends PrecalcCache<ChromaticInterval, HashingObject> {
    getHash(num: HashingObject): string {
        return num.toString();
    }

    getHashingObject(chromaticInterval: ChromaticInterval): HashingObject {
        return chromaticInterval.valueOf();
    }
}