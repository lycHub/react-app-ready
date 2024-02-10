import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import buildTime from "@app-ready/libs/plugins/time";
import Inspect from "vite-plugin-inspect";
import reactScopedCss from "react-scope-css-plugin";

export default defineConfig(({ command }) => {
  const isLocal = command === "serve";
  return {
    envDir: "envs",
    cacheDir: "../../node_modules/.vite",
    plugins: [Inspect(), reactScopedCss(), react(), buildTime()],
    server: {
      host: true,
      port: 8080,
      strictPort: true,
    },
    build: {
      outDir: "../../dist/mobile",
    },
    base: isLocal ? "/" : "/leads-plt-sales/",
  };
});
