import { cyclicMod } from "datils/math";
import { Chord } from "@datune/core/chords/chromatic";
import { Pitch, PitchArray } from "@datune/core/pitches/chromatic";
import { inv } from "@datune/core/intervalSets/relative/chromatic/modifiers";
import { getNumInversionOf } from "@datune/core/intervalSets/relative/chromatic/constants/inversionMap";
import { IntervalSet, IntervalSets as IS, Interval } from "@datune/core/chromatic";
import { fromPitches } from "@datune/core/chords/octave/chromatic/building/pitches";
import { stringifyShortName } from "strings/intervalSets/chromatic/shortName";
import { stringifyShortNameLang } from "strings/intervalSets/chromatic/shortName";
import { stringifyPitch } from "strings/pitches/chromatic";

export function stringifyChord(chord: Chord): string {
  const simplifiedChord = removeRepeatedPitches(chord);
  const intervalSet = simplifiedChord.toIntervalSet();
  const custom = customStringify(simplifiedChord, intervalSet);

  if (custom)
    return custom;

  const inversion = getNumInversionOf(intervalSet);
  const invIntervalSet = inv(intervalSet, -inversion);
  const rootPosition = cyclicMod(-inversion, simplifiedChord.length);
  const rootName = stringifyPitch(simplifiedChord.pitches[rootPosition]);
  let invIntervalSetShortName = stringifyShortNameLang(invIntervalSet);

  if (invIntervalSetShortName === null)
    invIntervalSetShortName = `(${invIntervalSet.rootIntervals.map(intervalToRoman)})`;

  let inversionName = "";

  if (inversion !== 0)
    inversionName = getInversionName(chord);

  return rootName + invIntervalSetShortName + inversionName;
}

function removeRepeatedPitches(chord: Chord): Chord {
  const pitches: PitchArray = [] as any;
  const added = new Set<Pitch>();

  for (const p of chord.pitches) {
    if (!added.has(p)) {
      pitches.push(p);

      added.add(p);
    }
  }

  return fromPitches(...pitches);
}

function getInversionName(chord: Chord): string {
  const pitch: Pitch = chord.pitches[0];
  const pitchName = stringifyPitch(pitch);
  const str = `/${pitchName}`;

  return str;
}

function customStringify(chord: Chord, intervalSet: IntervalSet): string | null {
  const MAJOR_OVERS = new Set([
    IS.MAJOR_OVER_M2, IS.MAJOR_OVER_m2,
    IS.MAJOR_OVER_m3, IS.MAJOR_OVER_P4, IS.MAJOR_OVER_d5, IS.MAJOR_OVER_a5,
  ]);
  const MINOR_OVERS = new Set([
    IS.MINOR_OVER_m2,
    IS.MINOR_OVER_M2, IS.MINOR_OVER_M3, IS.MINOR_OVER_P4, IS.MINOR_OVER_d5, IS.MINOR_OVER_m7,
  ]);

  if (chord.root === chord.pitches[0]
    && MAJOR_OVERS.has(intervalSet))
    return stringifyPitch(chord.pitches[1]) + "/" + stringifyPitch(chord.pitches[0]);

  if (chord.root === chord.pitches[0]
    && MINOR_OVERS.has(intervalSet))
    return stringifyPitch(chord.pitches[1]) + stringifyShortName(IS.TRIAD_MINOR) + "/" + stringifyPitch(chord.pitches[0]);

  return null;
}

function intervalToRoman(interval: Interval): string {
  switch (interval) {
    case 0: return "1";
    case 1: return "♭2";
    case 2: return "2";
    case 3: return "♭3";
    case 4: return "3";
    case 5: return "4";
    case 6: return "♭5";
    case 7: return "5";
    case 8: return "♭6";
    case 9: return "6";
    case 10: return "♭7";
    case 11: return "7";
    case 12: return "8";
    case 13: return "♭9";
    case 14: return "9";
    case 15: return "♭10";
    case 16: return "10";
    case 17: return "11";
    case 18: return "♭12";
    case 19: return "12";
    case 20: return "♭13";
    case 21: return "13";
    case 22: return "♭14";
    case 23: return "14";
    case 24: return "15";
    default: return "??";
  }
}
