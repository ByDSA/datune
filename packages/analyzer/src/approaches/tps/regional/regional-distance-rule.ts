import { Degrees, Funcs as F, Intervals as I, Key, Keys } from "@datune/core/alt";
import { DegreeFunc } from "@datune/core/functions/alt/degree-function/DegreeFunc";
import { assertIsDefined } from "datils/datatypes/nullish";
import { intervalSetToMajorMinorScale, scaleToMajorMinorIntervalSet } from "../major-minor-conversions";
import { regionalLevelChordDistanceRule } from "./chord-distance-rule";
import { findAllShortestPaths } from "./regional-space-motion";

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
  const fromRootChordIntervalSet = scaleToMajorMinorIntervalSet(from.scale);
  const toRootChordIntervalSet = scaleToMajorMinorIntervalSet(to.scale);
  const toRelativeToFrom = I.betweenNext(from.root, to.root).toDegree();

  assertIsDefined(fromRootChordIntervalSet, `The scale ${from.scale} are not compatible with the regional distance rule.`);
  assertIsDefined(toRootChordIntervalSet, `The scale ${to.scale} are not compatible with the regional distance rule.`);

  const start = F.fromDegreeIntervalSet(Degrees.I, fromRootChordIntervalSet);
  const goal = F.fromDegreeIntervalSet(toRelativeToFrom, toRootChordIntervalSet);
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
      const xRoot = from.root.withShifted(previous.baseDegree);
      const xScale = intervalSetToMajorMinorScale(previous.intervalSet);

      assertIsDefined(xScale);
      const x = {
        chord: from.getChord(previous),
        key: Keys.from(xRoot, xScale),
      };
      const yRoot = from.root.withShifted(current.baseDegree);
      const yScale = intervalSetToMajorMinorScale(current.intervalSet);

      assertIsDefined(yScale);
      const y = {
        chord: from.getChord(current),
        key: Keys.from(yRoot, yScale),
      };
      const currentDist = regionalLevelChordDistanceRule( {
        x,
        y,
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
