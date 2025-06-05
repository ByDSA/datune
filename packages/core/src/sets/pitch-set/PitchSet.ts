type ImmutableSet<T> = Omit<Set<T>, "add" | "clear" | "delete"> & {
  hasAny: (...array: T[])=> boolean;
  hasAll: (...array: T[])=> boolean;
  withAdded: (...array: T[])=> ImmutableSet<T>;
  // Cambiado delete por remove para evitar problemas de keywords:
  withRemoved: (...array: T[])=> ImmutableSet<T>;
};

export type PitchSet<T, I> = Omit<ImmutableSet<T>, "withAdded" | "withRemoved"> & {
  pitches: T[];
  withShifted: (interval: I)=> PitchSet<T, I>;
  withShiftedDown: (interval: I)=> PitchSet<T, I>;
  set: Readonly<Set<T>>;
  // Overload:
  withAdded: (...pitches: T[])=> PitchSet<T, I>;
  withRemoved: (...pitches: T[])=> PitchSet<T, I>;
};
