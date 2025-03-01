import { Voicing } from "@datune/core/voicings/diatonic";

export function stringifyVoicingShortName(obj: Voicing): string {
  return stringifyVoicing(obj);
}

export function stringifyVoicing(obj: Voicing): string {
  return obj.rootIntervalInts.toString();
}
