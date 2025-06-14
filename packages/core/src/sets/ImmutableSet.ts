export type ImmutableSet<T> = {
  readonly size: number;

  has(value: T): boolean;
  hasAny: (...array: T[])=> boolean;
  hasAll: (...array: T[])=> boolean;
  withAdded: (...array: T[])=> ImmutableSet<T>;
  // Cambiado delete por remove para evitar problemas de keywords:
  withRemoved: (...array: T[])=> ImmutableSet<T>;
};
