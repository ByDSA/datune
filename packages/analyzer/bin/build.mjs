#!/usr/bin/env zx

$.verbose = true;
await $`rm -rf dist`;
await $`tsc -p tsconfig-build.json && tsc-alias -p tsconfig-build.json`;
await $`cp package.json pnpm-lock.yaml ./dist`;
await $`sed -i -E 's|"file:\.\./|\"file:\.\./\.\./|g' ./dist/package.json`;
