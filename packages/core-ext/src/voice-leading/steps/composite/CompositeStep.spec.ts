import type { SpnArray } from "@datune/core/spns/chromatic";
import type { CompositeStepArray } from "./building";
import { Spns as N } from "@datune/core/spns/chromatic";
import { Intervals as I } from "@datune/core";
import { TestInit } from "tests";
import { from as singleStepFrom } from "../single/building";
import * as ST from "../single/constants";
import { SingleStepArray } from "../single/Array";
import { fromIntervals, fromSingleSteps, fromSingleStepsSafe } from "./building";
import * as CompositeSteps from "./constants";

TestInit.loadAll();

it("fromIntervals", () => {
  const array = [0, 1] as const;
  const actual = fromIntervals(...array);

  expect(actual.array).toEqual(array);
} );

describe("fromSingleSteps", ()=> {
  it("normal case", () => {
    const singleSteps = [
      ST.X0_1,
      ST.X1_1,
    ] as SingleStepArray;
    const actual = fromSingleSteps(...singleSteps);

    expect(actual).not.toBeNull();
    expect(actual?.singleSteps).toEqual(singleSteps);
  } );

  it("singleSteps order should not matter", () => {
    const singleSteps1 = [
      ST.X0_1,
      ST.X1_1,
    ] as SingleStepArray;
    const singleSteps2 = [
      ST.X1_1,
      ST.X0_1,
    ] as SingleStepArray;

    expect(singleSteps1).not.toEqual(singleSteps2);

    const actual1 = fromSingleSteps(...singleSteps1);
    const actual2 = fromSingleSteps(...singleSteps2);

    expect(actual1).toBe(actual2);
  } );

  it("duplicated singleSteps", () => {
    const singleSteps = [
      ST.X0_1,
      ST.X0_1,
      ST.X1_1,
    ] as SingleStepArray;
    const actual = fromSingleSteps(...singleSteps);

    expect(actual?.singleSteps).not.toEqual(singleSteps);
    expect(actual?.singleSteps).toEqual(Array.from(new Set(singleSteps)));
  } );

  it("constradiction case should use only the most recent", () => {
    const singleSteps = [
      ST.X0_1,
      ST.X0_S1,
    ] as SingleStepArray;
    const actual = fromSingleSteps(...singleSteps);

    expect(actual.singleSteps).toEqual([ST.X0_S1]);
  } );
} );

describe("fromSingleStepsSafe", ()=> {
  it("normal case", () => {
    const singleSteps = [
      ST.X0_1,
      ST.X1_1,
    ] as SingleStepArray;
    const actual = fromSingleStepsSafe(...singleSteps);

    expect(actual).not.toBeNull();
    expect(actual?.singleSteps).toEqual(singleSteps);
  } );

  it("singleSteps order should not matter", () => {
    const singleSteps1 = [
      ST.X0_1,
      ST.X1_1,
    ] as SingleStepArray;
    const singleSteps2 = [
      ST.X1_1,
      ST.X0_1,
    ] as SingleStepArray;

    expect(singleSteps1).not.toEqual(singleSteps2);

    const actual1 = fromSingleStepsSafe(...singleSteps1);
    const actual2 = fromSingleStepsSafe(...singleSteps2);

    expect(actual1).toBe(actual2);
  } );

  it("duplicated singleSteps", () => {
    const singleSteps = [
      ST.X0_1,
      ST.X0_1,
      ST.X1_1,
    ] as SingleStepArray;
    const actual = fromSingleStepsSafe(...singleSteps);

    expect(actual).not.toBeNull();
    expect(actual?.singleSteps).not.toEqual(singleSteps);
    expect(actual?.singleSteps).toEqual(Array.from(new Set(singleSteps)));
  } );

  it("constradiction case should return null", () => {
    const singleSteps = [
      ST.X0_1,
      ST.X0_S1,
    ] as SingleStepArray;
    const actual = fromSingleStepsSafe(...singleSteps);

    expect(actual).toBeNull();
  } );
} );

