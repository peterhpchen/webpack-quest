# 前端工程的發展

網頁在剛開始被發明出來時，並不像現在擁有如此豐富的功能，因此網頁相關的語言（HTML, JavaScript, CSS）就被設計得較為單純。如果只是一般的後端語言，就可以進行快速的迭代更新，加入新的語意，使其符合現代化工程的水平，但網頁語言需要受限於瀏覽器的更新，而各家的瀏覽器標準的解釋及開發時程都不相同，造成需多相容性的問題，加上之前 IE 的獨大，造就許多非標準的語意出現，那時的網頁工程處於混沌的時代。

現代前端工程得益於 ES2015, HTML5, CSS3 標準的成熟， IE 的市佔率被新興的瀏覽器 Chrome, Firefox, Edge 超越，前端技術逐漸趨於穩定，並且出現了 Electron 以及 React Native 這類的框架，使得前端工程跨出了瀏覽器到了本地端及移動端上，其重要性大大的增加，造就了整個前端蓬勃的發展。

在整個網頁的歷史中，許多天賦異稟的人或是群體將原本一片混亂的前端工程帶向了新的藍海。本系列要介紹的 webpack ，就是在這樣混沌的環境中，被無數的匠人所打磨並造就出來的大船，帶領無數的人在這前端工程的大海中航行。

本文將帶讀者回到 webpack 被造時的那個年代，以解釋時代背景的方式讓讀者了解當時遇到了哪些問題促使了 webpack 的誕生。

## 沒有模組的 JavaScript

在 webpack 這類的工具出現之前，開發者會直接在 `html` 檔案中藉由 `<script>`, `<link>` 標籤引入 JavaScript 以及 CSS 檔案:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Webpack Demos: Before Webpack</title>
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.20/lodash.min.js"></script>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <script src="./index.js"></script>
  </body>
</html>
```

在早期網頁的標準相對陽春的時代，這樣子處理是沒有問題的，我們甚至不需要引入外部 js 及 css ，直接寫在 `html` 中就好了。

但是隨著網頁技術越趨成熟，越來越多的功能被加入，前端的規模變大，原本不明顯的問題慢慢浮現。

由於最初在設計 JavaScript 時， 其目標並不是程式語言而是以腳本語言為方向所發明的。因此沒有模組相關的語意概念，而日益龐大的代碼量使其出現了許多的問題。

### 變數衝突

以前，我們會藉由將變數放到 `window` 這個全域物件裡，使其他的 script 可以使用目標的變數。我們可以在 lodash, JQuery 之類的庫中看到這樣的注入方式。

這時候如果其他的 script 覆蓋了 window 中的變數，問題就會發生：

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Webpack Demos: Before Webpack</title>
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.20/lodash.min.js"></script>
    <!-- window._ === lodash library -->
    <script>
      _ = "wrong lodash";
    </script>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <script src="./index.js"></script>
  </body>
</html>
```

```
Uncaught TypeError: _.join is not a function
```

### 不明確的引入

由於依賴的目標庫是注入到全域物件中，因此在要引用的 `js` 中只能假設目標是存在的：

```js
const demoName = "Before Webpack";

function component() {
  const element = document.createElement("div");

  // assume _ is exist
  element.innerHTML = _.join(["Webpack Demo", demoName], ": ");
  element.classList.add("demo");

  return element;
}

document.body.appendChild(component());
```

### 引入順序

腳本語言是由上而下執行的， JavaSctipt 也不例外，而由於都只是注入 `window` ，並沒有實際的相依關係，因此依賴的順序只能靠開發者手動調整，只要引入順序有誤，就會造成問題:

```html
<head>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  <!-- error -->
  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
</head>
```

```
Uncaught ReferenceError: jQuery is not defined
```

###  引入不必要的程式碼

有的時候我們會引入外部庫去嘗試它的功能，但發現不符合需求就將檔案中相關的程式刪除，這時常常會忘記也去刪除 `<script>` 標籤，這時我們就會引入不必要的程式碼，增加載入的時間。

### 載入多個檔案

大部分的專案都會引入第三方的庫或是框架來減少開發的負擔，但這樣做會增加要引入的檔案，造成請求次數增加，拖慢效能。

## 第三方的模組化

由於專案越趨龐大，沒有模組化的 JavaScript 在開發上遇到了瓶頸，也使許多模組化解決方案展露頭角。

### Node.js 的 CommonJS
