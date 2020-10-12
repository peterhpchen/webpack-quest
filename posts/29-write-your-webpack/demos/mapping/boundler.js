const fs = require("fs");
const path = require("path");
const { Parser } = require("acorn");
const { simple } = require("acorn-walk");

function createAsset(filename, id) {
  const content = fs.readFileSync(filename, "utf-8");
  const ast = Parser.parse(content, {
    sourceType: "module",
  });

  const dependencies = [];

  simple(ast, {
    ImportDeclaration: (node) => {
      dependencies.push(node.source.value);
    },
  });

  return {
    id,
    filename: filename,
    dependencies,
  };
}

function createGraph(entry) {
  let id = 0;
  const graph = [createAsset(entry, id++)];

  for (const asset of graph) {
    asset.mapping = {};

    const dirname = path.dirname(asset.filename);

    asset.dependencies.forEach((dependencyRelativePath) => {
      const dependencyAbsolutePath = path.join(dirname, dependencyRelativePath);

      const dependencyAsset = createAsset(dependencyAbsolutePath, id++);

      asset.mapping[dependencyAsset.filename] = dependencyAsset.id;

      graph.push(dependencyAsset);
    });
  }

  return graph;
}

console.log(createGraph("./src/index.js"));
