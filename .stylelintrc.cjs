module.exports = {
  plugins: "stylelint-scss",
  extends: "stylelint-config-standard",
  reportDescriptionlessDisables: true,
  reportInvalidScopeDisables: true,
  reportNeedlessDisables: true,
  customSyntax: "postcss-scss",
  ignoreFiles: ["apps/**/*.ignore.scss"],
  rules: {
    "no-descending-specificity": null,
    "media-feature-range-notation": "prefix",
    "function-no-unknown": [
      true,
      {
        ignoreFunctions: ["constant"],
      },
    ],
    "at-rule-no-unknown": [true, { ignoreAtRules: ["use"] }],
  },
};
