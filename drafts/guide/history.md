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

## 模組系統

由於專案越趨龐大，沒有模組化的 JavaScript 在開發上遇到了瓶頸，也使開發者發想了許多模組化解決方案。

### Node.js 的 CJS (CommonJS)

Node.js 是 JavaScript 伺服器端的執行環境，使得 JavaScript 由前端跨至後端的領域，成為一個全端的程式語言。 Node.js 使用 CommonJS (簡稱 CJS) 規格實作模組系統，作為 JavaScript 語言的模塊化解決方案。

```js
// add.js
function add(a, b) {
  return a + b;
}

module.exports = add;
```

```js
// index.js
const add = require("./add");

console.log(add(1, 2));
// 3
```

- `module.exports` 導出模塊
- `require` 引入模塊
- 採取同步加載的方式
- 使用於後端，前端環境需經過轉譯

在檔案都在本地的後端環境下，同步加載的模組系統是可行的，但是在資源分散的前端環境下，為了增進效能，能擁有異步加載的模組系統是必須的。

### AMD (Asynchronous Module Definition) 與 require.js

require.js 做為前端模塊的解決方案，它實作了 Asynchronous Module Definition 規格，使模塊可以異步加載。

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Webpack Demo: Require.js</title>
    <script
      data-main="index"
      src="https://unpkg.com/requirejs@2.3.6/bin/r.js"
    ></script>
  </head>
  <body></body>
</html>
```

```js
// add.js
define(function () {
  return function (a, b) {
    return a + b;
  };
});
```

```js
// index.js
requirejs(["add"], function (add) {
  console.log(add(1, 2));
  // 3
});
```

- `define` 定義導出模塊
- `requirejs` 導入模塊，在加載完成後叫用 `callback` 函數，執行程式
- 採用異步加載方式
- 是以前端為目標環境的模組化方式

使用 require.js 後，我們終於可以在瀏覽器上以模組開發 JavaScript 。接著最後的一哩路就是原生的模組系統。

### ESM (ES Module)

ESM 是 ES2015 中定義的模組化語意所實作的模組系統，各瀏覽器實作了 ES2015 標準後，使得 ESM 成為 JavaScript 在前端的原生模組系統，將網頁前端帶入了模組的時代。

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Webpack Demo: ES Module</title>
    <script src="index.js" type="module"></script>
    <script src="add.js" type="module"></script>
  </head>
  <body></body>
</html>
```

```js
// add.js
export default function (a, b) {
  return a + b;
}
```

```js
// index.js
import add from "./add.js";

console.log(add(1, 2));
// 3
```

- `export` 導出模塊
- `import` 導入模塊
- 異步加載模塊
- 瀏覽器原生語意

雖然瀏覽器擁有了原生的模塊系統，但是前端環境受制於終端程式的實作程度，並不是全部都已經支援 ESM 。而因為歷史的關係， JavaScript 的模組實作方式多樣(CJS, AMD, ESM) ，這也造成模組整合的困難。

##  新的語言

## 參考資料

- https://zh.wikipedia.org/wiki/Node.js
- https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm
- https://juejin.im/post/6844903917680066567
- https://blog.risingstack.com/node-js-at-scale-module-system-commonjs-require/
- https://requirejs.org/
- https://github.com/volojs/create-template
