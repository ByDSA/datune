#!/usr/bin/env zx
/* eslint-disable no-undef */
try {
  process.env.FORCE_COLOR = "1";
  $.verbose = true;

  await spinner("Installing dependencies ...", async () => {
    await $`rm -rf node_modules`;
    await $`pnpm i --ignore-workspace`;
  } );
  await spinner("Linting ...", ()=> $`pnpm lint`);
} catch (e) {
  console.log(e.stdout ?? e.toString());
  process.exit(1);
}
