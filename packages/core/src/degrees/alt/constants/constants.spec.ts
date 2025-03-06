import { bVII, initialize } from ".";

it("before initialization, constant should be uninitialized", () => {
  expect(bVII).toBeUndefined();
} );

it("should call initialize without errors", () => {
  expect(() => initialize()).not.toThrow();
} );

it("should not initialize twice", () => {
  expect(() => initialize()).toThrow();
} );

it("after initialization, constant should be initialized", () => {
  expect(bVII).toBeDefined();
} );
