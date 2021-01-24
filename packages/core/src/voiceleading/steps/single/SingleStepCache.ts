import { PrecalcCache } from "@datune/utils";
import { ChromaticInterval } from "../../../intervals";
import { SingleStep } from "./SingleStep";

export type HashingObjectType = { index: number, interval: ChromaticInterval | null };

export class SingleStepCache extends PrecalcCache<SingleStep, HashingObjectType> {
    getHash(hashingObject: HashingObjectType): string {
        return `${hashingObject.index}:${hashingObject.interval}`;
    }

    getHashingObject(singleMotion: SingleStep): HashingObjectType {
        return { index: singleMotion.index, interval: singleMotion.interval };
    }
}