import { Pitch } from "@datune/core/pitches/chromatic";
import { Options } from "parsing";
import { normalizeInput } from "../normalizeInput";
import { parseRaw } from "./raw";

export function parsePitch(input: string, options?: Options): Pitch | null {
  const normalizedInput = normalizeInput(input);

  return parseRaw(normalizedInput, options);
}
