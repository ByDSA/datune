/* eslint-disable accessor-pairs */
import { Arrays } from "@datune/utils";
import { Chord } from "index";
import Initializer from "initializers";
import MainInit from "initializers/main/MainInit";
import { Chromatic, chromaticFromInt } from "pitches";
import { ALL } from "pitches/symbolic/octave/chromatic";
import { HashingObjectType } from "voiceleading/steps/single/cache";
import { ALL_NON_INVERSIONS } from "voicings/relative/chromatic";
import { ChromaticChordData } from "./data/ChromaticChordData";

export class ChromaticChordInit extends Initializer {
  private static _singleton = new ChromaticChordInit();

  static get singleton() {
    return this._singleton;
  }

  protected constructor() {
    super();

    Object.freeze(ChromaticChordInit.singleton);
  }

  protected innerLoad(): ChromaticChordData | null {
    return MainInit.singleton.load()?.chords || null;
  }

  initialize(data: ChromaticChordData): boolean {
    const map = <Map<string, Chord>>(<any>getCache())._map;

    map.clear();

    for (const d of data) {
      const { h } = d;
      const hashingObject: HashingObjectType = <ChromaticArray>d.n.map(num2notes);
      const c: Chord = (<any>getCache())._innerCreate(hashingObject);

      (<any>c)._precalcPattern = Object.freeze(d.p);

      map.set(h, c);
    }

    return true;
  }

  protected innerPrecalc(): ChromaticChordData {
    precalcChromaticChords();

    return map2ChromaticChordData();
  }
}

function precalcChromaticChords() {
  for (const pattern of ALL_NON_INVERSIONS) {
    for (const note of ALL) {
      const chord = Chord.fromRootPattern(note, pattern);
      let chordInv = chord;

      for (let i = 1; i < chord.length; i++)
        chordInv = chordInv.withInv();
    }
  }
}

function map2ChromaticChordData(): ChromaticChordData {
  const map = _getCacheMap();
  const ret: ChromaticChordData = [];

  map.forEach((v, k) => {
    const h = k;
    const n = <Arrays.Number>v.notes.map(notes2Num);
    const p = v.pattern.rootIntervals;

    ret.push( {
      h,
      n,
      p,
    } );
  } );

  return ret;
}

function getCache(): ChromaticChordCache {
  return (<ChromaticChordCache>(<any>Chord)._cache);
}

function _getCacheMap(): Map<string, Chord> {
  return (<any>getCache())._map;
}

export function notes2Num(n: Chromatic): number {
  return n.valueOf();
}

export function num2notes(i: number): Chromatic {
  return chromaticFromInt(i);
}
