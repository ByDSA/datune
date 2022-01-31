import { StringHashCache } from "@datune/utils";
import { Interval as ChromaticInterval } from "intervals/chromatic";
import SingleStep from "./SingleStep";

type HashingObjectType = { index: number; interval: ChromaticInterval | null };

const cache = new StringHashCache<SingleStep, HashingObjectType>( {
  hash(hashingObject: HashingObjectType): string {
    return `${hashingObject.index}:${hashingObject.interval}`;
  },
  toDto(singleMotion: SingleStep): HashingObjectType {
    return {
      index: singleMotion.index,
      interval: singleMotion.interval,
    };
  },
  create(hashingObject: HashingObjectType): SingleStep {
    return (SingleStep as any).create(hashingObject.index, hashingObject.interval);
  },
} );

export default cache;
