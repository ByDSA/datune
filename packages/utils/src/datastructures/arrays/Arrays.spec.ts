import { Arrays } from "../../index";

describe("isValidArray", () => {
  it("...[null]", () => {
    const b = Arrays.isDefined([null]);

    expect(b).toBeFalsy();
  } );

  it("...[]", () => {
    const b = Arrays.isDefined([]);

    expect(b).toBeFalsy();
  } );

  it("[0]", () => {
    const b = Arrays.isDefined([0]);

    expect(b).toBeTruthy();
  } );
} );

describe("hasSameContent", () => {
  it("Different array reference", () => {
    const expected = [1, 2, 3, 4];
    const actual = [1, 2, 3, 4];
    const b = Arrays.hasSameContent(actual, expected);

    expect(b).toBeTruthy();
  } );

  it("Same array reference", () => {
    const expected = [1, 2, 3, 4];
    const actual = expected;
    const b = Arrays.hasSameContent(actual, expected);

    expect(b).toBeTruthy();
  } );

  it("Different length", () => {
    const array1 = [1, 2, 3, 4];
    const array2 = [1, 2, 3];
    const b = Arrays.hasSameContent(array1, array2);

    expect(b).toBeFalsy();
  } );

  it("Different content", () => {
    const array1 = [1, 2, 3, 4];
    const array2 = [1, 2, 3, 5];
    const b = Arrays.hasSameContent(array1, array2);

    expect(b).toBeFalsy();
  } );
} );
