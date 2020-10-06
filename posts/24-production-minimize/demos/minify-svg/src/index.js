import _ from "lodash";

import WebpackLogo from "./webpack-logo.svg";

const demoName = "Load Image By Url";

function logo(url) {
  const element = new Image();

  element.src = url;

  return element;
}

function component() {
  const element = document.createElement("div");

  element.innerHTML = _.join(["Webpack Demo", demoName], ": ");

  return element;
}

document.body.appendChild(logo(WebpackLogo));
document.body.appendChild(component());
