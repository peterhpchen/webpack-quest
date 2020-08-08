import _ from "lodash";
import style from "./style.css";

const demoName = "CSS Module";

function component() {
  const element = document.createElement("div");

  element.innerHTML = _.join(["Webpack Demo", demoName], ": ");
  element.classList.add(style.demo);

  return element;
}

document.body.appendChild(component());
