import { init, loadSync } from "@datune/core";
import { initialize as initMidi } from "@datune/midi";

export class TestInit {
  private static loadAll() {
    const path = "tests/cache.json";
    const data = loadSync( {
      path,
      local: true,
    } );

    if (!data)
      throw new Error();

    init(data);
  }

  static initAll() {
    this.loadAll();
    initMidi();
  }
}
