#!/usr/bin/env zx

import { spinnerVerbose } from "daproj/zx/spinnerVerbose.mjs";

try {
  await spinnerVerbose("Installing dependencies ...", async () => {
    await $`rm -rf node_modules`;
    await $`pnpm i --ignore-workspace`;
  } );
  await spinnerVerbose("Linting ...", ()=> $`pnpm lint`);
} catch {
  process.exit(1);
}
