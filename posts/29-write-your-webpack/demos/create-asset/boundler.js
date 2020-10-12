const fs = require("fs");
const { Parser } = require("acorn");
const { simple } = require("acorn-walk");

let ID = 0;

function createAsset(fileName) {
  const content = fs.readFileSync(fileName, "utf-8");
  const ast = Parser.parse(content, {
    sourceType: "module",
  });

  const dependencies = [];

  simple(ast, {
    ImportDeclaration: (node) => {
      dependencies.push(node.source.value);
    },
  });

  const id = ID++;

  return {
    id,
    fileName,
    dependencies,
  };
}

console.log(createAsset("./src/index.js"));
