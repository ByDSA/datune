import { PrecalcCache } from "@datune/utils";
import { SingleStepArray } from "../single/SingleStep";
import { CompositeStep } from "./CompositeStep";

export type HashingObjectType = SingleStepArray;

export class CompositeStepCache extends PrecalcCache<CompositeStep, HashingObjectType> {
    getHash(hashingObject: HashingObjectType): string {
        return `${hashingObject.map(sm => sm ? sm.toString() : "null" + ",")}`;
    }

    getHashingObject(compoundMotion: CompositeStep): HashingObjectType {
        return compoundMotion.singleSteps;
    }
}