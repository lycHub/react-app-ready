import { PluginOption } from "vite";
declare type ScopedCssFunc = (params: {
  include: RegExp;
  cssReg: RegExp;
}) => PluginOption;
declare const ScopedCssFunc: SingleFileFunc;
export default ScopedCssFunc;