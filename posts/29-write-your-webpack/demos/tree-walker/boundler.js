const fs = require("fs");
const { Parser } = require("acorn");
const { simple } = require("acorn-walk");

const content = fs.readFileSync("./src/index.js", "utf-8");
const ast = Parser.parse(content, {
  sourceType: "module",
});

simple(ast, {
  ImportDeclaration: (node) => {
    console.log(node);
  },
});
