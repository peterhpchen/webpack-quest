import "../web_modules/core-js/modules/es.promise.js";
import _ from "../web_modules/lodash.js";
import demoName from "./demoName.js";

var sayHi = (name) => {
  new Promise((resolve) => {
    console.log(_.join(["Hi", name], " "));
    resolve();
  });
};

sayHi(demoName);
