import bodyParser from "body-parser";
import { outputFile, pathExists } from "fs-extra";
import { join } from "node:path";
import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
} from "quicktype-core";
import { isObj, isArray, getDirname, isJsonString } from "./utils.js";
import { Plugin } from "vite";

interface Options {
  outputDir: string;
  cover: boolean;
  routePath: string;
}

const DefaultOptions: Options = {
  outputDir: "/quick-dts",
  cover: false,
  routePath: "/gen-dts",
};

export default (options?: Partial<Options>): Plugin => {
  const finalOptions = { ...DefaultOptions, ...options };
  let root = getDirname();
  return {
    name: "vite-plugin-res-to-dts",
    apply: "serve",
    configResolved(config) {
      // console.log("configResolved>>>", config.root);
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

            // @ts-expect-error valid
            const data = req.body as any;

            const errMsg = validData(data);
            if (errMsg) {
              console.error("Gen dts error: ", errMsg);
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
              const content = Object.values(data)[0] as Record<string, unknown>;
              const result = await genType(content);
              // console.log("quicktype res>>>", result);
              if (result) {
                await outputFile(destPath, result, {
                  flag: "a",
                });
                console.log("Gen dts>>>", "Gen dts file success");
              } else {
                console.error("Gen dts error>>>", "Gen dts file failed");
              }
            } catch (error) {
              console.error("Gen dts error>>>", error);
            } finally {
              end();
            }
          }
        );
      };
    },
  };
};

function validData(data: unknown) {
  let errMsg = "";
  const jsonData = isJsonString(data);
  if (!jsonData) {
    errMsg = "data must be a json";
  }

  if (!isObj(jsonData)) {
    errMsg = "data must be an object";
  }
  const value = Object.values(jsonData)[0];

  if (!isObj(value) && !isArray(value)) {
    errMsg = "value must be an object or an array";
  }

  return errMsg;
}

async function genType(data: Record<string, unknown>) {
  const jsonInput = jsonInputForTargetLanguage("ts");

  await jsonInput.addSource({
    name: "dts",
    samples: [JSON.stringify(data)],
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  const { lines } = await quicktype({
    inputData,
    lang: "ts",
    rendererOptions: {
      "just-types": "true",
    },
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
