import { normalizeAlts } from "../utils";

export default function normalize(strValue: string): string {
  const fixed = strValue.trim();

  return normalizeAlts(fixed);
}
