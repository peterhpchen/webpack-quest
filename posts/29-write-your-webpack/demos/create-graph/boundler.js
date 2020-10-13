const fs = require("fs");
const path = require("path");
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

function createGraph(entry) {
  const graph = [createAsset(entry)];

  for (const asset of graph) {
    const dirname = path.dirname(asset.fileName);

    asset.dependencies.forEach((dependencyRelativePath) => {
      const dependencyAbsolutePath = path.join(dirname, dependencyRelativePath);
      const dependencyAsset = createAsset(dependencyAbsolutePath);
      graph.push(dependencyAsset);
    });
  }

  return graph;
}

console.log(createGraph("./src/index.js"));
