import { Degrees, Funcs as F, Intervals as I, Key, Keys, Scales as S, Voicings as V, Voicing } from "@datune/core/alt";
import { DegreeFunc } from "@datune/core/functions/alt/degree-function/DegreeFunc";
import { regionalLevelChordDistanceRule } from "./chord-distance-rule";
import { findAllShortestPaths } from "./regional-space-motion";

function getMajorOrMinor(key: Key): Voicing {
  const { root } = key;
  const M3 = root.withShifted(I.M3);
  const P5 = root.withShifted(I.P5);

  if (key.hasPitches(M3, P5))
    return V.TRIAD_MAJOR;

  const m3 = root.withShifted(I.m3);

  if (key.hasPitches(m3, P5))
    return V.TRIAD_MINOR;

  throw new Error(`Key ${key} is not major or minor.`);
}
type PathNode = {
  content: DegreeFunc;
  dist: {
    acc: number;
    last: ReturnType<typeof regionalLevelChordDistanceRule>;
  };
};
type Ret = {
  dist: number;
  meta: {
    path: PathNode[];
  };
};
type Props = {
  from: Key;
  to: Key;
};
export function regionalDistanceRule( { from, to }: Props): Ret {
  const fromRootChordVoicing = getMajorOrMinor(from);
  const toRootChordVoicing = getMajorOrMinor(to);
  const toRelativeToFrom = I.betweenNext(from.root, to.root);
  const start = F.fromDegreeVoicing(Degrees.I, fromRootChordVoicing);
  const goal = F.fromDegreeVoicing(toRelativeToFrom, toRootChordVoicing);
  const paths = findAllShortestPaths( {
    start,
    goal,
  } );
  const pathsWithDistance: Ret[] = paths.map(pathContent => {
    let nodes: PathNode[] = [];
    let accDist = 0;

    for (let i = 1; i < pathContent.length; i++) {
      const previous = pathContent[i - 1];
      const current = pathContent[i];
      const xRoot = from.root.withShifted(previous.degree);
      const xKey = previous.voicing === V.TRIAD_MAJOR
        ? Keys.from(xRoot, S.MAJOR)
        : Keys.from(xRoot, S.MINOR);
      const xChord = previous.getChord(from)!;
      const yRoot = from.root.withShifted(current.degree);
      const yKey = current.voicing === V.TRIAD_MAJOR
        ? Keys.from(yRoot, S.MAJOR)
        : Keys.from(yRoot, S.MINOR);
      const yChord = current.getChord(from)!;
      const currentDist = regionalLevelChordDistanceRule( {
        x: {
          chord: xChord,
          key: xKey,
        },
        y: {
          chord: yChord,
          key: yKey,
        },
      } );

      accDist += currentDist.dist;
      nodes.push( {
        content: current,
        dist: {
          acc: accDist,
          last: currentDist,
        },
      } );
    }

    return {
      dist: accDist,
      meta: {
        path: nodes,
      },
    };
  } );
  const pathWithDistanceSortedAscByDist = pathsWithDistance.sort((a, b) => a.dist - b.dist);

  return pathWithDistanceSortedAscByDist[0];
}
