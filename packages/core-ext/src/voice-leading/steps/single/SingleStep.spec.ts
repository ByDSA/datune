import { Intervals as I, Spns as N } from "@datune/core";
import { singleStepFrom } from "./building";
import { SS_0_1, SS_2_1 } from "./constants";
import { singleStepReIndex, singleStepReInterval } from "./modifiers";

describe("cache", () =>{
  it("should be the same instance", () => {
    const actual = singleStepFrom(0, 1);
    const expected = singleStepFrom(0, 1);

    expect(actual).toBe(expected);
  } );

  it("should not be the same instance", () => {
    const actual = singleStepFrom(0, 1);
    const expected = singleStepFrom(0, 2);

    expect(actual).not.toBe(expected);
  } );
} );

it("null is not 0", () => {
  const nullStep = singleStepFrom(0, null);
  const zeroStep = singleStepFrom(0, 0);

  expect(nullStep).not.toBe(zeroStep);
} );

it("null", () => {
  const nullStep = singleStepFrom(0, null);

  expect(nullStep.index).toBe(0);
  expect(nullStep.interval).toBeNull();
} );

it("zero", () => {
  const nullStep = singleStepFrom(0, 0);

  expect(nullStep.index).toBe(0);
  expect(nullStep.interval).toBe(0);
} );

describe("immutability", ()=> {
  it("index", () => {
    const t = () => {
      singleStepFrom(0, 1).index = 1;
    };

    expect(t).toThrow(Error);
  } );

  it("interval", () => {
    const t = () => {
      singleStepFrom(0, 1).interval = 1;
    };

    expect(t).toThrow(Error);
  } );
} );

describe("applyTo", () => {
  it("i0_1", () => {
    const spnArray = [N.C5, N.E5, N.G5];
    const expected = [N.CC5, N.E5, N.G5];

    SS_0_1.applyTo(spnArray);

    expect(spnArray).toEqual(expected);
  } );

  it("index exceeded array length should do nothing", () => {
    const spnArray = [N.C5, N.E5];
    const expected = [N.C5, N.E5];

    SS_2_1.applyTo(spnArray);

    expect(spnArray).toEqual(expected);
  } );

  it("null interval should make null the note", () => {
    const spnArray = [N.C4, N.E4, N.G4];
    const expected = [N.C4, null, N.G4];

    singleStepFrom(1, null).applyTo(spnArray);

    expect(spnArray).toEqual(expected);
  } );
} );

describe("modifiers", () => {
  it("reIndex", () => {
    const spnArray = [N.C5, N.E5];
    const expected = [N.CC5, N.E5];

    singleStepReIndex(SS_2_1, 0).applyTo(spnArray);

    expect(spnArray).toEqual(expected);
  } );

  it("reInterval", () => {
    const spnArray = [N.C5, N.E5];
    const expected = [N.G5, N.E5];

    singleStepReInterval(SS_0_1, I.P5).applyTo(spnArray);

    expect(spnArray).toEqual(expected);
  } );
} );
