const component = () => {
  const result = document.createElement("div");
  result.innerHTML = "Caching";

  return result;
};

document.body.appendChild(component());
