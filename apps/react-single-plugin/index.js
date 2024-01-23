import { createFilter } from "rollup-pluginutils";
import { readFileSync } from "node:fs";
import { join, basename, dirname, extname } from "node:path";
import { parseReactRequest } from "./utils.js";
import { DefaultOptions } from "./help.js";
import compiler from "@vue/compiler-sfc";
import * as sass from "sass";
import less from "less";

export default function reactSingle(options = {}) {
  const finalOptions = { ...DefaultOptions, ...options };
  const filter = createFilter(options.include, options.exclude);
  let config = {
    importFilePathMap: new Map(),
  };
  return {
    name: "vite-plugin-react-single",
    configResolved(data) {
      config = {
        ...config,
        ...data,
      };
    },
    enforce: "pre",
    resolveId(id, from) {
      if (!filter(id)) return id;
      if (parseReactRequest(id).query.react) {
        return id;
      }
      if (finalOptions.ext.test(id)) {
        config.importerFilePath = from;
        const file = basename(id, extname(id));
        config.importFilePathMap?.set(file, id);
        // console.log("resolveId>>>", from);
        return id.replace(finalOptions.ext, ".tsx?react");
      }
    },

    load(id) {
      const { query } = parseReactRequest(id);
      if (query.react) {
        const file = basename(id, extname(id));
        const path = join(
          dirname(config.importerFilePath),
          config.importFilePathMap?.get(file)
        );
        try {
          const content = readFileSync(path).toString();
          // console.log("命中>>>", path);
          return content;
        } catch (error) {
          console.log("error>>>", error);
        }
      }
    },
    async transform(code, id) {
      const { filename, query } = parseReactRequest(id);
      if (query.react) {
        // console.log("命中222>>>", id, code);
        try {
          const { parse } = compiler;
          const { descriptor, errors } = parse(code, {
            filename,
          });
          if (!errors.length) {
            const scriptContent = descriptor?.script.content || "";
            // console.log("filename>>", scriptContent, descriptor?.styles);
            const styles = await genStyles(descriptor?.styles);
            const code = `${scriptContent}\n${styles}`;
            // 结果会进入transform的第二个参数
            return {
              code,
              map: descriptor.map,
            };
          }
        } catch (error) {
          console.log("error>>>", error);
        }
      }
    },
  };
}

async function genStyles(styles) {
  let content = "";
  if (styles.length) {
    const styleContents = await Promise.all(
      styles.map((item) => {
        const process = item.lang === "less" ? "less" : "sass";
        return transformStyleContent(item.content, process);
      })
    );
    content = styleContents.join("\n");
    // console.log("content>>", content);
    if (content) {
      return `const styleTag = document.createElement('style');
      // styleTag.textContent = ".product-card{font-weight:bold;color:yellow;}";
      styleTag.textContent = ${JSON.stringify(content)};
      document.head.appendChild(styleTag);`;
    }
  }
  return content;
}

async function transformStyleContent(content, type) {
  let res = content;
  switch (type) {
    case "sass":
      res = sass.compileString(content, { styles: "compressed" }).css;
      break;
    case "less":
      res = await less.render(content, { compress: true }).then((result) => {
        // console.log("less res>>>", result.css);
        return result.css;
      });
      break;
  }
  return res;
}
