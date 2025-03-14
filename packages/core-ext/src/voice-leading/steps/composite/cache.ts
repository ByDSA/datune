import type { CompositeArray } from "./building";
import { StringHashCache } from "@datune/utils";
import { CompositeStep } from "./CompositeStep";

export type Dto = CompositeArray;

export const cache = new StringHashCache<CompositeStep, Dto>( {
  hash(dto: Dto): string {
    return dto.map(
      (interval) => {
        if (interval === undefined)
          return "";

        if (interval === null)
          return "null";

        return interval.toString();
      },
    ).join("|");
  },
  toDto(obj: CompositeStep): Dto {
    return obj.array;
  },
  create: (dto: Dto): CompositeStep => new (CompositeStep as any)(dto),
} );
