import * as Constants from "./constants";
import { BPMs } from ".";
import { TestInit } from "tests";

TestInit.bpm();

it("should constants be defined", () => {
  expect(BPMs.QUARTER_120).toBeDefined();
} );

it("should constante be same ref", () => {
  expect(Constants.QUARTER_120).toBe(BPMs.QUARTER_120);
} );

it("should functions be defined", () => {
  expect(BPMs.from).toBeDefined();
} );
