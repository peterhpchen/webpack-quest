import _ from "lodash";

function component(content) {
  const result = document.createElement("div");
  result.innerHTML = content;

  return result;
}

import("./demoName").then((demoName) => {
  conponent(_.join(["Webpack Demo", demoName], ":"));
});
