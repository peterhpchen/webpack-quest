import _ from "lodash";

const demoName = "Source Map";

function component() {
  const element = document.createElement("div");

  element.innerHTML = _.join(["Webpack Demo", demoName], ": ");

  return element;
}

document.body.apendChild(component());
