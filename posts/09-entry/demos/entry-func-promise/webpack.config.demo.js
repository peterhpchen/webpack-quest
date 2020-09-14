module.exports = {
  entry: () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("./app/index.js");
      }, 5000);
    }),
};
