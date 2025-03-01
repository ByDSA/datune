import { TemperamentsInput } from "./Input";
import { TemperamentsPart } from "./Part";

export function temperamentsGenerate(basePart: TemperamentsInput): TemperamentsPart {
  return {
    ET12: basePart.ET12,
    LIMIT_5_SYMMETRIC_N1: `${basePart.LIMIT_5_SYMMETRIC}1`,
    LIMIT_5_SYMMETRIC_N2: `${basePart.LIMIT_5_SYMMETRIC}2`,
    PYTHAGOREAN: basePart.PYTHAGOREAN,
  };
}
