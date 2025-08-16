import type { Chord, Degree, Func, Scale, DegreeArray, DegreeFunc, CompoundFunc } from "@datune/core/alt";
import { Funcs, Key, Scales, Keys } from "@datune/core/alt";
import { getCombinations } from "datils/math/combinatorics";
import { deepFreeze } from "datils/datatypes/objects";
import { keyIsMajorOrMinor } from "../major-minor-conversions";
import { mainTriads, SetsGen } from "./sets-gen";

const allDiatonicDegreeFuncsInScaleTriadsMap = new Map<Scale, Readonly<Set<DegreeFunc>>>();

type Ret = DegreeFunc[];
const allDiatonicDegreeFuncsInScaleAnyLengthMap = new Map<Scale, Readonly<Ret>>();

function generateChordsByPath(
  scale: Scale,
  setsGen: SetsGen,
): Ret {
  const ret: Ret = [];

  for (let degreeIndex = 0; degreeIndex < scale.length; degreeIndex++) {
    const root = scale.degrees[degreeIndex];
    const sets = setsGen(scale, root);

    for (const intervalSet of sets) {
      const degreeArray = intervalSet.rootIntervals
        .map(iv => (root.withShifted(iv).toDegree())) as DegreeArray;
      const isScaleHasAll = scale.hasDegrees(...degreeArray);

      if (isScaleHasAll) {
        const f = Funcs.fromDegreeIntervalSet(root, intervalSet);

        ret.push(f);
      }
    }
  }

  return ret;
}

type Props = {
  scale: Scale;
  setsGen?: SetsGen;
};
export function getDiatonicDegreeFuncsInScale(
  { scale, setsGen = mainTriads }: Props,
): Readonly<Ret> {
  let ret = allDiatonicDegreeFuncsInScaleAnyLengthMap.get(scale);

  if (ret !== undefined)
    return ret;

  ret = generateChordsByPath(scale, setsGen);

  allDiatonicDegreeFuncsInScaleAnyLengthMap.set(scale, ret);

  return deepFreeze(ret);
}

export function getAllDiatonicDegreeFuncsInScaleTriads(
  scale: Scale,
): Readonly< Set<DegreeFunc>> {
  let ret = allDiatonicDegreeFuncsInScaleTriadsMap.get(scale);

  if (ret !== undefined)
    return ret;

  ret = new Set<DegreeFunc>();
  const { degrees } = scale;
  const combs = getCombinations(degrees, 3);

  for (const c of combs) {
    if (c.length > 1)
      ret.add(Funcs.fromDegrees(...c as DegreeArray));
  }

  allDiatonicDegreeFuncsInScaleTriadsMap.set(scale, ret);

  return ret;
}

type FuncChord = {
  chord: Chord;
  func: Func;
};
export function getAllDiatonicChordsInRegion(key: Key): Set<FuncChord> {
  const ret = new Set<FuncChord>();
  const diatonicFuncs = getAllDiatonicDegreeFuncsInScaleTriads(key.scale);

  for (const f of diatonicFuncs) {
    const chord = f.getChord(key.root);

    ret.add( {
      chord,
      func: f,
    } );
  }

  const dominantSecondariesFuncs = key.scale.degrees
    .map(degree => {
      return getSecondariesFromDegree(degree);
    } ).flat(1);

  for (const d of dominantSecondariesFuncs) {
    const chord = d.getChord(key.root);

    if (key.hasChord(chord)) {
      ret.add( {
        chord,
        func: d,
      } );
    }
  }

  return ret;
}

function getSecondariesFromDegree(degree: Degree): CompoundFunc[] {
  return [
    Funcs.compose(Funcs.V, degree),
    Funcs.compose(Funcs.V7, degree),
    Funcs.compose(Funcs.SUBV7, degree),
    Funcs.compose(Funcs.V7ALT, degree),
  ];
}

type RegionChordFunc = {
  region: Key;
  chord: Chord;
  func: Func;
};

export function getAllTriadChordsInRegion(region: Key): Set<RegionChordFunc> {
  if (!keyIsMajorOrMinor(region))
    return new Set();

  const { root, scale } = region;
  const modes = Scales.modes(scale);
  const keyModes = modes.map(s=>Keys.from(root, s));
  const ret = new Set<RegionChordFunc>();

  for (const k of keyModes) {
    const dChordFuncs = getAllDiatonicChordsInRegion(k);

    for (const cf of dChordFuncs) {
      ret.add( {
        chord: cf.chord,
        func: cf.func,
        region: k,
      } );
    }
  }

  return ret;
}
