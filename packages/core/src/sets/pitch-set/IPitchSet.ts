type ImmutableSet<T> = Omit<Set<T>, "add" | "clear" | "delete"> & {
  hasAny: (...array: T[])=> boolean;
  hasAll: (...array: T[])=> boolean;
  withAdd: (...array: T[])=> ImmutableSet<T>;
  // Cambiado delete por remove para evitar problemas de keywords:
  withRemove: (...array: T[])=> ImmutableSet<T>;
};

export type IPitchSet<T, I> = ImmutableSet<T> & {
  pitches: T[];
  withShift: (interval: I)=> ImmutableSet<T>;
  withShiftDown: (interval: I)=> ImmutableSet<T>;
  set: Readonly<Set<T>>;
};
