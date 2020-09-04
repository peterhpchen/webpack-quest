# 前端工程的發展

網頁在剛開始被發明出來時，並不像現在擁有如此豐富的功能，因此網頁相關的語言（HTML, JavaScript, CSS）就被設計得較為單純。如果只是一般的後端語言，就可以進行快速的迭代更新，加入新的語意，使其符合現代化工程的水平，但網頁語言需要受限於瀏覽器的更新，而各家的瀏覽器標準的解釋及開發時程都不相同，造成需多相容性的問題，加上之前 IE 的獨大，造就許多非標準的語意出現，那時的網頁工程處於混沌的時代。

現代前端工程得益於 ES2015, HTML5, CSS3 標準的成熟， IE 的市佔率被新興的瀏覽器 Chrome, Firefox, Edge 超越，前端技術逐漸趨於穩定，並且出現了 Electron 以及 React Native 這類的框架，使得前端工程跨出了瀏覽器到了本地端及移動端上，其重要性大大的增加，造就了整個前端蓬勃的發展。

在整個網頁的歷史中，許多天賦異稟的人或是群體將原本一片混亂的前端工程帶向了新的藍海。本系列要介紹的 webpack ，就是在這樣混沌的環境中，被無數的匠人所打磨並造就出來的大船，帶領無數的人在這前端工程的大海中航行。

本文將帶讀者回到 webpack 被造時的那個年代，以解釋時代背景的方式讓讀者了解當時遇到了哪些問題促使了 webpack 的誕生。

## 各環境對於語言支援度不一

前端須仰賴各家瀏覽器對於規格的實作，但是支援度會因為不同的瀏覽器而有所不同，因此前端在開發上需要對目標環境做支援度的確認才能使用較新的語法，增加了開發者的負擔。

### Babel

JavaScript 規格名為 ECMA-262 (以此規格實作的語言名為 ECMAScript)，由 Ecma International 所制定，目前每年會出一個新的版本。但是在各家瀏覽器上，新語法的相容性並不一致，Babel 借助轉譯器以及 Polyfill 將新語法轉為目標環境可以讀懂的舊語法。

使用了 Babel 後，開發者可以使用新語法進行開發，在部署前利用 Babel 轉譯為目標瀏覽器可支援的語法，使各個功能可以在目標環境中正常執行。

```js
const add = (a, b) => {
  // ES2015: Arrow Function
  return a + b;
};

console.log(add(1, 2));
// 3
```

會轉譯為：

```js
"use strict";

var add = function add(a, b) {
  // ES5
  return a + b;
};

console.log(add(1, 2)); // 3
```

### PostCSS

CSS 的標準是由 W3C 所制定，與 JavaScript 同樣因不同的環境相容性問題，因此需要轉譯器以確保可以執行在目標環境中。

PostCSS 使用 JavaScript 來轉換 CSS 。依據使用的 Plugin 的功能，可以對 CSS 做不同的處理。

