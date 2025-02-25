import { Scale } from "../../../src/scales";
import { ScaleCache } from "../../../src/scales/symbolic/chromatic/scale/building/cache";
import { Initializer } from "../initializer/Initializer";
import { MainInit } from "../main/MainInit";
import { ScaleData, ScaleSingleData } from "./data/ScaleData";

export default class ScaleInit extends Initializer<ScaleData> {
  private static _singleton = new ScaleInit();

  static get singleton() {
    return this._singleton;
  }

  protected constructor() {
    super();

    Object.freeze(ScaleInit.singleton);
  }

  protected innerLoad(): ScaleData | null {
    return MainInit.singleton.load()?.scales || null;
  }

  initialize(data: ScaleData): boolean {
    const map = <Map<string, Scale>>(<any>_getCache())._map;

    map.clear();

    // Data
    for (const d of data) {
      const { h } = d;
      const scale: Scale = (<any>_getCache())._innerCreate(d.i);

      (<any>scale)._precalcDegrees = Object.freeze(d.d);

      map.set(h, scale);
    }

    // Modes
    for (const d of data) {
      const { h } = d;
      const scale = Scale.fromIntraIntervals(...d.i);

      (<any>scale)._precalcModes = d.m.map((i) => Scale.fromIntraIntervals(...i));
      Object.freeze((<any>scale)._precalcModes);

      map.set(h, scale);
    }

    return true;
  }

  protected innerPrecalc(): ScaleData {
    _precalc();

    return _map2KeyData();
  }
}

function _precalc() {
  Scale.sets.all();
}

function _map2KeyData(): ScaleData {
  const map = _getCacheMap();
  const ret: ScaleData = [];

  map.forEach((v, k) => {
    const t = _toJson(v, k);

    ret.push(t);
  } );

  return ret;
}

function _toJson(scale: Scale, h: string): ScaleSingleData {
  const i = scale.intraIntervals;
  const d = scale.degrees;
  const m = scale.modes.map((s) => s.intraIntervals);

  return {
    h,
    i,
    d,
    m,
  };
}

function _getCache(): ScaleCache {
  return (<ScaleCache>(<any>Scale)._cache);
}

function _getCacheMap(): Map<string, Scale> {
  return (<any>_getCache())._map;
}
