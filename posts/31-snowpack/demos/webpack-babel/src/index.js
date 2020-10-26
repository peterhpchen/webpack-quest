import "core-js/modules/es.promise.js";
import _ from "lodash";
import demoName from "./demoName.js";

const sayHi = (name) => {
  new Promise((resolve) => {
    console.log(_.join(["Hi", name], " "));
    resolve();
  });
};

sayHi(demoName);
