const fs = require("fs");

const content = fs.readFileSync("./src/index.js", "utf-8");

console.log(content);
