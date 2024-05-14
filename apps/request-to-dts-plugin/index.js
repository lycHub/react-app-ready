import bodyParser from "body-parser";
import axios from "axios";
import { isObj } from "./utils.js";

const DefaultOptions = {};

export default (options = {}) => {
  const finalOptions = { ...DefaultOptions, ...options };

  return {
    name: "vite-plugin-request-to-dts",
    apply: "serve",
    configureServer(server) {
      return () => {
        console.log("configureServer run>>>>");
        server.middlewares.use(bodyParser.urlencoded({ extended: false }));
        server.middlewares.use(bodyParser.json());
        server.middlewares.use("/auto-dts", (req, res, next) => {
          const config = req.body;
          const url = config.baseURL + config.url;
          // console.log("server>>", url);

          axios
            .request({
              url,
              params: config.params,
              data: config.data,
              headers: config.headers,
            })
            .then((res) => {
              /* console.log(
                "axios res 333>>>",
                res.data
              ); */
              if (isObj(res.data)) {
                const urlParser = new URL(url);
                console.log("to dts", urlParser);
              }
            })
            .catch((error) => {
              console.error("axios error>>>", error);
            });
          next();
        });
      };
    },
  };
};
