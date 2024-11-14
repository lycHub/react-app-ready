export default {
  extends: "stylelint-config-standard-scss",
  reportDescriptionlessDisables: true,
  reportInvalidScopeDisables: true,
  reportNeedlessDisables: true,
  customSyntax: "postcss-scss",
  ignoreFiles: ["apps/**/*.ignore.scss"],
  cache: true,
  fix: true,
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
    "selector-pseudo-class-no-unknown": [
      true,
      { ignorePseudoClasses: ["/^[global|deep]/"] },
    ],
  },
};
