import { cyclicMod } from "datils/math";
import { Chord } from "@datune/core/chords/alt";
import { Pitch } from "@datune/core/pitches/alt";
import { inv } from "@datune/core/intervalSets/relative/alt/modifiers/inv";
import { getNumInversionOf } from "@datune/core/intervalSets/relative/alt/constants/inversionMap";
import { IntervalSet, IntervalSets as IS, PitchArray, Interval } from "@datune/core/alt";
import { fromPitches } from "@datune/core/chords/octave/alt/building";
import { fromInterval } from "@datune/core/degrees/alt/building";
import { stringifyShortName, stringifyShortNameLang } from "strings/intervalSets/alt/shortName";
import { Options } from "lang/Options";
import { stringifyPitch } from "strings/pitches/alt";

export function stringifyChord(chord: Chord, options?: Options): string {
  const simplifiedChord = removeRepeatedPitches(chord);
  const intervalSet = simplifiedChord.toIntervalSet();

  if (!intervalSet)
    return getDefaultName(simplifiedChord, options);

  const custom = customStringify(simplifiedChord, intervalSet);

  if (custom)
    return custom;

  const inversion = getNumInversionOf(intervalSet);
  const invIntervalSet = inv(intervalSet, -inversion);
  const rootPosition = cyclicMod(-inversion, simplifiedChord.length);
  const rootName = stringifyPitch(simplifiedChord.pitches[rootPosition], options);
  let invIntervalSetShortName = stringifyShortNameLang(invIntervalSet);

  if (invIntervalSetShortName === null)
    invIntervalSetShortName = `(${invIntervalSet.rootIntervals.map(intervalToRoman)})`;

  let inversionName = "";

  if (inversion !== 0)
    inversionName = getInversionName(simplifiedChord, options);

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

function getDefaultName(chord: Chord, options?: Options): string {
  return chord.pitches.map((p) => stringifyPitch(p, options)).join("-");
}

function getInversionName(chord: Chord, options?: Options): string {
  const pitch: Pitch = chord.pitches[0];
  const pitchName = stringifyPitch(pitch, options);
  const str = `/${pitchName}`;

  return str;
}

let MAJOR_OVERS: Set<IntervalSet>;
let MINOR_OVERS: Set<IntervalSet>;

function customStringify(chord: Chord, intervalSet: IntervalSet): string | null {
  if (!MAJOR_OVERS) {
    MAJOR_OVERS = new Set([
      IS.MAJOR_OVER_M2, IS.MAJOR_OVER_m2,
      IS.MAJOR_OVER_m3, IS.MAJOR_OVER_P4, IS.MAJOR_OVER_a4, IS.MAJOR_OVER_d5,
      IS.MAJOR_OVER_m6, IS.MAJOR_OVER_a5,
    ]);

    MINOR_OVERS = new Set([
      IS.MINOR_OVER_m2,
      IS.MINOR_OVER_M2, IS.MINOR_OVER_M3, IS.MINOR_OVER_P4, IS.MINOR_OVER_a4,
      IS.MINOR_OVER_d5, IS.MINOR_OVER_m7,
    ]);
  }

  if (chord.root === chord.pitches[0]
    && MAJOR_OVERS.has(intervalSet))
    return stringifyPitch(chord.pitches[1]) + "/" + stringifyPitch(chord.pitches[0]);

  if (chord.root === chord.pitches[0]
    && MINOR_OVERS.has(intervalSet))
    return stringifyPitch(chord.pitches[1]) + stringifyShortName(IS.TRIAD_MINOR) + "/" + stringifyPitch(chord.pitches[0]);

  return null;
}

function intervalToRoman(interval: Interval): string {
  const degree = fromInterval(interval);
  const diatonicIntervalNumStr = (+degree.diatonicDegree + 1).toString();
  const alt = degree.alts > 0 ? "♯".repeat(degree.alts) : "♭".repeat(-degree.alts);

  return alt + diatonicIntervalNumStr;
}
