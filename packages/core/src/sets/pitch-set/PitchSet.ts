type ImmutableSet<T> = Omit<Set<T>, "add" | "clear" | "delete"> & {
  hasAny: (...array: T[])=> boolean;
  hasAll: (...array: T[])=> boolean;
  withAdd: (...array: T[])=> ImmutableSet<T>;
  // Cambiado delete por remove para evitar problemas de keywords:
  withRemove: (...array: T[])=> ImmutableSet<T>;
};

export type PitchSet<T, I> = Omit<ImmutableSet<T>, "withAdd" | "withRemove"> & {
  pitches: T[];
  withShift: (interval: I)=> PitchSet<T, I>;
  withShiftDown: (interval: I)=> PitchSet<T, I>;
  set: Readonly<Set<T>>;
  // Overload:
  withAdd: (...pitches: T[])=> PitchSet<T, I>;
  withRemove: (...pitches: T[])=> PitchSet<T, I>;
};
