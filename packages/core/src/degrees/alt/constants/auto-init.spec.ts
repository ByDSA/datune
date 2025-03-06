import { Degrees as D } from "..";
import { I } from "./";

let constant: unknown;

it("constant should be initialized if it's accessed from barrel", () => {
  expect(D.I).toBeDefined();

  constant = D.I;
} );

it("constant initialization should be called once", () => {
  expect(()=>D.I).not.toThrow();

  expect(D.I).toBe(constant);
} );

it("constant should be defined in direct access after auto initialization", () => {
  expect(I).toBeDefined();
} );
