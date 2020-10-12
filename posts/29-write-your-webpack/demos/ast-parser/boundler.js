const fs = require("fs");
const { Parser } = require("acorn");

const content = fs.readFileSync("./src/index.js", "utf-8");
const ast = Parser.parse(content, {
  sourceType: "module",
});

console.log(ast);
