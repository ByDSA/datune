import { Arrays } from "./Arrays";

test('arrayRemove: item is multiple times', () => {
    let array = [1, 2, 3, 2, 1];
    let item = 1;
    let initialSize = array.length;
    expect(Arrays.removeItem(array, item)).toBe(true);
    expect(array.length).toBe(initialSize - 1);
    expect(array).toStrictEqual([2, 3, 2, 1]);
});


test('arrayRemove: item is one times', () => {
    let array = [1, 2, 3, 4];
    let item = 1;
    let initialSize = array.length;

    expect(Arrays.removeItem(array, item)).toBe(true);
    expect(array.length).toBe(initialSize - 1);
    expect(array).toStrictEqual([2, 3, 4]);
});

test('arrayRemove: item not found', () => {
    let array = [1, 2, 3, 4];
    let item = 5;
    let initialSize = array.length;

    expect(Arrays.removeItem(array, item)).toBe(false);
    expect(array.length).toBe(initialSize);
    expect(array).toStrictEqual([1, 2, 3, 4]);
});

describe("isValidArray", () => {

    it("...[null]", () => {
        const b = Arrays.isDefined([null]);
        expect(b).toBeFalsy();
    });

    it("...[]", () => {
        const b = Arrays.isDefined([]);
        expect(b).toBeFalsy();
    });

    it("[0]", () => {
        const b = Arrays.isDefined([0]);
        expect(b).toBeTruthy();
    });
});

it(`right rotate`, () => {
    const expected = [3, 4, 0, 1, 2];
    const actual = [0, 1, 2, 3, 4];
    Arrays.rotateRight(actual, 2);

    expect(actual).toStrictEqual(expected);
});

it(`left rotate`, () => {
    const expected = [2, 3, 4, 0, 1];
    const actual = [0, 1, 2, 3, 4];
    Arrays.rotateLeft(actual, 2);

    expect(actual).toStrictEqual(expected);
});