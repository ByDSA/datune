import { from } from "./building";

it("cache", () => {
  const actual = from(0, 1);
  const expected = from(0, 1);

  expect(actual).toBe(expected);
} );

it("try to change private variables: index", () => {
  const t = () => {
    (<any>from(0, 1)).index = 1;
  };

  expect(t).toThrow(TypeError);
} );

it("try to change private variables: interval", () => {
  const t = () => {
    (<any>from(0, 1)).interval = 1;
  };

  expect(t).toThrow(TypeError);
} );
