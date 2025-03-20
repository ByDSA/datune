import type { SpnArray } from "@datune/core/spns/chromatic";
import type { CompositeStepArray } from "./building";
import { Spns as N } from "@datune/core/spns/chromatic";
import { Intervals as I } from "@datune/core";
import { TestInit } from "tests";
import { singleStepFrom } from "../single/building";
import * as SS from "../single/constants";
import { SingleStepArray } from "../single/Array";
import { compositeStepFromIntervals, compositeStepFromSingleSteps, fromSingleStepsSafe } from "./building";
import * as CS from "./constants";

TestInit.loadAll();

it("fromIntervals", () => {
  const array = [0, 1] as const;
  const actual = compositeStepFromIntervals(...array);

  expect(actual.array).toEqual(array);
} );

describe("fromSingleSteps", ()=> {
  it("normal case", () => {
    const singleSteps = [
      SS.SS_0_1,
      SS.SS_1_1,
    ] as SingleStepArray;
    const actual = compositeStepFromSingleSteps(...singleSteps);

    expect(actual).not.toBeNull();
    expect(actual?.singleSteps).toEqual(singleSteps);
  } );

  it("singleSteps order should not matter", () => {
    const singleSteps1 = [
      SS.SS_0_1,
      SS.SS_1_1,
    ] as SingleStepArray;
    const singleSteps2 = [
      SS.SS_1_1,
      SS.SS_0_1,
    ] as SingleStepArray;

    expect(singleSteps1).not.toEqual(singleSteps2);

    const actual1 = compositeStepFromSingleSteps(...singleSteps1);
    const actual2 = compositeStepFromSingleSteps(...singleSteps2);

    expect(actual1).toBe(actual2);
  } );

  it("duplicated singleSteps", () => {
    const singleSteps = [
      SS.SS_0_1,
      SS.SS_0_1,
      SS.SS_1_1,
    ] as SingleStepArray;
    const actual = compositeStepFromSingleSteps(...singleSteps);

    expect(actual?.singleSteps).not.toEqual(singleSteps);
    expect(actual?.singleSteps).toEqual(Array.from(new Set(singleSteps)));
  } );

  it("constradiction case should use only the most recent", () => {
    const singleSteps = [
      SS.SS_0_1,
      SS.SS_0_S1,
    ] as SingleStepArray;
    const actual = compositeStepFromSingleSteps(...singleSteps);

    expect(actual.singleSteps).toEqual([SS.SS_0_S1]);
  } );
} );

describe("fromSingleStepsSafe", ()=> {
  it("normal case", () => {
    const singleSteps = [
      SS.SS_0_1,
      SS.SS_1_1,
    ] as SingleStepArray;
    const actual = fromSingleStepsSafe(...singleSteps);

    expect(actual).not.toBeNull();
    expect(actual?.singleSteps).toEqual(singleSteps);
  } );

  it("singleSteps order should not matter", () => {
    const singleSteps1 = [
      SS.SS_0_1,
      SS.SS_1_1,
    ] as SingleStepArray;
    const singleSteps2 = [
      SS.SS_1_1,
      SS.SS_0_1,
    ] as SingleStepArray;

    expect(singleSteps1).not.toEqual(singleSteps2);

    const actual1 = fromSingleStepsSafe(...singleSteps1);
    const actual2 = fromSingleStepsSafe(...singleSteps2);

    expect(actual1).toBe(actual2);
  } );

  it("duplicated singleSteps", () => {
    const singleSteps = [
      SS.SS_0_1,
      SS.SS_0_1,
      SS.SS_1_1,
    ] as SingleStepArray;
    const actual = fromSingleStepsSafe(...singleSteps);

    expect(actual).not.toBeNull();
    expect(actual?.singleSteps).not.toEqual(singleSteps);
    expect(actual?.singleSteps).toEqual(Array.from(new Set(singleSteps)));
  } );

  it("constradiction case should return null", () => {
    const singleSteps = [
      SS.SS_0_1,
      SS.SS_0_S1,
    ] as SingleStepArray;
    const actual = fromSingleStepsSafe(...singleSteps);

    expect(actual).toBeNull();
  } );
} );

describe("cache", ()=>{
  it("with same parameters, should return the same object (should use cache)", () => {
    const actual = compositeStepFromIntervals(0, 1);
    const expected = compositeStepFromIntervals(0, 1);

    expect(actual).toBe(expected);
  } );

  it("cache fromIntervals different", () => {
    const actual = compositeStepFromIntervals(0, 1);
    const notExpected = compositeStepFromIntervals(0, 2);

    expect(actual).not.toBe(notExpected);
  } );
} );

