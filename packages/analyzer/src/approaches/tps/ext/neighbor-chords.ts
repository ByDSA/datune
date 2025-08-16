import { DegreeFunc, CompoundFunc } from "@datune/core/alt";
import { Chord, Degree, Func, Key, Keys, PitchSet, Scales } from "@datune/core/alt";
import { getId as getChordId } from "@datune/core/chords/octave/alt/caching/cache";
import { getId as getKeyId } from "@datune/core/keys/alt/building/caching/cache";
import { triadRootChord } from "@datune/core/keys/alt/modifiers";
import { assertIsDefined } from "datils/datatypes/nullish";
import { chordIsMajorOrMinor, chordToMajorMinorKey, intervalSetToMajorMinorScale, keyIsMajorOrMinor, scaleToMajorMinorScale } from "../major-minor-conversions";
import { regionalLevelChordDistanceRule } from "../regional/chord-distance-rule";
import { regionalDistanceRule } from "../regional/regional-distance-rule";
import { findManyByDistance } from "./finder";
import { getAllTriadChordsInRegion } from "./regions";

type KeyChord = {
  key: Key;
  chord: Chord;
};

function hashKeyChord(kc: KeyChord): string {
  return getKeyId(kc.key) + " " + getChordId(kc.chord);
}

type N = KeyChord;
type Props = {
  start: {
    chord: Chord;
    degreeKey?: Key;
    region: Key;
  };
  goal: {
    pitchSet: PitchSet;
  };
};
type Params = Parameters<typeof findManyByDistance<N>>[0];
type Ret = ReturnType<typeof findManyByDistance<N>>;
export function findChordByPitchSet( { start, goal }: Props): Ret {
  const isTarget: Params["isTarget"] = (node) => {
    return node.chord.pitchSet === goal.pitchSet;
  };
  const getKey: Params["getKey"] = hashKeyChord;
  let { degreeKey } = start;

  if (degreeKey === undefined) {
    const funcs = getFuncsOfChord(start.chord, start.region);

    degreeKey = getChordKeyBaseFromFuncRegion(funcs[0], start.region);
  }

  const startNode: Params["start"] = {
    chord: start.chord,
    key: degreeKey,
  };
  const getNeighbors: Params["getNeighbors"] = (node: N): ReturnType<Params["getNeighbors"]> => {
    const isFirstNode = node.chord === start.chord && node.key === degreeKey;

    if (isFirstNode) {
      const neighbors = [...getAllTriadChordsInRegion(start.region)];
      const goalInNeighbors = neighbors
        .map(n=> ( {
          chord: n.chord,
          key: node.key,
        } ))
        .filter(c=>isTarget(c))
        // filter duplicates:
        .filter((c, index, self) => {
          return self.findIndex(n=>n.chord === c.chord && n.key === c.key) === index;
        } );

      if (goalInNeighbors.length > 0) {
        return goalInNeighbors.map(n=> {
          const distance = regionalLevelChordDistanceRule( {
            x: {
              chord: node.chord,
              key: node.key,
            },
            y: {
              chord: n.chord,
              key: node.key, // TODO: posiblemente haya que poner la keyChord de n.chord
            },
          } ).dist;

          return {
            node: n as N,
            distance,
          };
        } );
      }

      const startTonic = triadRootChord(start.region)!;

      if (node.chord !== startTonic) {
        const distance = regionalLevelChordDistanceRule( {
          x: {
            chord: node.chord,
            key: node.key,
          },
          y: {
            chord: startTonic,
            key: start.region,
          },
        } ).dist;

        return [
          {
            distance,
            node: {
              chord: startTonic,
              key: start.region,
            } as N,
          },
        ];
      }
    }

    const keyFromChord = node.key;
    const neighbors = [...getAllTriadChordsInRegion(keyFromChord)];
    const goalInNeighbors = neighbors
      .map(n=> ( {
        chord: n.chord,
        key: node.key,
      } ))
      .filter(c=>isTarget(c))
      // filter duplicates:
      .filter((c, index, self) => {
        return self.findIndex(n=>n.chord === c.chord && n.key === c.key) === index;
      } );

    if (goalInNeighbors.length > 0) {
      const goalTonic = triadRootChord(keyFromChord)!;

      return goalInNeighbors.flatMap(n=> {
        const funcsOfChord = getFuncsOfChord(n.chord, n.key);

        return funcsOfChord.map(f => {
          let goalChordKey: Key = getChordKeyBaseFromFuncRegion(f, n.key);
          const distance = regionalLevelChordDistanceRule( {
            x: {
              chord: goalTonic,
              key: n.key,
            },
            y: {
              chord: n.chord,
              key: goalChordKey,
            },
          } ).dist;

          return {
            distance,
            node: {
              chord: n.chord,
              key: goalChordKey,
            },
          };
        } );
      } );
    }

    const neighborsMajorOrMinor = neighbors.filter(n=> {
      return chordIsMajorOrMinor(n.chord) && keyIsMajorOrMinor(n.region);
    } );

    return neighborsMajorOrMinor.map(n => {
      const keyTo = chordToMajorMinorKey(n.chord);
      const distance = regionalDistanceRule( {
        from: keyFromChord,
        to: keyTo,
      } ).dist;

      return {
        distance,
        node: {
          chord: n.chord,
          key: keyTo,
        },
      };
    } ).filter(n => n.distance > 0);
  };
  const ret = findManyByDistance<N>( {
    getKey,
    getNeighbors,
    isTarget,
    // maxDistance: 35,
    start: startNode,
  } );

  return ret;
}

function getFuncsOfChord(chord: Chord, region: Key): Func[] {
  const ret: Func[] = [];
  const all = getAllTriadChordsInRegion(region);

  for (const a of all) {
    if (a.chord === chord)
      ret.push(a.func);
  }

  return ret;
}

function getDegreeFunc(f: Func): DegreeFunc {
  if (f instanceof CompoundFunc)
    return f.degreeFunc;
  else if (f instanceof DegreeFunc)
    return f;

  throw new Error(`The function ${f} is not a DegreeFunc or CompoundFunc.`);
}

function getBaseDegree(f: Func): Degree {
  if (f instanceof CompoundFunc)
    return f.degreeChain.at(-1)!;
  else if (f instanceof DegreeFunc)
    return f.baseDegree;

  throw new Error(`The function ${f} is not a DegreeFunc or CompoundFunc.`);
}

function getChordKeyBaseFromFuncRegion(f: Func, region: Key): Key {
  let baseDegree = getBaseDegree(f);
  let degreeFunc = getDegreeFunc(f);
  const pitch = region.root.withShifted(baseDegree);

  if (degreeFunc === f) { // Not compound
    const s = intervalSetToMajorMinorScale(degreeFunc.intervalSet);

    if (s !== null) {
      return Keys.from(
        pitch,
        s,
      );
    }
  }

  // Si es función compuesta, o no es una triada mayor o menor
  const mode = region.pitches.indexOf(pitch);

  if (mode === -1)
    throw new Error(`The pitch ${pitch} is not in the region ${region}.`);

  let scale = region.scale.withMode(mode + 1);

  if (scale !== Scales.MAJOR && scale !== Scales.MINOR) {
    const replaceScale = scaleToMajorMinorScale(scale);

    if (replaceScale !== null)
      scale = replaceScale;
  }

  assertIsDefined(scale);

  return Keys.from(pitch, scale);
}
