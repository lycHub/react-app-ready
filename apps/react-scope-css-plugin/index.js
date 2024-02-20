import { createFilter } from "rollup-pluginutils";
import compiler from "@vue/compiler-sfc";
import { parseReactRequest } from "./utils.js";
import babelScopedJsx from "./babel-scoped-jsx.js";

const lessReg = /\.less$/;
const scssReg = /\.(sa|sc)ss$/;

const DefaultOptions = {
  include: /\.[jt]sx$/,
  cssReg: /\.scoped\.(le|sa|sc|c)ss$/,
};

export default (options = {}) => {
  let command = "";
  const finalOptions = { ...DefaultOptions, ...options };
  const filter = createFilter(finalOptions.include, finalOptions.exclude);

  return {
    name: "vite-plugin-react-scoped-css",
    enforce: "pre",
    apply(_, { command: cmd }) {
      command = cmd;
      return true;
    },
    async transform(code, id) {
      const { query, filename } = parseReactRequest(id);
      if (query.scoped) {
        // console.log("transform>>>", id, query);
        const isProd = command === "build";
        const config = {
          filename,
          id: query.scoped,
          isProd,
          source: code,
          scoped: true,
        };
        const lang = lessReg.test(filename)
          ? "less"
          : scssReg.test(filename)
          ? "scss"
          : "";
        if (lang) {
          config.preprocessLang = lang;
        }
        const result = compiler.compileStyle(config);
        /* if (id.includes("Forms")) {
          console.log("Forms scoped>>", query.scoped, result.code);
        } */
        return {
          code: result.code,
          map: result.map,
        };
      }
      if (!filter(filename)) return;
      // console.log("filename>>>", filename);
      const res = babelScopedJsx(code, { ...finalOptions, filename });
      // console.log("transform>>>", res.code);
      return res;
    },
  };
};
