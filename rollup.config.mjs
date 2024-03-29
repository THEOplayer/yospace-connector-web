import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import fs from "fs";

const {version} = JSON.parse(fs.readFileSync("./package.json", "utf8"));

const fileName = "yospace-connector";
const globalName = "THEOplayerYospaceConnector";
const banner = `
/**
 * THEOplayer Yospace Connector v${version}
 */`.trim();

/**
 * @type {import("rollup").RollupOptions[]}
 */
const options = [{
    input: {
        [fileName]: "src/index.ts"
    },
    output: [
        {
            dir: "dist",
            entryFileNames: "[name].umd.js",
            name: globalName,
            format: "umd",
            indent: false,
            banner,
            globals: {THEOplayer: "THEOplayer"}
        },
        {
            dir: "dist",
            entryFileNames: "[name].esm.js",
            format: "esm",
            indent: false,
            banner
        }
    ],
    plugins: [
        nodeResolve({
            extensions: [".ts", ".js"]
        }),
        commonjs({
            include: "node_modules/**"
        }),
        typescript({
            tsconfig: "tsconfig.json",
            module: "es2015",
            include: ["src/**/*"]
        })
    ]
}, {
    input: {
        [fileName]: "src/index.ts"
    },
    output: [
        {
            dir: "dist",
            format: "esm",
            banner,
            footer: `export as namespace ${globalName};`
        }
    ],
    plugins: [
        dts({
            tsconfig: "tsconfig.json",
        })
    ]
}];
export default options;
