import Input from "./Input";
import Part from "./Part";

export default function qualitiesGenerate(input: Input): Part {
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
