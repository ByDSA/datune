#!/usr/bin/env zx
/* eslint-disable no-undef */

$.verbose = true;

await $`rm -rf dist`;
await $`tsc -p tsconfig-build.json && tsc-alias -p tsconfig-build.json`;
await $`cp package.json pnpm-lock.yaml ./dist`;
await $`sed -i -E 's|"file:\.\./|\"file:\.\./\.\./|g' ./dist/package.json`;

await $`sed -i -E '/"chevrotain":.*/d' ./dist/package.json`;
await $`cp lib/chevrotain/lib/chevrotain.min.cjs dist/`;
await replace( {
  glob: ["dist/**/*.js", "!dist/chevrotain/**"],
  flag: "chevrotain",
  regex: /require\(("|')chevrotain("|')\)/g,
  doReplace: (file) => {
    const rootFolderRelativePath = path.relative(path.dirname(file), "dist");

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
