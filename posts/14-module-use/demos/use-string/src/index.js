import WebpackLogo from "./webpack-logo.png";

function logo(url) {
  const element = new Image();

  element.src = url;

  return element;
}

document.body.appendChild(logo(WebpackLogo));
