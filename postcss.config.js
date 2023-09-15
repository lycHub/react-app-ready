import pxtorem from "postcss-pxtorem";
import pxToRemConfig from "./plugins/pxToRem.js";

export default {
  plugins: [pxtorem(pxToRemConfig())],
};
