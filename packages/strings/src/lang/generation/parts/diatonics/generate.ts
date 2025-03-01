import { DiatonicsInput } from "./Input";

export function diatonicsGenerate(input: DiatonicsInput) {
  return {
    C: input.C,
    D: input.D,
    E: input.E,
    F: input.F,
    G: input.G,
    A: input.A,
    B: input.B,
  };
}
