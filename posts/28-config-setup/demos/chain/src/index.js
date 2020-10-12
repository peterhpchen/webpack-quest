import demoName from "./demoName";

const component = (content) => {
  const result = document.createElement("div");
  result.innerHTML = content;
};

document.body.appendChild(component(demoName));
