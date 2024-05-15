import bodyParser from "body-parser";
import axios from "axios";
import { compact, kebabCase } from "lodash-es";
import { ensureFile, outputFile, pathExists } from "fs-extra";
import { join } from "node:path";
import { isObj, isArray, getDirname } from "./utils.js";

const DefaultOptions = {
  outputDir: "/quick-dts",
};

export default (options = {}) => {
  const finalOptions = { ...DefaultOptions, ...options };

  return {
    name: "vite-plugin-request-to-dts",
    apply: "serve",
    configureServer(server) {
      return () => {
        server.middlewares.use(bodyParser.urlencoded({ extended: false }));
        server.middlewares.use(bodyParser.json());
        server.middlewares.use("/auto-dts", async (req, res, next) => {
          const { transformRequest, transformResponse, ...rest } = req.body;
          const requestConfig = {};
          for (const attr in rest) {
            if (Object.hasOwn(rest, attr)) {
              // console.log("hasown attr>>>", attr);
              requestConfig[attr] = rest[attr];
            }
          }
          console.log("server>>", requestConfig.url);
          const tfReq = compact(transformRequest);
          const tfRes = compact(transformResponse);
          if (tfReq.length) {
            requestConfig.transformRequest = tfReq;
          }
          if (tfRes.length) {
            requestConfig.transformResponse = tfRes;
          }
          try {
            const res = await axios.request(requestConfig);

            if (isObj(res.data) || isArray(res.data)) {
              const key =
                finalOptions.customUniqKey?.(requestConfig.url) ||
                getKey(requestConfig.url);
              console.log("to dts>>>", key);
              const destPath = join(
                getDirname(),
                finalOptions.outputDir,
                `${key}.ts`
              );
              const isExit = await pathExists(destPath);
              if (!isExit) {
                await outputFile(destPath, "hello!");
              }
            }
          } catch (error) {
            console.error("axios error>>>", error);
          } finally {
            res
              .setHeader("Content-Type", "text/plain; charset=utf-8")
              .end("Auto gen dts over!");
            next();
          }
        });
      };
    },
  };
};

function getKey(pathname) {
  return kebabCase(pathname);
}
