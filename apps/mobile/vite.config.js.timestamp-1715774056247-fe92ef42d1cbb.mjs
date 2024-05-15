// vite.config.js
import { defineConfig } from "file:///D:/codes/react-app-ready/node_modules/vite/dist/node/index.js";
import react from "file:///D:/codes/react-app-ready/node_modules/@vitejs/plugin-react/dist/index.mjs";
import buildTime from "file:///D:/codes/react-app-ready/apps/libs/plugins/time.js";
import Inspect from "file:///D:/codes/react-app-ready/node_modules/vite-plugin-inspect/dist/index.mjs";
import autoDts from "file:///D:/codes/react-app-ready/apps/request-to-dts-plugin/index.js";
var vite_config_default = defineConfig(({ command }) => {
  const isLocal = command === "serve";
  return {
    envDir: "envs",
    cacheDir: "../../node_modules/.vite",
    plugins: [Inspect(), autoDts(), react(), buildTime()],
    server: {
      host: true,
      port: 8080,
      strictPort: true
    },
    build: {
      outDir: "../../dist/mobile"
    },
    base: isLocal ? "/" : "/leads-plt-sales/"
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2Rlc1xcXFxyZWFjdC1hcHAtcmVhZHlcXFxcYXBwc1xcXFxtb2JpbGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNvZGVzXFxcXHJlYWN0LWFwcC1yZWFkeVxcXFxhcHBzXFxcXG1vYmlsZVxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY29kZXMvcmVhY3QtYXBwLXJlYWR5L2FwcHMvbW9iaWxlL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgYnVpbGRUaW1lIGZyb20gXCJAYXBwLXJlYWR5L2xpYnMvcGx1Z2lucy90aW1lXCI7XHJcbmltcG9ydCBJbnNwZWN0IGZyb20gXCJ2aXRlLXBsdWdpbi1pbnNwZWN0XCI7XHJcbmltcG9ydCBhdXRvRHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1yZXF1ZXN0LXRvLWR0c1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQgfSkgPT4ge1xyXG4gIGNvbnN0IGlzTG9jYWwgPSBjb21tYW5kID09PSBcInNlcnZlXCI7XHJcbiAgcmV0dXJuIHtcclxuICAgIGVudkRpcjogXCJlbnZzXCIsXHJcbiAgICBjYWNoZURpcjogXCIuLi8uLi9ub2RlX21vZHVsZXMvLnZpdGVcIixcclxuICAgIHBsdWdpbnM6IFtJbnNwZWN0KCksIGF1dG9EdHMoKSwgcmVhY3QoKSwgYnVpbGRUaW1lKCldLFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIGhvc3Q6IHRydWUsXHJcbiAgICAgIHBvcnQ6IDgwODAsXHJcbiAgICAgIHN0cmljdFBvcnQ6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgb3V0RGlyOiBcIi4uLy4uL2Rpc3QvbW9iaWxlXCIsXHJcbiAgICB9LFxyXG4gICAgYmFzZTogaXNMb2NhbCA/IFwiL1wiIDogXCIvbGVhZHMtcGx0LXNhbGVzL1wiLFxyXG4gIH07XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXdTLFNBQVMsb0JBQW9CO0FBQ3JVLE9BQU8sV0FBVztBQUNsQixPQUFPLGVBQWU7QUFDdEIsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sYUFBYTtBQUVwQixJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLFFBQVEsTUFBTTtBQUMzQyxRQUFNLFVBQVUsWUFBWTtBQUM1QixTQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixVQUFVO0FBQUEsSUFDVixTQUFTLENBQUMsUUFBUSxHQUFHLFFBQVEsR0FBRyxNQUFNLEdBQUcsVUFBVSxDQUFDO0FBQUEsSUFDcEQsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sWUFBWTtBQUFBLElBQ2Q7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxJQUNWO0FBQUEsSUFDQSxNQUFNLFVBQVUsTUFBTTtBQUFBLEVBQ3hCO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
