module.exports = {
  env: {
    node: true,
    mocha: true
  },
  parser: "babel-eslint",
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module"
  },
  rules: {
    "max-len": [
      "warn",
      {
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreRegExpLiterals: true,
        ignoreTemplateLiterals: true
      }
    ],
    eqeqeq: 1,
    indent: ["warn", 2, { SwitchCase: 1 }],
    "linebreak-style": ["error", "unix"],
    semi: ["error", "always"],
    "no-console": ["off"],
    quotes: ["error", "single"],
    "no-case-declarations": 0,
    "no-unused-vars": 0
  }
};
