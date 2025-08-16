import { Chord, Key } from "@datune/core/alt";
import { ChordKey } from "../ChordKey";
import { chordToMajorMinorKey } from "../major-minor-conversions";
import { regionalDistanceRule } from "./regional-distance-rule";
import { regionalLevelChordDistanceRule } from "./chord-distance-rule";

type ChordKeyRegion = {
  chord: Chord;
  key?: Key;
  region: Key;
};
type Props = {
  start: ChordKeyRegion;
  end: ChordKeyRegion;
};
type RegionalLevelChordDistanceRuleInfo = ReturnType<typeof regionalLevelChordDistanceRule> & {
  meta: {
    start: ChordKey;
    end: ChordKey;
  };
};
export type Ret = {
  dist: number;
  meta: {
    startToPivot?: RegionalLevelChordDistanceRuleInfo;
    pivotRegionShifts?: ReturnType<typeof regionalDistanceRule>;
    pivotToEnd?: RegionalLevelChordDistanceRuleInfo;
  };
};

export function chordRegionDistanceRule( { start, end }: Props): Ret {
  let dist = 0;
  let meta: Ret["meta"] = {};
  const startTonicChord = start.region.triadRootChord!;
  const startChord = start.chord;

  if (startChord !== startTonicChord) {
    const x = {
      chord: startChord,
      key: start.key ?? chordToMajorMinorKey(startChord),
    };
    const y = {
      chord: startTonicChord,
      key: start.region,
    };
    const distanceChordToTonic = regionalLevelChordDistanceRule( {
      x,
      y,
    } );

    meta.startToPivot = {
      ...distanceChordToTonic,
      meta: {
        ...distanceChordToTonic.meta,
        start: x,
        end: y,
      },
    },
    dist += distanceChordToTonic.dist;
  }

  const regionalDistanceObj = regionalDistanceRule( {
    from: start.region,
    to: end.region,
  } );

  meta.pivotRegionShifts = regionalDistanceObj;
  dist += regionalDistanceObj.dist;

  const endChord = end.chord;
  const endTonicChord = end.region.triadRootChord!;

  if (endChord !== endTonicChord) {
    const x = {
      chord: endTonicChord,
      key: end.region,
    };
    const y = {
      chord: endChord,
      key: end.key ?? chordToMajorMinorKey(endChord),
    };
    const distanceTonicToChord = regionalLevelChordDistanceRule( {
      x,
      y,
    } );

    meta.pivotToEnd = {
      ...distanceTonicToChord,
      meta: {
        ...distanceTonicToChord.meta,
        start: x,
        end: y,
      },
    },
    dist += distanceTonicToChord.dist;
  }

  return {
    dist,
    meta,
  };
}
