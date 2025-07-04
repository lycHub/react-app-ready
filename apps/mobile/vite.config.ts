import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Inspect from "vite-plugin-inspect";
import autoDts from "vite-plugin-res-to-dts";
import iconify from "./vite-plugin-iconify";

export default defineConfig(({ command }) => {
  const isLocal = command === "serve";
  return {
    envDir: "envs",
    cacheDir: "../../node_modules/.vite",
    plugins: [Inspect(), react(), iconify(), autoDts()],
    server: {
      host: true,
      port: 8000,
      strictPort: true,
    },
    build: {
      outDir: "../../dist/mobile",
    },
    base: isLocal ? "/" : "/leads-plt-sales/",
  };
});