其中 [postcss-preset-env](https://preset-env.cssdb.org/) Plugin 可以將開發者的 CSS 新語法轉換為目標瀏覽器可以辨識的舊語法。

```css
/* https://www.w3.org/TR/css-variables-1/ */
:root {
  --demoColor: blue;
}

.demo {
  color: var(--demoColor);
}
```

會轉譯為：

```css
:root {
  --demoColor: blue;
}

.demo {
  color: blue;
  color: var(--demoColor);
}
```

## JavaScript 的弱型別特性

JavaScript 的弱型別性質使得開發者可以快速的開發小型的專案，但這樣的便利性也很容易產生 Bug 。

例如像是下面這例子：

```js
const add = (a, b) => {
  return a + b;
};

console.log(add("I", 2));
// I2
```

 我們期望 `add` 是輸入兩個數字，但如果使用者輸入了字串， JavaScript 並不會出錯，造成了 Bug 的產生。

為了解決 JavaScript 型別問題， 出現了 TypeScript, flow 這類的 JavaScript 超集語言。

### TypeScript

TypeScript 由微軟開發，是目前最流行的 JavaScript 超集，它支援靜態型別檢查，使其可以在開發階段發現型別問題，而不用等到執行時才發現錯誤。

```ts
function add(a: number, b: number): number {
  return a + b;
}

console.log(add("I", 2));
// Argument of type '"I"' is not assignable to parameter of type 'number'.
```

> 除了 TypeScript ， Flow 也是個 JavaScript 強型別的解決方案。

## CSS 語意過於簡單

CSS 的語法是由多個選擇器搭配屬性定義的規則所組成，使用起來就像是寫一個清單一樣，簡單易懂。

CSS 的清單式語意，語法單純，使開發者很容易可以入門。

但是在開發大型專案時，結構死板的 CSS 會遇到無法復用規則而必須一再重複定義的問題。

為解決這個問題，各路大神開發了 CSS 預處理器，為 CSS 增加了好用的語法，使用預處理器的語法做開發，然後編譯為原生的 CSS ，使其可以跑在瀏覽器上。

### SASS

這裡介紹其中一個 CSS 預處理器：SASS，它使得 CSS 可以使用 Variables, Mixins, Extend/Inheritance 及 Nesting 等豐富的功能。

```scss
// Variables
$demoColor: blue;
$exampleColor: green;

// Mixins
@mixin color($color) {
  border-color: $color;
  color: $color;
}

// Extend/Inheritance
%boreder-shared {
  border-radius: 30px;
}

.demo {
  // Nesting
  .demo__input {
    @extend %boreder-shared;
    @include color($demoColor);
  }
}

.example {
  // Nesting
  .example__input {
    @extend %boreder-shared;
    @include color($exampleColor);
  }
}
```

它會被轉譯為：

```css
.example .example__input,
.demo .demo__input {
  border-radius: 30px;
}

.demo .demo__input {
  border-color: blue;
  color: blue;
}

.example .example__input {
  border-color: green;
  color: green;
}

/*# sourceMappingURL=style.css.map */
```

> 除了 SASS 外，還有像是 [LESS](http://lesscss.org/), [Stylus](https://stylus-lang.com/) 等預處理器。

## HTML 是靜態的

HTML 負責定義網頁的元素配置，在靜態網頁中，由於資料是固定的，因此可以依靠一份靜態的 HTML 定義頁面的結構，但是對於資料是由後端取回的網頁來講，只能依靠 JavaScript 動態的改變頁面上的元素，做到顯示資料的目的，這樣子 HTML 檔案就不能完全反應當前網頁的狀況，需要去追查 JavaScript 的代碼，才能知道目前的頁面結構，而失去了 HTML 管理頁面的優勢。

為了解決這個問題，後端的網頁框架都會有一套模板語言，使用類似 HTML 的架構，搭配動態的語法來定義頁面的配置，例如 ASP.NET 的 Razor 。

現在流行的單頁式應用程式(Single Page Application) 會將畫面的渲染完全交給前端，後端只負責資料的部分，因此前端也出現了許多的模板語言來定義動態的網頁配置。

### Pug

Pug 是一個模板引擎，它使用更簡潔的語法取代原本的 HTML ，增加開發者的效率，同時也提供動態的方式產生結構。

```pug
html
  head
    title Webpack Demo: #{name}
  body
```

### 框架的模板語法

古早的 JQuery 控制畫面的方式是使用 CSS Selector 取得目標元素後，進行屬性的修改達到畫面的變化。但這樣子使得邏輯跟畫面結構產生強大的耦合性，使得變動非常的不易，真正負責模板控制的 HTML 也因為 JavaScript 的控制，而變得沒有參考價值。

在現今的框架中，像是 Angular 及 Vue.js 則是使用模板語法搭配資料綁定來操作畫面。

```html
<!-- Vue.js Template Syntax -->
<span>Message: {{ msg }}</span>
```

模板語法使得資料與結構分開，同時也可以直接經由觀察模板語法來了解畫面的配置。

## 結論

網頁技術在現代急遽變化，遇到了各種問題，也出現了許多的解決方案，以下做個總覽：

- JavaScript
  - 沒有模組化：require.js, ES Module
  - 宿主環境對各語法支援度不一：Babel
  - 是弱型別語言：TypeScript, flow
- CSS
  - 宿主環境對各語法支援度不一：PostCSS
  - 語法過於簡單：SASS
- HTML
  - 是靜態的：Pug, Template Syntax

出現了許多問題，也被許多大神找到各種的解決方案，而 webpack 這類的 bundler 工具就是將這些工具帶入開發鍊的背後功臣。

## 參考資料

- https://zh.wikipedia.org/wiki/Node.js
- https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm
- https://juejin.im/post/6844903917680066567
- https://blog.risingstack.com/node-js-at-scale-module-system-commonjs-require/
- https://requirejs.org/
- https://github.com/volojs/create-template
- https://webpack.wuhaolin.cn/1%E5%85%A5%E9%97%A8/1-1%E5%89%8D%E7%AB%AF%E7%9A%84%E5%8F%91%E5%B1%95.html
- https://zh.wikipedia.org/wiki/ECMAScript
- https://en.wikipedia.org/wiki/Cascading_Style_Sheets
- https://postcss.org/
- https://preset-env.cssdb.org/
- https://stylus-lang.com/
- http://lesscss.org/