describe("cache", ()=>{
  it("with same parameters, should return the same object (should use cache)", () => {
    const actual = fromIntervals(0, 1);
    const expected = fromIntervals(0, 1);

    expect(actual).toBe(expected);
  } );

  it("cache fromIntervals different", () => {
    const actual = fromIntervals(0, 1);
    const notExpected = fromIntervals(0, 2);

    expect(actual).not.toBe(notExpected);
  } );
} );

describe("special values:null vs undefined vs zero", () => {
  it("null is not zero", () => {
    const nullStep = fromIntervals(null, 1);
    const zeroStep = fromIntervals(0, 1);

    expect(nullStep).not.toBe(zeroStep);
  } );

  it("null step should keep", () => {
    const base = fromIntervals(null, 1);
    const { singleSteps } = base;

    expect(singleSteps).toEqual([singleStepFrom(0, null), ST.X1_1]);
  } );

  it("zero step should keep", () => {
    const base = fromIntervals(0, 1);
    const { singleSteps } = base;

    expect(singleSteps).toEqual([singleStepFrom(0, 0), ST.X1_1]);
  } );

  it("undefined step should not keep", () => {
    const base = fromIntervals(undefined, 1);
    const { singleSteps } = base;

    expect(singleSteps).toEqual([ST.X1_1]);
  } );

  it("array with zero, undefined, null and interval", () => {
    const arrayBase: CompositeStepArray = [undefined, I.m2, 0, null];
    const base = fromIntervals(...arrayBase);
    const { array } = base;

    expect(array).toEqual(arrayBase);
  } );
} );

describe("singleSteps", ()=> {
  it("single steps", () => {
    const base = fromIntervals(2, 1);
    const { singleSteps } = base;

    expect(singleSteps).toEqual([ST.X0_2, ST.X1_1]);
  } );

  it("should be the same singleSteps array", () => {
    const base = fromIntervals(2, 1).singleSteps;
    const target = fromIntervals(2, 1).singleSteps;

    expect(target).toEqual(base);
  } );
} );

describe("compositeSteps applied to [F5, B5]", () => {
  const { A5, AA5, B5, C6, CC6, DD5, E5, F5, FF5, G5 } = N;

  describe.each([
    [CompositeSteps.KEEP_U1, F5, C6],
    [CompositeSteps.KEEP_U2, F5, CC6],
    [CompositeSteps.KEEP_D1, F5, AA5],
    [CompositeSteps.KEEP_D2, F5, A5],
    [CompositeSteps.KEEP_NULL, F5, null],
    [CompositeSteps.U1_KEEP, FF5, B5],
    [CompositeSteps.U1_U1, FF5, C6],
    [CompositeSteps.U1_U2, FF5, CC6],
    [CompositeSteps.U1_D1, FF5, AA5],
    [CompositeSteps.U1_D2, FF5, A5],
    [CompositeSteps.U1_NULL, FF5, null],
    [CompositeSteps.U2_KEEP, G5, B5],
    [CompositeSteps.U2_U1, G5, C6],
    [CompositeSteps.U2_U2, G5, CC6],
    [CompositeSteps.U2_D1, G5, AA5],
    [CompositeSteps.U2_D2, G5, A5],
    [CompositeSteps.U2_NULL, G5, null],
    [CompositeSteps.D1_KEEP, E5, B5],
    [CompositeSteps.D1_U1, E5, C6],
    [CompositeSteps.D1_U2, E5, CC6],
    [CompositeSteps.D1_D1, E5, AA5],
    [CompositeSteps.D1_D2, E5, A5],
    [CompositeSteps.D1_NULL, E5, null],
    [CompositeSteps.D2_KEEP, DD5, B5],
    [CompositeSteps.D2_U1, DD5, C6],
    [CompositeSteps.D2_U2, DD5, CC6],
    [CompositeSteps.D2_D1, DD5, AA5],
    [CompositeSteps.D2_D2, DD5, A5],
    [CompositeSteps.D2_NULL, DD5, null],
    [CompositeSteps.NULL_KEEP, null, B5],
    [CompositeSteps.NULL_U1, null, C6],
    [CompositeSteps.NULL_U2, null, CC6],
    [CompositeSteps.NULL_D1, null, AA5],
    [CompositeSteps.NULL_D2, null, A5],
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
