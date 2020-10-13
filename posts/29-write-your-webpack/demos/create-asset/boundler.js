const fs = require("fs");
const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;

let ID = 0;

function createAsset(fileName) {
  const content = fs.readFileSync(fileName, "utf-8");
  const ast = parse(content, {
    sourceType: "module",
  });

  const dependencies = [];

  traverse(ast, {
    ImportDeclaration: ({ node }) => {
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
