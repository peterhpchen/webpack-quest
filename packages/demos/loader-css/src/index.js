import _ from "lodash";
import css from "./style.css";

const demoName = "Loader CSS";

function style(cssString) {
  const element = document.createElement("style");

  element.innerHTML = cssString;

  return element;
}

function component() {
  const element = document.createElement("div");

  element.innerHTML = _.join(["Webpack Demo", demoName], ": ");
  element.classList.add("demo");

  return element;
}

document.head.appendChild(style(css.toString()));
document.body.appendChild(component());
