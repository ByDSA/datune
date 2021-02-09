import * as fs from "fs";
import { ChromaticChordInit } from "../../initializers/chromaticchord/ChromaticChordInit";
import { ScaleInit } from "../../initializers/scale/ScaleInit";
import { TonalityInit } from "../../initializers/tonality/TonalityInit";
import { Initializer } from "../initializer/Initializer";
import { MainData } from "./data/MainData";

export class MainInit extends Initializer<MainData> {
    private static _singleton = new MainInit();
    static get singleton() {
        return this._singleton;
    }

    protected constructor() {
        super();
    }

    protected innerLoad(path: string): MainData {
        let buffer = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' });
        return JSON.parse(buffer);
    }

    initialize(data: MainData): boolean {
        return !!data.chords && ChromaticChordInit.singleton.initialize(data.chords) &&
            !!data.scales && ScaleInit.singleton.initialize(data.scales) &&
            !!data.keys && TonalityInit.singleton.initialize(data.keys);
    }

    protected innerPrecalc(): MainData {
        let chords = ChromaticChordInit.singleton.precalc();
        let scales = ScaleInit.singleton.precalc();
        let keys = TonalityInit.singleton.precalc();
        const meta = {
            version: "1.0"
        };
        return {
            meta,
            chords,
            keys,
            scales
        };
    }

    load(): MainData | null {
        return super.loadFrom(MAIN_FILENAME);
    }

    save() {
        return super.saveTo(MAIN_FILENAME);
    }
}

const MAIN_FILENAME = "main.json";