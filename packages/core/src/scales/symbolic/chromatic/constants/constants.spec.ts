/* eslint-disable camelcase */
import { Scales as S } from "..";

// eslint-disable-next-line @typescript-eslint/naming-convention
const { BLUES_a4, COMMON, MAJOR, MINOR, MIXOLYDIAN } = S;

describe("sets", () => {
  describe.each([...COMMON])("tests", (scale) => {
    describe("Scale: " + String(scale), () => {
      it("defined", () => {
        expect(scale).toBeDefined();
      } );

      it("has string", () => {
        const actual = String(scale);

        expect(actual).toBeDefined();
      } );

      it("degrees defined", () => {
        expect(scale.degrees).toBeDefined();
      } );
    } );
  } );

  it(`set all: contains ${BLUES_a4}`, () => {
    expect(COMMON.has(BLUES_a4)).toBeTruthy();
  } );
} );

describe.each([
  [MAJOR, [0, 2, 4, 5, 7, 9, 11]],
  [MINOR, [0, 2, 3, 5, 7, 8, 10]],
  [MIXOLYDIAN, [0, 2, 4, 5, 7, 9, 10]],
])("degrees", (scale, expectedDegrees) => {
  it(`${String(scale)} => ${expectedDegrees}`, () => {
    const { degrees } = scale;

    expect(degrees).toStrictEqual(expectedDegrees);
  } );
} );
