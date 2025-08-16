import { Chord, Key } from "@datune/core/alt";
import { chordRegionDistanceRule } from "../regional/chord-region-distance-rule";
import { getAllDiatonicDegreeFuncsInScaleTriads } from "./regions";

type Ret = {
  chord: Chord;
  dist: number;
}[];
export function calcAllDistancesInRegion(region: Key): Ret {
  const funcs = getAllDiatonicDegreeFuncsInScaleTriads(region.scale);
  const chordKeys = [...funcs].map(f=> {
    const chord = f.getChord(region.root);
    const i = region.pitches.indexOf(chord.root);
    const key = region.withMode(i + 1);

    return {
      chord,
      key,
    };
  } );
  const start = {
    chord: region.triadRootChord!,
    key: region,
    region,
  };
  const results = chordKeys.map(ck=>{
    const distanceResults = chordRegionDistanceRule( {
      start,
      end: {
        chord: ck.chord,
        key: ck.key,
        region,
      },
    } );

    return {
      chord: ck.chord,
      dist: distanceResults.dist,
    } as Ret[0];
  } ).sort((a, b)=>a.dist - b.dist);

  return results;
}
