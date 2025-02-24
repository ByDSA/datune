// @ts-check

import { Dependencies } from "daproj";
import { generateConfigs } from "daproj/eslint";
import { configs as projectConfigs } from "./lib/eslint.project.config.mjs";

const generatedConfigs = generateConfigs( {
  [Dependencies.Jest]: true,
  [Dependencies.Eslint]: true,
  [Dependencies.Prettier]: true,
  [Dependencies.TypeScript]: true,
} );
const infrastructureConfig = [
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
