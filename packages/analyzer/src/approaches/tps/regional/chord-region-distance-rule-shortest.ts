import { type Chord, type Key } from "@datune/core/alt";
import { type ChordRegionDistanceRuleRet } from "./chord-region-distance-rule";

type ChordKey = {
  chord: Chord;
  key: Key;
};
type Props = {
  start: ChordKey;
  goal: ChordKey;
};
type Ret = {
  dist: number;
  meta: ChordRegionDistanceRuleRet & {
    startRegion: Key;
    goalRegion: Key;
  };
};
// TODO
export function shortestChordRegionDistanceRule( { start, goal }: Props): Ret {
  // Encontrar todas las regiones que contengan from.chord
  // Encontrar todas las regiones que contengan to.chord
  // Encontrar todos los caminos entre esas regiones
  // Aplicar chord/region distance rule para todos los caminos
  // Quedarse con la distancia más corta
  return null as any;
}
