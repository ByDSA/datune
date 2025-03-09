import { load } from "./load";
import { loadSync } from "./loadSync";

it("ok", async () => {
  const data = await load( {
    path: "tests/cache.json",
    local: true,
  } );

  expect(data).toBeDefined();
} );

it("ok sync", () => {
  const data = loadSync( {
    path: "tests/cache.json",
    local: true,
  } );

  expect(data).toBeDefined();
} );
