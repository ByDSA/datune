import { NumberArray } from "@datune/utils";
import { notes2Num, num2notes } from "../../initializers/chromaticchord/ChromaticChordInit";
import { ChromaticIntervalArray } from "../../intervals";
import { Chromatic } from "../../pitches";
import { Scale } from "../../scales";
import { Tonality } from "../../tonalities";
import { HashingObjectType, TonalityCache } from "../../tonalities/chromatic/building/cache/TonalityCache";
import { Initializer } from "../initializer/Initializer";
import { MainInit } from "../main/MainInit";
import { TonalityData, TonalitySingleData } from "./data/TonalityData";

export class TonalityInit extends Initializer<TonalityData> {
    private static _singleton = new TonalityInit();
    static get singleton() {
        return this._singleton;
    }

    protected constructor() {
        super();

        Object.freeze(TonalityInit.singleton);
    }

    protected innerLoad(path: string): TonalityData | null {
        return MainInit.singleton.loadFrom(path)?.keys || null;
    }

    initialize(data: TonalityData): boolean {
        const map = <Map<string, Tonality>>(<any>_getCache())._map;
        map.clear();
        for (const d of data) {
            const h = d.h;
            const root = Chromatic.fromInt(d.n[0]);
            const scale = Scale.fromIntraIntervals(...<ChromaticIntervalArray>d.s);
            const hashingObject: HashingObjectType = { root, scale };
            const t: Tonality = (<any>_getCache())._innerCreate(hashingObject);
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

    protected innerPrecalc(): TonalityData {
        precalcTonalities();

        return map2TonalityData();
    }
}

function precalcTonalities() {
    for (const s of Scale.sets.all())
        for (const root of Chromatic.all) {
            const t = Tonality.from(root, s);
        }
}

function map2TonalityData(): TonalityData {
    const map = _getCacheMap();
    const ret: TonalityData = [];
    map.forEach((v, k) => {
        const t = tonality2json(v, k);
        ret.push(t);
    });

    return ret;
}

function tonality2json(t: Tonality, h: string): TonalitySingleData {
    const s = t.scale.intraIntervals;
    const n = <NumberArray>t.notes.map(notes2Num);
    const r3 = <NumberArray>t.rootChord3?.notes?.map(notes2Num) || null;
    const r4 = <NumberArray>t.rootChord4?.notes?.map(notes2Num) || null;

    return { h, s, n, r3, r4 }
}

function _getCache(): TonalityCache {
    return (<TonalityCache>(<any>Tonality)._cache);
}

function _getCacheMap(): Map<string, Tonality> {
    return (<any>_getCache())._map;
}