const fs = require("fs");
const path = require("path");
const { Parser } = require("acorn");
const { simple } = require("acorn-walk");
const { transformSync } = require("@babel/core");

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

  const { code } = transformSync(content, {
    presets: ["@babel/preset-env"],
  });

  return {
    id,
    filename: filename,
    dependencies,
    code,
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
