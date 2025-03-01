import { normalizeAlts } from "../utils";

export function normalizeIntervalsInput(strValue: string): string {
  const fixed = strValue.trim();

  return normalizeAlts(fixed);
}
