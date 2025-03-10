import { StringHashCache } from "@datune/utils";
import { Interval as ChromaticInterval } from "@datune/core/intervals/chromatic";
import { SingleStep } from "./SingleStep";

type HashingObjectType = { index: number;
interval: ChromaticInterval | null; };

export const cache = new StringHashCache<SingleStep, HashingObjectType>( {
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
