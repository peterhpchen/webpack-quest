import _ from "lodash";

const demoName = "Watch Mode";

function component() {
  const element = document.createElement("div");

  element.innerHTML = _.join(["Webpack Demo", demoName], ": ");

  return element;
}

document.body.apendChild(component());
