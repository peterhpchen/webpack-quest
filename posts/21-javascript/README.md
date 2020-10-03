# 使用 webpack 開發 JavaScript 應用

> 本文說明如何配置 webpack 用來開發 JavaScript 應用程式。

webpack 可以解析 ES2015 版本的 JavaScript ，並將其轉為 bundle ，這是原生支援的功能，因此不需要任何的配置就可以開發 JavaScript 應用程式。

但是依照目標的瀏覽器不同，所支援的 JavaScript 語法可能會有所差別，在較舊的瀏覽器上執行（例如 IE）會無法識別新的語法而造成錯誤。

為解決這個問題，我們可以使用 Babel 處理代碼將其轉為瀏覽器中可識別的較舊版本 JavaScript 。

## Babel

[Babel](https://babeljs.io/) 可以將新版本的 JavaScript 語法轉為目標瀏覽器環境可識別的舊版本語法。

接著我們先不使用 webpack ，單純使用 Babel 將代碼做轉換。

### 安裝 Babel

安裝 `@babel/core` 及 `@babel/cli`:

```bash
npm install @babel/core @babel/cli -D
```

- `@babel/core`: Babel 的核心庫，用來執行 Babel
- `@babel/cli`: Babel 的 CLI 工具，可以下指令控制 Babel 的執行

### 執行 Babel

現在有個 `.js` 檔內容如下：

```js
// ./demos/babel-plugin/src/index.js
const add = (a, b) => {
  // ES2015: Arrow Function
  return a + b;
};

export default {
  add,
};
```

這裡使用了 es5 的 `const` 及 arrow function 。

接著使用 Babel CLI 執行 Babel 的建置：

```bash
babel src -d dist
```

接著我們看一下建置後的 `./dist/index.js` 會發現跟原本的一模一樣，這是因為 Babel 的核心庫只負責建置的流程，並沒有加上轉換的處理，這部分是屬於 Plugins 的職責。

### 使用 Babel Plugins

現在我們幫 Babel 加上 Plugins ，為了可以將 `const` 與 arrow function 轉為舊版本的語法我們要安裝 `@babel/plugin-transform-arrow-functions` 與 `@babel/plugin-transform-block-scoping` ：

```bash
yarn add @babel/plugin-transform-arrow-functions @babel/plugin-transform-block-scoping -D
```

- `@babel/plugin-transform-arrow-functions`：轉換 arrow function
- `@babel/plugin-transform-block-scoping`: 轉換 `const`

執行建置：

```bash
babel src -d dist-with-plugin --plugins=@babel/plugin-transform-arrow-functions,@babel/plugin-transform-block-scoping
```

加上 `plugins` 參數帶入 Plugins ，結果如下：

```js
// ./demos/babel-plugin/dist-with-plugin/index.js
var add = function (a, b) {
  // ES2015: Arrow Function
  return a + b;
};

export default {
  add,
};
```

可以看到 `const` 被轉為 `var` ， `(a, b) =>` 轉為 `function (a, b)` ，Babel 的用途就在這裡。

### 使用 Babel 配置檔

使用 CLI 做設定時，只要設定一多，會變得很難設定，因此 Babel 提供了配置檔的方式做設定：

```js
// ./demos/babel-config/babel.config.js
module.exports = {
  plugins: [
    "@babel/plugin-transform-arrow-functions",
    "@babel/plugin-transform-block-scoping",
  ],
};
```

配置檔名為 `babel.config.js` ，與 webpack 相同， Babel 會[辨識特定的檔案](https://babeljs.io/docs/en/configuration)（例如 `babel.config.js`）當作設定檔，並從中取得配置。

### 使用 Presets

每個 Plugins 都針對特定的語法處理，假設使用了其他的語法，就必須要個別加上對應的 Plugins ，設定會變得相當複雜，所幸 Babel 提供了 Presets ，Presets 會將多個 Plugins 包起來，供使用者引入所需的 Plugins 。

這裡使用 `@babel/preset-env`：

```bash
npm install @babel/preset-env -D
```

`@babel/preset-env` 可以依照目標環境，決定要轉換什麼語法。

現在將 `@babel/preset-env` 加到配置中：

```js
// ./demos/babel-preset/babel.config.js
module.exports = {
  presets: ["@babel/preset-env"],
};
```

執行建置會發現除了 `const` 與 arrow function 外，還另外幫我們轉換了 `export` 的語法：

```js
// ./demos/babel-preset/babel.config.js
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = void 0;

var add = function add(a, b) {
  // ES2015: Arrow Function
  return a + b;
};

var _default = {
  add: add,
};
exports["default"] = _default;
```

### 使用 `.browserslistrc`

`@babel/preset-env` 預設會將 ES2015-ES2020 的所有語法轉為 ES5 版本的語法，但使用者的目標環境瀏覽器不一定只支援 ES5 版本語法，像是 Chrome 或是 Firefox 等現代瀏覽器都已經支援較新的語法，這時可以使用 [browserslist](https://github.com/browserslist/browserslist) 設定目標瀏覽器，讓 Babel 知道該以哪個環境為目標做轉換。

建立一個 `.browserslistrc` 的檔案， Babel 會識別此檔案已做對應的轉換：

```yaml
> 5%
```

再建置後會發現 `const` 與 arrow function 沒有被轉換了，這是因為目前市佔率大於 5% 的瀏覽器都已經支援這兩個語法了，因此 Babel 忽略轉換這兩個語法。

### 使用 Polyfill

Babel 的 Plugins 只負責轉換語法，並沒有對新的語意做解釋，這時就要藉由 Polyfill 的幫助。

我們需要引入 `core-js`：

```bash
npm install core-js
```

這是個 Polyfill 庫，他使用原有的語法實現新的語意 features ，Babel 使用 core-js 幫忙轉換：

```js
// ./demos/babel-polyfill/babel.config.js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: 3,
      },
    ],
  ],
};
```

- `useBuiltIns`: 決定要如何引入 Polyfill
  - `false`: 預設值，全部手動引入
  - `'entry'`: 在入口 `.js` 檔中引入完整的 `core-js` ，Babel 會依照環境配置取出對應的 Polyfill
  - `'usage'`: Babel 會偵測代碼，以引入對應的 Polyfill
- `corejs`：指定 `core-js` 版本

這裡配置使用 `usage` 的方式自動引入 Polyfill 。

接著我們修改代碼加上 `addAsync`:

```js
// ./demos/babel-polyfill/src/index.js
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
```

建置結果如下：

```js
// ./demos/babel-polyfill/dist/index.js
"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = void 0;

var add = function add(a, b) {
  // ES2015: Arrow Function
  return a + b;
};

var addAsync = function addAsync(a, b) {
  return new Promise(function (resolve, reject) {
    resolve(a + b);
  });
};

var _default = {
  add: add,
  addAsync: addAsync,
};
exports["default"] = _default;
```

可以看到 Babel 幫我們自動引入了 `core-js` 。

### 將 Babel 加到 webpack 中

使用 `babel-loader` 將 babel 引入 webpack 的建置流程中：

```js
// ./demos/babel-webpack/webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
```

由於我們已經將所有的配置都拿到配置檔中（`.browserslistrc` 與 `babel.config.js`），因此 `babel-loader` 中不需再做設定。

建置後可以在 bundle 中看到，代碼已經被轉換為目標環境相容的狀態：

```js
// ./demos/babel-webpack/dist/main.js

...

/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(144);



var add = function add(a, b) {
  // ES2015: Arrow Function
  return a + b;
};

var addAsync = function addAsync(a, b) {
  return new Promise(function (resolve, reject) {
    resolve(a + b);
  });
};

/* harmony default export */ __webpack_exports__["default"] = ({
  add: add,
  addAsync: addAsync
});

/***/ }),

...
```

## 總結

本文學習 Babel 的用法，在真實的環境中，雖然 webpack 可以識別 ES2015 的語法，但是瀏覽器不一定懂，因此還是需要利用 Babel 做轉換。

Babel 本身不會做任何的轉換，需要加上對應的 Plugins 才會有轉換的動作，而 Preset 可以將多個 Plugins 包起來，依照目標環境做對應的轉換。

Plugins 只會轉換語法，對於新的語意並不會轉換，這時需要藉由 `core-js` 的 Polyfill 幫助做轉換。

使用 babel-loader 引入 Babel 至 webpack 的建置流程中，讓我們在建置過程中享有 Babel 的功能。

## 參考資料

- [VALENTINO GAGLIARDI: How babel preset-env, core-js, and browserslistrc work together](https://www.valentinog.com/blog/preset-env/)
- [SurviveJS Webpack: Loading JavaScript](https://survivejs.com/webpack/loading/javascript/)
- [Babel Docs: Usage Guide](https://babeljs.io/docs/en/usage)
- [Babel Docs: Configure Babel](https://babeljs.io/docs/en/configuration)
- [Babel Docs: Config Files](https://babeljs.io/docs/en/config-files)
- [GitHub: browserslist/browserslist](https://github.com/browserslist/browserslist)
