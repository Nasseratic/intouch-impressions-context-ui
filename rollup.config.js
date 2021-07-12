import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import css from "rollup-plugin-css-only";
import replace from "@rollup/plugin-replace";

require("dotenv").config();

const production = !process.env.ROLLUP_WATCH;

const SUB_KEY = process.env.SUB_KEY;
const STG_SUB_KEY = process.env.SUB_KEY;
const PLACES_ASSETS_URL = process.env.PLACES_ASSETS_URL;
const STG_PLACES_ASSETS_URL = process.env.STG_PLACES_ASSETS_URL;
const IMPRESSIONS_REPORT_URL = process.env.IMPRESSIONS_REPORT_URL;
const STG_IMPRESSIONS_REPORT_URL = process.env.STG_IMPRESSIONS_REPORT_URL;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn(
        "npm",
        ["run", "start", "--", "--dev"],
        {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        }
      );

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/build/bundle.js",
  },
  plugins: [
    svelte({
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
    }),

    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: "bundle.css" }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      preferBuiltins: false,
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
    replace({
      include: "src/**",
      // 2 level deep object should be stringify
      process: JSON.stringify({
        env: {
          IMPRESSIONS_REPORT_URL,
          STG_IMPRESSIONS_REPORT_URL,
          PLACES_ASSETS_URL,
          STG_PLACES_ASSETS_URL,
          SUB_KEY,
          STG_SUB_KEY,
        },
      }),
    }),
  ],
  watch: {
    clearScreen: false,
  },
};
