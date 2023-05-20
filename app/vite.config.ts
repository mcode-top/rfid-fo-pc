import { rmSync } from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import electron from "vite-plugin-electron";
import renderer from "vite-plugin-electron-renderer";
import pkg from "./package.json";
import alias from "@rollup/plugin-alias";
import svgLoader from "vite-svg-loader";
import { exposeElectronTRPC } from "electron-trpc/main";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const distPath = path.join(__dirname, "./dist-electron");
  rmSync(distPath, { recursive: true, force: true });
  const isServe = command === "serve";
  const isBuild = command === "build";
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG;
  return {
    resolve: {
      alias: {
        "@": path.join(__dirname, "./src"),
        "~": path.join(__dirname, "./src/electron/main"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "@/assets/global.scss" as *;@use "@/assets/style/color.scss" as *;',
        },
      },
    },
    plugins: [
      vue(),
      svgLoader(),
      electron([
        {
          // Main-Process entry file of the Electron App.
          entry: "main/index.ts",
          onstart(options) {
            if (process.env.VSCODE_DEBUG) {
              console.log(
                /* For `.vscode/.debug.script.mjs` */ "[startup] Electron App"
              );
            } else {
              options.startup();
            }
          },
          vite: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: path.join(distPath, "main"),

              rollupOptions: {
                external: Object.keys(
                  "dependencies" in pkg ? pkg.dependencies : {}
                ),
                output: {},
                plugins: [
                  alias({
                    entries: [
                      {
                        find: "~",
                        replacement: path.join(__dirname, "./main"),
                      },
                    ],
                  }),
                ],
              },
            },
          },
        },
        {
          entry: "preload/index.ts",
          onstart(options) {
            // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
            // instead of restarting the entire Electron App.

            options.reload();
          },
          vite: {
            build: {
              sourcemap: sourcemap ? "inline" : undefined, // #332
              minify: isBuild,
              outDir: path.join(distPath, "preload"),
              rollupOptions: {
                external: Object.keys(
                  "dependencies" in pkg ? pkg.dependencies : {}
                ),
                plugins: [
                  alias({
                    entries: [
                      {
                        find: "@",
                        replacement: path.join(__dirname, "./src"),
                      },
                    ],
                  }),
                ],
              },
            },
          },
        },
      ]),
      // Use Node.js API in the Renderer-process
      renderer(),
    ],
    server:
      process.env.VSCODE_DEBUG &&
      (() => {
        const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL);
        return {
          host: url.hostname,
          port: +url.port,
        };
      })(),
    clearScreen: false,
  };
});
