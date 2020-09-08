import _ from "lodash";

import WebpackLogo from "file-loader!./webpack-logo.png";

const demoName = "Copy HTML";

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
