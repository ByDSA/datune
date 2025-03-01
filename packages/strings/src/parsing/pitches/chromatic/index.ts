import { Pitch } from "@datune/core/pitches/chromatic";
import { normalizeInput } from "../normalizeInput";
import { parseRaw } from "./raw";
import { Options } from "parsing";

export function parsePitch(input: string, options?: Options): Pitch | null {
  const normalizedInput = normalizeInput(input);

  return parseRaw(normalizedInput, options);
}
