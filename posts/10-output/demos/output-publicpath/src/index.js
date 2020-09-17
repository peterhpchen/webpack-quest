async function getString() {
  const { default: hello } = await import("./hello.js");

  return hello;
}

getString().then((str) => {
  console.log(str);
});
