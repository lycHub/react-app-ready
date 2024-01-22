import { createFilter } from "rollup-pluginutils";
import { readFileSync } from "node:fs";
import { join, basename, dirname, extname } from "node:path";
import { parseReactRequest } from "./utils";
import compiler from "@vue/compiler-sfc";
import * as sass from "sass";
import { DefaultOptions } from "./help";

export default function reactSingle(options = {}) {
  const finalOptions = { ...DefaultOptions, ...options };
  // const filter = createFilter(options.include, options.exclude);
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
      if (finalOptions.ext.test(id)) {
        config.importerFilePath = from;
        const file = basename(id, extname(id));
        config.importFilePathMap?.set(file, id);
        // console.log("resolveId>>>", from);
        return id.replace(finalOptions.ext, ".tsx?react");
      }
      if (parseReactRequest(id).query.react) {
        return id;
      }
    },

    load(id) {
      const { query } = parseReactRequest(id);
      if (query.react) {
        return id;
      }
    },
    transform(id) {
      const { filename, query } = parseReactRequest(id);

      if (query.react) {
        const file = basename(id, extname(id));
        const path = join(
          dirname(config.importerFilePath),
          config.importFilePathMap?.get(file)
        );
        // console.log("命中>>>", path);
        try {
          const content = readFileSync(path).toString();
          // console.log("content>>>", content);
          const { parse } = compiler;
          const { descriptor, errors } = parse(content, {
            filename,
          });
          if (!errors.length) {
            const scriptContent = descriptor?.script.content || "";
            // console.log("filename>>", scriptContent, descriptor?.styles);
            const styles = genStyles(descriptor?.styles);
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

function genStyles(styles) {
  let content = "";
  if (styles.length) {
    styles.forEach((item) => {
      content += item.content;
    });
  }

  const res = sass.compileString(content, { styles: "compressed" });
  // .product-card{font-weight:bold;color:yellow;}
  if (content) {
    return `const styleTag = document.createElement('style');
    // styleTag.textContent = ".product-card{font-weight:bold;color:yellow;}";
    styleTag.textContent = ${JSON.stringify(res.css)};
    document.head.appendChild(styleTag);`;
  }
  return content;
}
