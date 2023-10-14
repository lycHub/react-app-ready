import pxtorem from "postcss-pxtorem";
import pxToRemConfig from "@app-ready/libs/plugins/pxToRem.js";

export default {
  plugins: [pxtorem(pxToRemConfig())],
};
