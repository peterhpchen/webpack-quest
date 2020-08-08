import _ from "lodash";
import "style-loader!css-loader!./style.css";

const demoName = "Loader Style(Inline)";

function component() {
  const element = document.createElement("div");

  element.innerHTML = _.join(["Webpack Demo", demoName], ": ");
  element.classList.add("demo");

  return element;
}

document.body.appendChild(component());
