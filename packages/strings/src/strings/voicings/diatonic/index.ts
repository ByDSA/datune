import { Voicing } from "@datune/core/voicings/diatonic";

export function shortNameStringify(obj: Voicing): string {
  return stringify(obj);
}

export function stringify(obj: Voicing): string {
  return obj.rootIntervalInts.toString();
}
