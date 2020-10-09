import _ from "lodash";
// import alpha from './alpha.js'
import beta from "./beta.js";

const component = () => {
  const result = document.createElement("div");
  result.innerHTML = _.join([/*alpha,*/ beta]);

  return result;
};

document.body.appendChild(component());
