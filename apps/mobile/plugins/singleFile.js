export default function reactSingle() {
  return {
    name: "vite-plugin-react-single",
    config(config, { command }) {
      console.log("这里是config钩子");
    },

    configResolved(resolvedConfig) {
      console.log("这里是configResolved钩子");
    },

    configureServer(server) {
      console.log("这里是configureServer钩子");
    },
    resolveId(id) {
      console.log("这里是resolveId", id);
    },
    load(id) {
      console.log("这里是load", id);
    },
  };
}
