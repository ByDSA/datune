import { Degree, IntervalSet, IntervalSets, Scales } from "@datune/core/alt";
import { Degree as DDegree } from "@datune/core/diatonic";
import { getDiatonicDegreeFuncsInScale } from "./regions";

it("test", () => {
  const actual = getDiatonicDegreeFuncsInScale(Scales.MAJOR);

  console.log(actual.map(f=> strDeg(f.baseDegree) + strIntervalSet(f.intervalSet)));

  expect(actual.length).toBeGreaterThan(7);
} );

function strDeg(d: Degree) {
  return strDInt(d.diatonicInterval) + strAlts(d.alts);
}

function strAlts(alts: number) {
  if (alts === 0)
    return "";

  if (alts > 0)
    return "#".repeat(alts);

  if (alts < 0)
    return "b".repeat(-alts);
}

function strDInt(dInt: DDegree) {
  switch (+dInt) {
    case 0: return "I";
    case 1: return "II";
    case 2: return "III";
    case 3: return "IV";
    case 4: return "V";
    case 5: return "VI";
    case 6: return "VII";
    default: return `D(${dInt})`;
  }
}

function strIntervalSet(intervalSet: IntervalSet) {
  if (intervalSet === IntervalSets.TRIAD_MAJOR)
    return "";

  if (intervalSet === IntervalSets.TRIAD_MINOR)
    return "m";

  if (intervalSet === IntervalSets.TRIAD_DIMINISHED)
    return "º";

  if (intervalSet === IntervalSets.TRIAD_AUGMENTED)
    return "+";

  if (intervalSet === IntervalSets.SEVENTH_MAJ7)
    return "maj7";

  if (intervalSet === IntervalSets.SEVENTH_MAJ7_b5)
    return "maj7b5";

  if (intervalSet === IntervalSets.TRIAD_SUS2)
    return "sus2";

  if (intervalSet === IntervalSets.TRIAD_SUS4)
    return "sus4";

  if (intervalSet === IntervalSets.SEVENTH_SUS4)
    return "7sus4";

  if (intervalSet === IntervalSets.TRIAD_QUARTAL)
    return "quartal";

  if (intervalSet === IntervalSets.SEVENTH_SUS4_b9)
    return "7sus4b9";

  if (intervalSet === IntervalSets.SEVENTH)
    return "7";

  if (intervalSet === IntervalSets.SEVENTH_MINOR)
    return "m7";

  return intervalSet.toString();
}
