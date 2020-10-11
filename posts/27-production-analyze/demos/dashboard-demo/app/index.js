function component(content) {
  const result = document.createElement("div");
  result.innerHTML = content;

  return result;
}

import("./demoName").then((demoName) => {
  conponent(`Webpack Demo:${demoName}`);
});
