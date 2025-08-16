import { type Chord, IntervalSets as IS, type IntervalArray, type Key, Scales as S, Keys as K, Intervals as I, type IntervalSet, Scale, DegreeArray, IntervalSets } from "@datune/core/alt";

const triadMajorRootIntervals = IS.TRIAD_MAJOR.rootIntervals as IntervalArray;
const triadMinorRootIntervals = IS.TRIAD_MINOR.rootIntervals as IntervalArray;

export function chordToMajorMinorKey(chord: Chord): Key {
  let key: Key | null = null;

  if (chord.hasRootIntervals(...triadMajorRootIntervals))
    key = K.from(chord.root, S.MAJOR);
  else if (chord.hasRootIntervals(...triadMinorRootIntervals))
    key = K.from(chord.root, S.MINOR);
  else if (chord.hasRootIntervals(...IS.TRIAD_DIMINISHED.rootIntervals as IntervalArray))
    key = K.from(chord.root, S.LOCRIAN);

  if (key === null)
    throw new Error(`The chord ${chord} is not compatible with the key ${key}.`);

  return key;
}

export function scaleToMajorMinorIntervalSet(scale: Scale): IntervalSet | null {
  if (scale.hasDegrees(I.M3, I.P5))
    return IS.TRIAD_MAJOR;

  if (scale.hasDegrees(I.m3, I.P5))
    return IS.TRIAD_MINOR;

  return null;
}

export function intervalSetToMajorMinorScale(intervalSet: IntervalSet): Scale | null {
  if (intervalSet.hasAll(...triadMajorRootIntervals))
    return S.MAJOR;

  if (intervalSet.hasAll(...triadMinorRootIntervals))
    return S.MINOR;

  return null;
}

export function scaleIsMajor(scale: Scale): boolean {
  return scale.hasDegrees(...IntervalSets.TRIAD_MAJOR.rootIntervals as DegreeArray);
}

export function scaleIsMinor(scale: Scale): boolean {
  return scale.hasDegrees(...IntervalSets.TRIAD_MINOR.rootIntervals as DegreeArray);
}

export function scaleIsMajorOrMinor(scale: Scale): boolean {
  return scaleIsMajor(scale) || scaleIsMinor(scale);
}

export function keyIsMajorOrMinor(key: Key): boolean {
  const { scale } = key;

  return scaleIsMajorOrMinor(scale);
}

export function chordIsMajorOrMinor(chord: Chord): boolean {
  if (chord.hasRootIntervals(...IntervalSets.TRIAD_MAJOR.rootIntervals as DegreeArray))
    return true;

  if (chord.hasRootIntervals(...IntervalSets.TRIAD_MINOR.rootIntervals as DegreeArray))
    return true;

  return false;
}

export function scaleToMajorMinorScale(scale: Scale): Scale | null {
  if (scaleIsMajor(scale))
    return S.MAJOR;
  else if (scaleIsMinor(scale))
    return S.MINOR;

  return null;
}
