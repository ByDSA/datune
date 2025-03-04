import { loadSync } from "@datune/core/initialization";
import { initialize } from "@datune/core/initialization/initialize";

export class TestInit {
  static loadAll() {
    const path = "tests/cache.json";
    const data = loadSync( {
      path,
      local: true,
    } );

    if (!data)
      throw new Error();

    initialize(data);
  }
}
