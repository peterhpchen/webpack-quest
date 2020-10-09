const component = () => {
  const result = document.createElement("div");
  result.innerHTML = "Caching ing";

  return result;
};

document.body.appendChild(component());
