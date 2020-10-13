const fs = require("fs");
const path = require("path");
const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { transformFromAstSync } = require("@babel/core");

let ID = 0;

function createAsset(filename) {
  const content = fs.readFileSync(filename, "utf-8");
  const ast = parse(content, {
    sourceType: "module",
  });

  const dependencies = [];

  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value);
    },
  });

  const { code } = transformFromAstSync(ast, null, {
    presets: ["@babel/preset-env"],
  });

  const id = ID++;

  return {
    id,
    filename: filename,
    dependencies,
    code,
  };
}

function createGraph(entry) {
  const graph = [createAsset(entry)];

  for (const asset of graph) {
    asset.mapping = {};

    const dirname = path.dirname(asset.filename);

    asset.dependencies.forEach((dependencyRelativePath) => {
      const dependencyAbsolutePath = path.join(dirname, dependencyRelativePath);

      const dependencyAsset = createAsset(dependencyAbsolutePath);

      asset.mapping[dependencyRelativePath] = dependencyAsset.id;

      graph.push(dependencyAsset);
    });
  }

  return graph;
}

function bundle(graph) {
  let assets = "";

  graph.forEach((asset) => {
    assets += `${asset.id}: [
        function(module, exports, require) {
            ${asset.code}
        },
        ${JSON.stringify(asset.mapping)},
    ],`;
  });

  const result = `
    (function(modules) {
        function require(id) {
            const [fn, mapping] = modules[id];
            function localRequire(name) {
              return require(mapping[name]);
            }
            const module = { exports : {} };
            fn(module, module.exports, localRequire);
            return module.exports;
          }
          require(0);
    })({${assets}})
    `;

  return result;
}

const graph = createGraph("./src/index.js");
console.log(bundle(graph));
