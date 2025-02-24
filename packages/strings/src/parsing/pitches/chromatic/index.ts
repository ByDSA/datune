import { Options } from "parsing";
import { Pitch } from "@datune/core/pitches/chromatic";
import normalizeInput from "../normalizeInput";
import parseRaw from "./raw";

export default function parse(input: string, options?: Options): Pitch | null {
  const normalizedInput = normalizeInput(input);

  return parseRaw(normalizedInput, options);
}
