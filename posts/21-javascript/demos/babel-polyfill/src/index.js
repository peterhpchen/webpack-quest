const add = (a, b) => {
  // ES2015: Arrow Function
  return a + b;
};

const addAsync = (a, b) =>
  new Promise((resolve, reject) => {
    resolve(a + b);
  });

export default {
  add,
  addAsync,
};
