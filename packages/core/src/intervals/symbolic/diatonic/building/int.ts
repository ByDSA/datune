import Direction from "../Direction";
import Interval from "../Interval";
import cache from "../caching/cache";

export default function from(magnitude: number, direction = Direction.ASCENDENT): Interval {
  const fixedMagnitude = Math.abs(magnitude);
  let fixedDirection = direction;

  if (magnitude < 0)
    fixedDirection = Direction.DESCENDENT;

  return cache.getOrCreate( {
    magnitude: fixedMagnitude,
    direction: fixedDirection,
  } );
}
