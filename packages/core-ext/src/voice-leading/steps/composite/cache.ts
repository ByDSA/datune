import type { CompositeStepArray } from "./building";
import { KeyMappedFlyweightCache } from "datils/caching";
import { CompositeStep } from "./CompositeStep";

export type Key = CompositeStepArray;

export const cache = new KeyMappedFlyweightCache<CompositeStep, Key, string>( {
  getId(key: Key): string {
    return key.map(
      (interval) => {
        if (interval === undefined)
          return "";

        if (interval === null)
          return "null";

        return interval.toString();
      },
    ).join("|");
  },
  getKey(compositeStep: CompositeStep): Key {
    return compositeStep.array;
  },
  create: (key: Key): CompositeStep => new (CompositeStep as any)(key),
} );
