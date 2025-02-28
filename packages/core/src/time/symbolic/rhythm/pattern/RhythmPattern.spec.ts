import { from, fromArray } from "./building";
import { rotate } from "./modifiers";

it("iterator", () => {
  const rhythm = fromArray(1, 0, 0, 0);
  const { array } = rhythm;

  expect(array[0]).toBe(1);
  expect(array[1]).toBe(0);
  expect(array[2]).toBe(0);
  expect(array[3]).toBe(0);
} );

it("fromInt", () => {
  const rhythm = fromArray(1, 0, 0, 0);
  const { array } = rhythm;

  expect(array[0]).toBe(1);
  expect(array[1]).toBe(0);
  expect(array[2]).toBe(0);
  expect(array[3]).toBe(0);
} );

it("get_exceed", () => {
  const rhythm = fromArray(1, 0, 0, 0);
  const { array } = rhythm;

  expect(array[4]).toBeUndefined();
} );

it("from content", () => {
  const rhythm = from(2, 2, 2, 3);
  const { array } = rhythm;

  expect(array[0]).toBe(1);
  expect(array[1]).toBe(0);
  expect(array[2]).toBe(1);
  expect(array[3]).toBe(0);
  expect(array[4]).toBe(1);
  expect(array[5]).toBe(0);
  expect(array[6]).toBe(1);
  expect(array[7]).toBe(0);
  expect(array[8]).toBe(0);
} );

it("fromPattern size", () => {
  const rhythm = from(2, 2, 2, 3);

  expect(rhythm.array).toHaveLength(9);
} );

it("getRotation", () => {
  const rhythm = from(2, 2, 2, 3);
  const rotatedRhythm = rotate(rhythm, 1);

  expect(rotatedRhythm.values).toEqual([3, 2, 2, 2]);
} );
