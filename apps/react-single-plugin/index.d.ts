import { PluginOption } from "vite";
declare type SingleFileFunc = (params: {
  include: string;
  exclude: string;
  ext: RegExp;
}) => PluginOption;
declare const singleFile: SingleFileFunc;
export default singleFile;