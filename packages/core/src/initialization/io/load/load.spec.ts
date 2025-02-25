import load from "./load";

it("ok", async () => {
  const data = await load( {
    path: "tests/cache.json",
    local: true,
  } );

  expect(data).toBeDefined();
} );
