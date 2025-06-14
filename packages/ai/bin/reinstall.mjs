#!/usr/bin/env zx

$.verbose = true;

await $`rm -rf node_modules`;
await $`pnpm i --ignore-workspace`;
