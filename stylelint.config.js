export default {
  extends: "stylelint-config-standard",
  reportDescriptionlessDisables: true,
  reportInvalidScopeDisables: true,
  reportNeedlessDisables: true,
  customSyntax: "postcss-less",
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
  },
};
