import type { Scale } from "@datune/core/scales/Scale";
import { SetComparator } from "datils/datatypes/sets";

type Result<D> = {
  common: Set<D>;
  different: Set<D>;
};

export function compare<D, I, S extends Scale<I, D>>(...scales: S[]): Result<D> {
  const sets = scales.map((scale) => {
    const set = new Set<D>();

    for (const value of scale.degrees)
      set.add(value);

    return set;
  } );
  const comaprator = new SetComparator(sets);

  comaprator.compare();

  return {
    common: comaprator.getCommon(),
    different: comaprator.getDifferent(),
  };
}
