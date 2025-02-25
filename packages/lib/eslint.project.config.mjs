const projectConfig = [
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

export const configs = projectConfig;
