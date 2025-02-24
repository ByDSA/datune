// @ts-check

import * as fs from "node:fs";
import * as path from "node:path";
import { Dependencies } from "daproj";
import { generateConfigs } from "daproj/eslint";
import { configs as projectConfigs } from "./lib/eslint.project.config.mjs";

const generatedConfigs = generateConfigs( {
  [Dependencies.Jest]: true,
  [Dependencies.Eslint]: true,
  [Dependencies.Prettier]: true,
  [Dependencies.TypeScript]: true,
} );
const getSubprojects = (dir) => {
  return fs.readdirSync(dir).filter(subdir => {
    const subdirPath = path.join(dir, subdir);

    return fs.statSync(subdirPath).isDirectory() && fs.existsSync(path.join(subdirPath, "package.json"));
  } );
};
const subprojects = getSubprojects(process.cwd());
const infrastructureConfig = [
  {
    ignores: subprojects.map(s=>"**/" + s),
  },
  {
    files: ["**/*.ts"],
    rules: {
      "import/no-default-export": "off",
    },
  },
];

export default [
  ...generatedConfigs,
  ...projectConfigs,
  ...infrastructureConfig,
];
