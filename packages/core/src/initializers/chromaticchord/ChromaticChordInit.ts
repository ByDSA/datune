import { NumberArray } from "@datune/utils";
import { Chord, ChromaticArray } from "../../chords";
import { ChromaticChordCache, HashingObjectType } from "../../chords/octave/chromatic/building/cache/ChromaticChordCache";
import { Chromatic } from "../../pitches";
import { ChromaticPattern } from "../../voicings";
import { Initializer } from "../initializer/Initializer";
import { MainInit } from "../main/MainInit";
import { ChromaticChordData } from "./data/ChromaticChordData";

export class ChromaticChordInit extends Initializer<ChromaticChordData> {
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
        const map = <Map<string, Chord>>(<any>_getCache())._map;
        map.clear();
        for (const d of data) {
            const h = d.h;
            const hashingObject: HashingObjectType = <ChromaticArray>d.n.map(num2notes);
            const c: Chord = (<any>_getCache())._innerCreate(hashingObject);
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
    for (const pattern of ChromaticPattern.allNonInversions())
        for (const note of Chromatic.all) {
            const chord = Chord.fromRootPattern(note, pattern);
            let chordInv = chord;
            for (let i = 1; i < chord.length; i++) {
                chordInv = chordInv.withInv();
            }
        }
}

function map2ChromaticChordData(): ChromaticChordData {
    const map = _getCacheMap();
    const ret: ChromaticChordData = [];
    map.forEach((v, k) => {
        const h = k;
        const n = <NumberArray>v.notes.map(notes2Num);
        const p = v.pattern.rootIntervals;
        ret.push({ h, n, p });
    });

    return ret;
}

function _getCache(): ChromaticChordCache {
    return (<ChromaticChordCache>(<any>Chord)._cache);
}

function _getCacheMap(): Map<string, Chord> {
    return (<any>_getCache())._map;
}

export function notes2Num(n: Chromatic): number {
    return n.valueOf();
}

export function num2notes(i: number): Chromatic {
    return Chromatic.fromInt(i);
}