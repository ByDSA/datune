import { Arrays } from "../../index";

describe("remove", () => {
  test("item is multiple times", () => {
    const array = [1, 2, 3, 2, 1];
    const item = 1;
    const initialSize = array.length;

    expect(Arrays.removeItem(array, item)).toBe(true);
    expect(array.length).toBe(initialSize - 1);
    expect(array).toStrictEqual([2, 3, 2, 1]);
  } );

  test("item is one time", () => {
    const array = [1, 2, 3, 4];
    const item = 1;
    const initialSize = array.length;

    expect(Arrays.removeItem(array, item)).toBe(true);
    expect(array.length).toBe(initialSize - 1);
    expect(array).toStrictEqual([2, 3, 4]);
  } );

  test("item not found", () => {
    const array = [1, 2, 3, 4];
    const item = 5;
    const initialSize = array.length;

    expect(Arrays.removeItem(array, item)).toBe(false);
    expect(array.length).toBe(initialSize);
    expect(array).toStrictEqual([1, 2, 3, 4]);
  } );
} );
