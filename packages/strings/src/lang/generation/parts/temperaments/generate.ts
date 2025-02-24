import Input from "./Input";
import Part from "./Part";

export default function temperamentsGenerate(basePart: Input): Part {
  return {
    ET12: basePart.ET12,
    LIMIT_5_SYMMETRIC_N1: `${basePart.LIMIT_5_SYMMETRIC}1`,
    LIMIT_5_SYMMETRIC_N2: `${basePart.LIMIT_5_SYMMETRIC}2`,
    PYTHAGOREAN: basePart.PYTHAGOREAN,
  };
}
