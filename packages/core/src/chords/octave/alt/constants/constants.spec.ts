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
