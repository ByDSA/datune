#!/usr/bin/env zx
/* eslint-disable no-undef */
import { defaultBuild } from "daproj/zx/build.mjs";

const { outDir } = await defaultBuild();

$.verbose = true;
await $`sed -i -E 's|"file:\.\./|\"file:\.\./\.\./|g' ${outDir}/package.json`;

await $`sed -i -E '/"chevrotain":.*/d' ${outDir}/package.json`;
await $`cp lib/chevrotain/lib/chevrotain.min.cjs ${outDir}/`;
const outFolder = outDir.substring(2); // Quitar "./"

await replace( {
  glob: [`${outFolder}/**/*.js`, `!${outFolder}/chevrotain/**`],
  flag: "chevrotain",
  regex: /require\(("|')chevrotain("|')\)/g,
  doReplace: (file) => {
    const rootFolderRelativePath = path.relative(path.dirname(file), outFolder);

    return `require("${rootFolderRelativePath}/chevrotain.min.cjs")`;
  },
} );

async function replace( {
  glob,
  regex,
  doReplace,
  flag,
} ) {
  const files = await globby(glob);

  for (const file of files) {
    const content = await fs.readFile(file, "utf8");

    if (content.includes(flag)) {
      const newStr = doReplace(file);
      const newContent = content.replace(regex, newStr);

      await fs.writeFile(file, newContent);
      await echo`Fixed file: ${file}`;
    }
  }
}
