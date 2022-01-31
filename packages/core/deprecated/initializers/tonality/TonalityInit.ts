import { NumberArray } from "@datune/utils";
import { ChromaticIntervalArray } from "../../../src/intervals";
import { Key } from "../../../src/keys";
import { HashingObjectType, KeyCache } from "../../../src/keys/chromatic/building/cache";
import { Chromatic } from "../../../src/pitches";
import { notes2Num, num2notes } from "../chromaticchord/ChromaticChordInit";
import { Initializer } from "../initializer/Initializer";
import { MainInit } from "../main/MainInit";
import { KeyData, KeySingleData } from "./data/KeyData";

export class KeyInit extends Initializer<KeyData> {
  private static _singleton = new KeyInit();

  static get singleton() {
    return this._singleton;
  }

  protected constructor() {
    super();

    Object.freeze(KeyInit.singleton);
  }

  protected innerLoad(path: string): KeyData | null {
    return MainInit.singleton.loadFrom(path)?.keys || null;
  }

  initialize(data: KeyData): boolean {
    const map = <Map<string, Key>>(<any>_getCache())._map;

    map.clear();

    for (const d of data) {
      const { h } = d;
      const root = Chromatic.fromInt(d.n[0]);
      const scale = Scale.fromIntraIntervals(...<ChromaticIntervalArray>d.s);
      const hashingObject: HashingObjectType = {
        root,
        scale,
      };
      const t: Key = (<any>_getCache())._innerCreate(hashingObject);

      (<any>t)._notes = d.n.map(num2notes);
      Object.freeze((<any>t)._notes);
      (<any>t)._rootChord3 = d.r3?.map(num2notes) || null;
      Object.freeze((<any>t)._rootChord3);
      (<any>t)._rootChord4 = d.r4?.map(num2notes) || null;
      Object.freeze((<any>t)._rootChord4);

      map.set(h, t);
    }

    return true;
  }

  protected innerPrecalc(): KeyData {
    precalcTonalities();

    return map2KeyData();
  }
}

function precalcTonalities() {
  for (const s of Scale.sets.all()) {
    for (const root of Chromatic.all) {
      const t = Key.from(root, s);
    }
  }
}

function map2KeyData(): KeyData {
  const map = _getCacheMap();
  const ret: KeyData = [];

  map.forEach((v, k) => {
    const t = key2json(v, k);

    ret.push(t);
  } );

  return ret;
}

function key2json(t: Key, h: string): KeySingleData {
  const s = t.scale.intraIntervals;
  const n = <NumberArray>t.notes.map(notes2Num);
  const r3 = <NumberArray>t.rootChord3?.notes?.map(notes2Num) || null;
  const r4 = <NumberArray>t.rootChord4?.notes?.map(notes2Num) || null;

  return {
    h,
    s,
    n,
    r3,
    r4,
  };
}

function _getCache(): KeyCache {
  return (<KeyCache>(<any>Key)._cache);
}

function _getCacheMap(): Map<string, Key> {
  return (<any>_getCache())._map;
}
