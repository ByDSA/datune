#!/usr/bin/env zx

try {
  process.env.FORCE_COLOR = "1";
  $.verbose = true;
  await spinner("Installing dependencies ...", async () => {
    $.verbose = true;
    await $`rm -rf node_modules`;
    await $`pnpm i --ignore-workspace`;
  } );

  await spinner("Linting ...", ()=> $`pnpm lint`);
  await spinner("Testing ...", ()=> $`pnpm test`);
  await spinner("Building ...", ()=> $`pnpm build`);
} catch (e) {
  console.log(e.stderr ?? e.toString());
  process.exit(1);
}
