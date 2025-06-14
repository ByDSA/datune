import { Chord, Key, Keys as K, Scales as S, IntervalSets, IntervalArray } from "@datune/core/alt";
import { triadRootChord } from "@datune/core/keys/alt/modifiers";
import { regionalDistanceRule } from "./regional-distance-rule";
import { regionalLevelChordDistanceRule } from "./chord-distance-rule";

export function majorMinorKeyFromChord(chord: Chord): Key {
  let key: Key | null = null;

  if (chord.hasRootIntervals(...IntervalSets.TRIAD_MAJOR.rootIntervals as IntervalArray))
    key = K.from(chord.root, S.MAJOR);
  else if (chord.hasRootIntervals(...IntervalSets.TRIAD_MINOR.rootIntervals as IntervalArray))
    key = K.from(chord.root, S.MINOR);
  else if (chord.hasRootIntervals(...IntervalSets.TRIAD_DIMINISHED.rootIntervals as IntervalArray))
    key = K.from(chord.root, S.LOCRIAN);

  if (key === null)
    throw new Error(`The chord ${chord} is not compatible with the key ${key}.`);

  return key;
}

type ChordKey = {
  chord: Chord;
  key: Key;
};
type ChordKeyRegion = ChordKey & {
  region: Key;
};
type Props = {
  start: ChordKeyRegion;
  goal: ChordKeyRegion;
};
type RegionalLevelChordDistanceRuleInfo = ReturnType<typeof regionalLevelChordDistanceRule> & {
  meta: {
    start: ChordKey;
    goal: ChordKey;
  };
};
export type ChordRegionDistanceRuleRet = {
  dist: number;
  meta: {
    startToTonicPivotRegion?: RegionalLevelChordDistanceRuleInfo;
    pivotRegionShifts?: ReturnType<typeof regionalDistanceRule>;
    endTonicPivotRegionToGoal?: RegionalLevelChordDistanceRuleInfo;
  };
};

export function chordRegionDistanceRule( { start, goal }: Props): ChordRegionDistanceRuleRet {
  let accDist = 0;
  const startTonic = triadRootChord(start.region)!;
  const goalTonic = triadRootChord(goal.region)!;
  let meta: ChordRegionDistanceRuleRet["meta"] = {};

  if (start.chord !== startTonic) {
    const x = {
      chord: start.chord,
      key: majorMinorKeyFromChord(start.chord),
    };
    const y = {
      chord: startTonic,
      key: start.region,
    };
    const distanceChordToTonic = regionalLevelChordDistanceRule( {
      x,
      y,
    } );

    meta.startToTonicPivotRegion = {
      ...distanceChordToTonic,
      meta: {
        ...distanceChordToTonic.meta,
        start: x,
        goal: y,
      },
    },
    accDist += distanceChordToTonic.dist;
  }

  const regionalDistanceObj = regionalDistanceRule( {
    from: start.region,
    to: goal.region,
  } );

  meta.pivotRegionShifts = regionalDistanceObj;
  accDist += regionalDistanceObj.dist;

  if (goal.chord !== goalTonic) {
    const x = {
      chord: goalTonic,
      key: goal.region,
    };
    const y = {
      chord: goal.chord,
      key: goal.key,
    };
    const distanceTonicToChord = regionalLevelChordDistanceRule( {
      x,
      y,
    } );

    meta.endTonicPivotRegionToGoal = {
      ...distanceTonicToChord,
      meta: {
        ...distanceTonicToChord.meta,
        start: x,
        goal: y,
      },
    },
    accDist += distanceTonicToChord.dist;
  }

  return {
    dist: accDist,
    meta,
  };
}
