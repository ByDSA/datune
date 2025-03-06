import { Pitches as P } from "pitches/chromatic";
import { ALL, ALL_NON_INVERSIONS, C, initialize } from ".";

it("before initialization, constant should be uninitialized", () => {
  expect(C).toBeUndefined();
} );

it("should call initialize without errors", () => {
  expect(() => initialize()).not.toThrow();
} );

it("should not initialize twice", () => {
  expect(() => initialize()).toThrow();
} );

it("after initialization, constant should be initialized", () => {
  expect(C).toBeDefined();
} );

it("trying edit property notes", () => {
  const { pitches } = C;
  const t = () => {
    pitches[0] = P.D;
  };

  expect(t).toThrow(Error);
} );

it("all", () => {
  expect(ALL).toHaveLength(3468);
} );

it("all non inversions", () => {
  expect(ALL_NON_INVERSIONS).toHaveLength(660);
} );
