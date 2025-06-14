import { Chord, Intervals as I, Key, PitchSets as PS, Pitch, PitchSet } from "@datune/core/alt";
import { calcJ as calcJInChordal, distinctivePitchClassesInBasicSpaceLevelsAToC } from "../chordal/chord-distance-rule";
import { getNRegionalCircleOfFifthsRule } from "./regional-circle-of-fifths-rule";

type KeyChord = {
  chord: Chord;
  key: Key;
};
type ChordDistanceRuleProps = {
  x: KeyChord;
  y: KeyChord;
};
type RuleRet = {
  dist: number;
  meta: {
    i: number;
    j: number;
    k: number;
  };
};
export function regionalLevelChordDistanceRule(props: ChordDistanceRuleProps): RuleRet {
  const i = calcI(props);
  const j = calcJ(props);
  const k = calcK(props);
  const dist = i + j + k;

  return {
    dist,
    meta: {
      i,
      j,
      k,
    },
  };
}

export function calcI( { x, y }: ChordDistanceRuleProps): number {
  if (x.key === y.key)
    return 0;

  const xPitchSet = PS.fromPitches(...x.key.pitches);
  const yPitchSet = PS.fromPitches(...y.key.pitches);

  return Math.abs(getNRegionalCircleOfFifthsRule( {
    from: xPitchSet.toChromaticPitchSet(),
    to: yPitchSet.toChromaticPitchSet(),
  } ));
}

type Ret = {
  changes: Map<Pitch, Pitch>;
  fixedPitchSet: PitchSet;
};
export function fixDiatonicWithNewPitches(
  diatonicLevel: PitchSet,
  newPitches: PitchSet,
  root: Pitch,
): Ret {
  const pitchesInTargetNotInDiatonicLevel = newPitches.pitches.filter(p=>!diatonicLevel.has(p));
  const changes = new Map<Pitch, Pitch>();

  for (const p of pitchesInTargetNotInDiatonicLevel) {
    const interval = I.betweenNext(root, p);

    switch (interval) {
      case I.m2: {
        const M2 = root.withShifted(I.M2);

        if (!newPitches.has(M2)) {
          diatonicLevel = diatonicLevel
            .withRemoved(M2);
          changes.set(M2, p);
        }

        break;
      }
      case I.M2: {
        const m2 = root.withShifted(I.m2);

        if (!newPitches.has(m2)) {
          diatonicLevel = diatonicLevel
            .withRemoved(m2);
          changes.set(m2, p);
        }

        break;
      }
      case I.m3: {
        const M3 = root.withShifted(I.M3);

        if (!newPitches.has(M3)) {
          diatonicLevel = diatonicLevel
            .withRemoved(M3);
          changes.set(M3, p);
        }

        break;
      }
      case I.M3: {
        const m3 = root.withShifted(I.m3);

        if (!newPitches.has(m3)) {
          diatonicLevel = diatonicLevel
            .withRemoved(m3);
          changes.set(m3, p);
        }

        break;
      }
      case I.P4: {
        const a4 = root.withShifted(I.d5);

        if (!newPitches.has(a4)) {
          diatonicLevel = diatonicLevel
            .withRemoved(a4);
          changes.set(a4, p);
        }

        break;
      }
      case I.d5: {
        const P4 = root.withShifted(I.P4);
        const P5 = root.withShifted(I.P5);

        if (!newPitches.has(P4)) {
          diatonicLevel = diatonicLevel
            .withRemoved(P4);
          changes.set(P4, p);
        } else if (!newPitches.has(P5)) {
          diatonicLevel = diatonicLevel
            .withRemoved(P5);
          changes.set(P5, p);
        }

        break;
      }
      case I.m6: {
        const M6 = root.withShifted(I.M6);

        if (!newPitches.has(M6)) {
          diatonicLevel = diatonicLevel
            .withRemoved(M6);
          changes.set(M6, p);
        }

        break;
      }
      case I.M6: {
        const m6 = root.withShifted(I.m6);

        if (!newPitches.has(m6)) {
          diatonicLevel = diatonicLevel
            .withRemoved(m6);
          changes.set(m6, p);
        }

        break;
      }
      case I.m7: {
        const M7 = root.withShifted(I.M7);

        if (!newPitches.has(M7)) {
          diatonicLevel = diatonicLevel
            .withRemoved(M7);
          changes.set(M7, p);
        }

        break;
      }
      case I.M7: {
        const m7 = root.withShifted(I.m7);

        if (!newPitches.has(m7)) {
          diatonicLevel = diatonicLevel
            .withRemoved(m7);
          changes.set(m7, p);
        }

        break;
      }
    }

    diatonicLevel = diatonicLevel.withAdded(p);
  }

  return {
    fixedPitchSet: diatonicLevel,
    changes,
  };
}

export function calcJ( { x, y }: ChordDistanceRuleProps): number {
  // diatonicLevel = PS.fromPitches(...y.key.pitches, ...y.chord.pitches, ...x.chord.pitches);
  return calcJInChordal( {
    from: x.chord,
    to: y.chord,
  } );
}

export const calcK = ( { x, y }: ChordDistanceRuleProps)=>{
  let xKey = x.key;
  let yKey = y.key;

  return distinctivePitchClassesInBasicSpaceLevelsAToD( {
    x: {
      key: xKey,
      chord: x.chord,
    },
    y: {
      key: yKey,
      chord: y.chord,
    },
  } );
};

export function distinctivePitchClassesInBasicSpaceLevelsAToD(
  { x, y }: ChordDistanceRuleProps,
): number {
  let count = distinctivePitchClassesInBasicSpaceLevelsAToC(
    x.chord.toChromaticChord(),
    y.chord.toChromaticChord(),
  );
  // Level d:
  const yDiatonicLevel = y.key.pitchSet
    .withAdded(...y.chord.pitches);

  for (const p of yDiatonicLevel) {
    if (!x.key.hasPitches(p))
      count++;
  }

  return count;
}
