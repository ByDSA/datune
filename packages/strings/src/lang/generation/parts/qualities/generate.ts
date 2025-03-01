import { QualitiesInput } from "./Input";
import { QualitiesPart } from "./Part";

export function qualitiesGenerate(input: QualitiesInput): QualitiesPart {
  return {
    perfect: input.perfect,
    major: input.major,
    minor: input.minor,
    augmented: input.augmented,
    diminished: input.diminished,
    doublyDiminished: input.doublyDiminished,
    doublyAugmented: input.doublyAugmented,
  };
}