describe("special values:null vs undefined vs zero", () => {
  it("null is not zero", () => {
    const nullStep = compositeStepFromIntervals(null, 1);
    const zeroStep = compositeStepFromIntervals(0, 1);

    expect(nullStep).not.toBe(zeroStep);
  } );

  it("null step should keep", () => {
    const base = compositeStepFromIntervals(null, 1);
    const { singleSteps } = base;

    expect(singleSteps).toEqual([singleStepFrom(0, null), SS.SS_1_1]);
  } );

  it("zero step should keep", () => {
    const base = compositeStepFromIntervals(0, 1);
    const { singleSteps } = base;

    expect(singleSteps).toEqual([singleStepFrom(0, 0), SS.SS_1_1]);
  } );

  it("undefined step should not keep", () => {
    const base = compositeStepFromIntervals(undefined, 1);
    const { singleSteps } = base;

    expect(singleSteps).toEqual([SS.SS_1_1]);
  } );

  it("array with zero, undefined, null and interval", () => {
    const arrayBase: CompositeStepArray = [undefined, I.m2, 0, null];
    const base = compositeStepFromIntervals(...arrayBase);
    const { array } = base;

    expect(array).toEqual(arrayBase);
  } );
} );

describe("singleSteps", ()=> {
  it("single steps", () => {
    const base = compositeStepFromIntervals(2, 1);
    const { singleSteps } = base;

    expect(singleSteps).toEqual([SS.SS_0_2, SS.SS_1_1]);
  } );

  it("should be the same singleSteps array", () => {
    const base = compositeStepFromIntervals(2, 1).singleSteps;
    const target = compositeStepFromIntervals(2, 1).singleSteps;

    expect(target).toEqual(base);
  } );
} );

describe("compositeSteps applied to [F5, B5]", () => {
  const { A5, AA5, B5, C6, CC6, DD5, E5, F5, FF5, G5 } = N;

  describe.each([
    [CS.CS_KEEP_U1, F5, C6],
    [CS.CS_KEEP_U2, F5, CC6],
    [CS.CS_KEEP_D1, F5, AA5],
    [CS.CS_KEEP_D2, F5, A5],
    [CS.CS_KEEP_NULL, F5, null],
    [CS.CS_U1_KEEP, FF5, B5],
    [CS.CS_U1_U1, FF5, C6],
    [CS.CS_U1_U2, FF5, CC6],
    [CS.CS_U1_D1, FF5, AA5],
    [CS.CS_U1_D2, FF5, A5],
    [CS.CS_U1_NULL, FF5, null],
    [CS.CS_U2_KEEP, G5, B5],
    [CS.CS_U2_U1, G5, C6],
    [CS.CS_U2_U2, G5, CC6],
    [CS.CS_U2_D1, G5, AA5],
    [CS.CS_U2_D2, G5, A5],
    [CS.CS_U2_NULL, G5, null],
    [CS.CS_D1_KEEP, E5, B5],
    [CS.CS_D1_U1, E5, C6],
    [CS.CS_D1_U2, E5, CC6],
    [CS.CS_D1_D1, E5, AA5],
    [CS.CS_D1_D2, E5, A5],
    [CS.CS_D1_NULL, E5, null],
    [CS.CS_D2_KEEP, DD5, B5],
    [CS.CS_D2_U1, DD5, C6],
    [CS.CS_D2_U2, DD5, CC6],
    [CS.CS_D2_D1, DD5, AA5],
    [CS.CS_D2_D2, DD5, A5],
    [CS.CS_D2_NULL, DD5, null],
    [CS.CS_NULL_KEEP, null, B5],
    [CS.CS_NULL_U1, null, C6],
    [CS.CS_NULL_U2, null, CC6],
    [CS.CS_NULL_D1, null, AA5],
    [CS.CS_NULL_D2, null, A5],
  ])("intervals work fine", (compositeStep, expectedBottom, expectedTop) => {
    const source: SpnArray = [F5, B5];

    it(`[${source.join(",")}] compositeStep=[${compositeStep.toString()}] => [${expectedBottom} ${expectedTop}]`, () => {
      const actual = [...source];

      compositeStep.applyTo(actual);
      const expected = [
        expectedBottom,
        expectedTop,
      ];

      expect(actual).toStrictEqual(expected);
    } );
  } );
} );
