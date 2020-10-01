import _ from "lodash";
import demoName from "./demoName";

function component() {
  const element = document.createElement("div");

  element.innerHTML = _.join(["Webpack Demo", demoName], ": ");

  return element;
}

let element = component();

document.body.appendChild(element);

if (module.hot) {
  module.hot.accept("./demoName", function () {
    console.log("Accepting the updated demoName module!");
    console.log(demoName);

    document.body.removeChild(element);

    element = component();

    document.body.appendChild(element);
  });
}
