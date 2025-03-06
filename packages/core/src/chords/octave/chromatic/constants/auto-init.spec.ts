import { Chords } from "..";
import { C } from "./";

let constant: unknown;

it("constant should be initialized if it's accessed from barrel", () => {
  expect(Chords.C).toBeDefined();

  constant = Chords.C;
} );

it("constant initialization should be called once", () => {
  expect(()=>Chords.C).not.toThrow();

  expect(Chords.C).toBe(constant);
} );

it("constant should be defined in direct access after auto initialization", () => {
  expect(C).toBeDefined();
} );
