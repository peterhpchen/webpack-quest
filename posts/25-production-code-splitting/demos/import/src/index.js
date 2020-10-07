import _ from "lodash";

async function getComponent() {
  const element = document.createElement("div");

  const { default: demoName } = await import(
    /* webpackChunkName: 'demoName' */ "./demoName"
  );

  element.innerHTML = _.join(["Webpack Demo", demoName], ": ");

  return element;
}

getComponent().then((component) => {
  document.body.appendChild(component);
});
