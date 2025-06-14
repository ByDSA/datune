import { ImmutableSet } from "sets/ImmutableSet";

export type IPitchSet<T, I> = Omit<ImmutableSet<T>, "withAdded" | "withRemoved"> & {
  pitches: T[];

  withShifted: (interval: I)=> IPitchSet<T, I>;
  withShiftedDown: (interval: I)=> IPitchSet<T, I>;

  // Overload:
  withAdded: (...pitches: T[])=> IPitchSet<T, I>;
  withRemoved: (...pitches: T[])=> IPitchSet<T, I>;
};
