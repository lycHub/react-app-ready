import bodyParser from "body-parser";
import { outputFile, pathExists } from "fs-extra";
import { join } from "node:path";
import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
} from "quicktype-core";
import { isObj, isArray, getDirname } from "./utils.js";

const DefaultOptions = {
  outputDir: "/quick-dts",
  cover: false,
  routePath: "/gen-dts",
};

export default (options = {}) => {
  const finalOptions = { ...DefaultOptions, ...options };
  let root = getDirname();
  return {
    name: "vite-plugin-res-to-dts",
    apply: "serve",
    configResolved(config) {
      console.log("configResolved>>>", config.root);
      root = config.root;
    },
    configureServer(server) {
      return () => {
        server.middlewares.use(bodyParser.urlencoded({ extended: false }));
        server.middlewares.use(bodyParser.json());
        server.middlewares.use(
          finalOptions.routePath,
          async (req, res, next) => {
            const end = () => {
              res
                .setHeader("Content-Type", "text/plain; charset=utf-8")
                .end("Auto gen dts over!");
              next();
            };

            const data = req.body;
            // console.log("data>>>", data);

            const errMsg = validData(data);
            if (errMsg) {
              console.log("request-to-dts error: ", errMsg);
              end();
              return;
            }

            const key = Object.keys(data)[0];
            const destPath = join(root, finalOptions.outputDir, `${key}.ts`);

            if (!finalOptions.cover) {
              const isExit = await pathExists(destPath);
              if (isExit) {
                end();
                return;
              }
            }

            try {
              const content = Object.values(data)[0];
              const result = await genType(content);
              // console.log("quicktype res>>>", result);
              if (result) {
                await outputFile(destPath, result, {
                  flag: "a",
                });
              }
            } catch (error) {
              console.error("axios error>>>", error);
            } finally {
              end();
            }
          }
        );
      };
    },
  };
};

function validData(data) {
  let errMsg = "";
  if (!isObj(data)) {
    errMsg = "data must be an object";
  }
  const value = Object.values(data)[0];

  if (!isObj(value) && !isArray(value)) {
    errMsg = "value must be an object or an array";
  }

  return errMsg;
}

async function genType(data) {
  const jsonInput = jsonInputForTargetLanguage("TypeScript");

  // We could add multiple samples for the same desired
  // type, or many sources for other types. Here we're
  // just making one type from one piece of sample JSON.
  await jsonInput.addSource({
    name: "dts",
    samples: [JSON.stringify(data)],
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  const { lines } = await quicktype({
    inputData,
    lang: "TypeScript",
  });
  if (lines?.length) {
    let str = "";

    for (const line of lines) {
      str += `${line}\r\n`;
    }
    return str;
  }

  return "";
}
