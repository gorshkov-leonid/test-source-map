const fs = require("fs");
const path = require("path");

const ASSETS_FOLDER = "./src/generated-assets";
const STYLE_PATH = ASSETS_FOLDER + "/monaco.less";
const LESS_CONTENT_HEADER = "// see https://github.com/TypeFox/monaco-languageclient/blob/master/examples/browser/webpack.config.js";

if (!fs.existsSync(ASSETS_FOLDER)) {
    fs.mkdirSync(ASSETS_FOLDER);
}

function walk(directory: string, filter: (file: string) => boolean) {
    let fileList: string[] = [];
    const files = fs.readdirSync(directory);
    for (const file of files) {
        let p = path.join(directory, file);
        if ((fs.statSync(p)).isDirectory()) {
            fileList = [...fileList, ...(walk(p, filter))];
        } else {
            if (!filter(file)) {
                continue;
            }
            p = p.replace(/\\/g, "/");
            fileList.push(p);
        }
    }
    return fileList;
}

let cssFiles = walk("./node_modules/monaco-editor/esm/vs/", (file) => /.*css$/.test(file));
fs.writeFileSync(
    STYLE_PATH,
    LESS_CONTENT_HEADER +
    cssFiles
        .map(f => f.replace(/^node_modules\//g, "~"))
        .map(f => "@import (inline) \"" + f + "\";")
        .join("\n")
);
console.log("Monaco style generated: " + STYLE_PATH)

let ttfFiles = walk("./node_modules/monaco-editor/esm/vs/", (file) => /.*ttf$/.test(file));
ttfFiles.forEach(file => {
    const targetPath = ASSETS_FOLDER + "/" + path.basename(file);
    fs.copyFileSync(file, targetPath)
    console.log("Monaco font copied: " + targetPath)
})



