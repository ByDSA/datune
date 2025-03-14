import type { Interval } from "@datune/core/intervals/chromatic";
import { StringHashCache } from "@datune/utils";
import { SingleStep } from "./SingleStep";

type Dto = {
  index: number;
  interval: Interval | null;
};

export const cache = new StringHashCache<SingleStep, Dto>( {
  hash(dto: Dto): string {
    return `${dto.index}:${dto.interval}`;
  },
  toDto(sst: SingleStep): Dto {
    return {
      index: sst.index,
      interval: sst.interval,
    };
  },
  create(dto: Dto): SingleStep {
    return (SingleStep as any).create(dto.index, dto.interval);
  },
} );
