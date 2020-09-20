// import style from "style-loader!css-loader?modules!./style.css"; // query paramter
// import style from "style-loader!css-loader?modules=true!./style.css"; // query parameter
import style from 'style-loader!css-loader?{"modules":true}!./style.css'; // JSON object

function addClass(id, targetClass) {
  const app = document.getElementById(id);
  app.classList.add(targetClass);
}

addClass("app", style.demo);
