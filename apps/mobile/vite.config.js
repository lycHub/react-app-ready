import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import buildTime from "@app-ready/libs/plugins/time";
import reactSingle from "./plugins/singleFile";

export default defineConfig(({ command }) => {
  const isLocal = command === "serve";
  return {
    envDir: "envs",
    cacheDir: "../../node_modules/.vite",
    plugins: [reactSingle(), react(), buildTime()],
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
