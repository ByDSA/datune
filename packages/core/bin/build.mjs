#!/usr/bin/env zx

import { defaultBuild } from "daproj/zx/build.mjs";

const { outDir } = await defaultBuild();

$.verbose = true;
await $`sed -i -E 's|"file:\.\./|\"file:\.\./\.\./|g' ${outDir}/package.json`;
