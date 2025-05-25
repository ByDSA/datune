import { Pitches as P } from "alt";
import { C7, initialize } from "./constants";

it("before initialization, constant should be uninitialized", () => {
  expect(C7).toBeUndefined();
} );

it("should call initialize without errors", () => {
  expect(() => initialize()).not.toThrow();
} );

it("should not initialize twice", () => {
  expect(() => initialize()).toThrow();
} );

it("after initialization, constant should be initialized", () => {
  expect(C7).toBeDefined();
} );

it("trying edit property notes", () => {
  const { pitches } = C7;
  const t = () => {
    (pitches as any)[0] = P.D;
  };

  expect(t).toThrow(Error);
} );
