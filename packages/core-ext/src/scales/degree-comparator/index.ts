import { SetComparator } from "@datune/utils";
import Scale from "scales/Scale";

type Result<D> = {
  common: Set<D>;
  different: Set<D>;
};

export default function compare<D, I, S extends Scale<I, D>>(...scales: S[]): Result<D> {
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
