// @ts-check

import * as fs from "node:fs";
import * as path from "node:path";
import { Dependencies } from "daproj";
import { generateConfigs } from "daproj/eslint";

const projectConfigs = [
  {
    files: ["**/*.ts{,x}", "**/*.js{,x}"],
    rules: {
      "import/no-internal-modules": "off",
      "no-underscore-dangle": ["error", {
        allow: ["_id"],
      }],
    },
  },
];
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
    files: ["src/**/*.ts"],
    rules: {
      // "import/no-default-export": "off",
    },
  },
];

export default [
  ...generatedConfigs,
  ...projectConfigs,
  ...infrastructureConfig,
];
