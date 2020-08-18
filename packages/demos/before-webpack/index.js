const demoName = "Before Webpack";

function component() {
  const element = document.createElement("div");

  // assume _ is exist
  element.innerHTML = _.join(["Webpack Demo", demoName], ": ");
  element.classList.add("demo");

  return element;
}

document.body.appendChild(component());
