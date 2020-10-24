import { arrayRemove } from "./Utils";

test('arrayRemove: item is multiple times', () => {
  let array = [1, 2, 3, 2, 1];
  let item = 1;
  let initialSize = array.length;

  expect(arrayRemove(array, item)).toBe(true);
  expect(array.length).toBe(initialSize - 1);
  expect(array).toStrictEqual([2, 3, 2, 1]);
});

test('arrayRemove: item is one times', () => {
  let array = [1, 2, 3, 4];
  let item = 1;
  let initialSize = array.length;

  expect(arrayRemove(array, item)).toBe(true);
  expect(array.length).toBe(initialSize - 1);
  expect(array).toStrictEqual([2, 3, 4]);
});

test('arrayRemove: item not found', () => {
  let array = [1, 2, 3, 4];
  let item = 5;
  let initialSize = array.length;

  expect(arrayRemove(array, item)).toBe(false);
  expect(array.length).toBe(initialSize);
  expect(array).toStrictEqual([1, 2, 3, 4]);
});