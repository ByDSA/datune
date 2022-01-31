import * as fs from "fs";
import { ChromaticChordInit } from "../chromaticchord/ChromaticChordInit";
import { Initializer } from "../initializer/Initializer";
import { KeyInit } from "../key/KeyInit";
import { ScaleInit } from "../scale/ScaleInit";
import { MainData } from "./data/MainData";

export default class MainInit extends Initializer<MainData> {
  private static _singleton = new MainInit();

  static get singleton() {
    return this._singleton;
  }

  protected constructor() {
    super();
  }

  protected innerLoad(path: string): MainData {
    const buffer = fs.readFileSync(path, {
      encoding: "utf8",
      flag: "r",
    } );

    return JSON.parse(buffer);
  }

  initialize(data: MainData): boolean {
    return !!data.chords && ChromaticChordInit.singleton.initialize(data.chords)
            && !!data.scales && ScaleInit.singleton.initialize(data.scales)
            && !!data.keys && KeyInit.singleton.initialize(data.keys);
  }

  protected innerPrecalc(): MainData {
    const chords = ChromaticChordInit.singleton.precalc();
    const scales = ScaleInit.singleton.precalc();
    const keys = KeyInit.singleton.precalc();
    const meta = {
      version: "1.0",
    };

    return {
      meta,
      chords,
      keys,
      scales,
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
