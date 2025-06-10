#!/usr/bin/env zx

import { defaultBuild } from "daproj/zx/build.mjs";

$.verbose = true;
const { outDir } = await defaultBuild();

await $`sed -i -E 's|"file:\.\./|\"file:\.\./\.\./|g' ${outDir}/package.json`;
