#!/usr/bin/env zx

import { findInPackageJsonName } from "daproj/node/package-json/get-info.mjs";
import { spinnerVerbose } from "daproj/zx/spinnerVerbose.mjs";

try {
  const projectName = await findInPackageJsonName();

  await spinnerVerbose(projectName + ": Installing dependencies ...", async () => {
    await $`rm -rf node_modules`;
    await $`pnpm i --ignore-workspace`;
  } );
  await spinnerVerbose(projectName + ": Linting ...", ()=> $`pnpm lint`);
} catch {
  process.exit(1);
}
