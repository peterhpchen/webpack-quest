const fs = require("fs");

fs.readFile("./src/index.js", "utf-8", (err, content) => {
  console.log(content);
});
