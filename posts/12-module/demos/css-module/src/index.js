import style from "./style.css";

function addClass(id, targetClass) {
  const app = document.getElementById(id);
  app.classList.add(targetClass);
}

addClass("app", style.demo);
