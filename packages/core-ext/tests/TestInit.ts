import { loadSync } from "@datune/core/initialization";
import init from "@datune/core/initialization/initialize";

export class TestInit {
  static loadAll() {
    const path = "tests/cache.json";
    const data = loadSync( {
      path,
      local: true,
    } );

    if (!data)
      throw new Error();

    init(data);
  }
}
