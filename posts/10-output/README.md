# 輸出 Output

> 本文講解 webpack 配置項 `output` 的使用方式。

`output` 屬性是設定建置完成的 bundle 要放在哪個目錄以及如何命名。

## 預設值

`output` 的預設值如下：

```js
// ./demos/output-default/webpack.config.js
const path = require("path");

module.exports = {
  output: {
    path: path.join(process.cwd(), "dist"),
    filename: "[name].js",
  },
};
```

- `path` 定義了 bundle 輸出的路徑，預設是在執行建置工作目錄下的 `dist` 目錄中。
- `filename` 定義生成的檔名，預設值使用了 template string `[name]` ，這樣可以依照 Chunk 名稱生成對應的檔案。

>  由於 `path` 設定複雜，每個屬性都有各自的預設值，本文只說明了 `path` 及 `filename` 兩個常用的屬性預設值，其他的預設值可以參考 [webpack 代碼](https://github.com/webpack/webpack/blob/master/lib/config/defaults.js#L499)。

## 配置方式

`output` 需要使用者配置一個物件，該物件的屬性像是前面說到的 `path` 及 `filename` ，每個都有自己的功能，使用者可以依照自己的需求做配置。

接著會說明各屬性的用途及使用方式。

> 由於 [`output` 的屬性繁多](https://webpack.js.org/configuration/output/)，為避免讀者混淆，本文只會講解幾個常用的屬性，其他的屬性依照情境會在之後的章節介紹。

### `path`

`path` 屬性設定輸出的目錄，這屬性需要配置**絕對路徑(absolute path)**。

```js
// ./demos/output-path/webpack.config.demo.js
const path = require("path");

module.exports = {
  output: {
    path: path.resolve(__dirname, "build"),
  },
};
```

使用 Node.js 內建的 `path` 模組及 `__dirname` 變數可以解決路徑問題並組成絕對路徑。

`output` 的 `path` 屬性可以用 CLI 設定：

```json
{
    ...
  "scripts": {
    "build:argv": "webpack --output-path $PWD/build",
    ...
  },
  ...
}
```

`--output-path` 可以設定輸出路徑，請使用絕對路徑做設置。

> `$PWD` 是存有目前工作目錄的變數，可以用它組出絕對路徑。

`path` 中可以使用 `[hash]` 用 Compilation 的 hash 值設定目錄：

```js
// ./demos/output-path/webpack.config.demo.js
const path = require("path");

module.exports = {
  output: {
    path: path.resolve(__dirname, "[hash]"),
  },
};
```

上面的例子會產生下面的結果：

```plaintext
root
|- 8f2404a0220882490931
|- ...
```

它會產生一個 Compilation 的 hash 值為名稱的目錄。

## 參考資料

- [Concept](https://webpack.js.org/concepts/#output)
- [Concept](https://webpack.js.org/concepts/output/)
- [Output](https://webpack.js.org/configuration/output/)
