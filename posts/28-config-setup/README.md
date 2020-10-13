# 配置多模式專案

> 本文講解如何在同一專案中配置多種模式的 webpack 設定。

> 本文的範例程式放在 [peterhpchen/webpack-quest](https://github.com/peterhpchen/webpack-quest/tree/master/posts/28-config-setup/demos) 中，每個程式碼區塊的第一行都會標注檔案的位置，請搭配文章作參考。

在開發專案時，會有兩種配置：開發配置及生產配置。開發配置專責於開發階段使用，使工程師得到更好的除錯幫助，有意義的命名模組輸出、 Source Map 、 Hot Module Replacement...等。而生產環境的配置則需要做最佳化、減少體積、切割代碼以提高快取機會...等。但是這兩種環境的配置也並不完全不同，其中對於模組的載入、入口的設定等在兩個環境下是會相同的，這時要如何配置這些配置，又不會讓使用者麻煩是需要特別注意的。

為解決此問題，本文會使用`函式` 、 `webpack-merge` 及 `webpack-chain` 這三種不同的方式說明如何配置 webpack 的配置檔。

## 使用函式設定配置檔

在[使用 CLI 操作 webpack](./07-use-cli/README.md) 中有提到，配置檔可以用函式的方法設定，函式的參數會傳入環境變數，以此來決定各個環境下的設定。

以下面的例子說明：

```js
// ./demos/function/webpack.config.js
module.exports = (webpackEnv) => {
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";

  return {
    mode: isEnvProduction ? "production" : isEnvDevelopment && "development",
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
};
```

我們可以在函式中組成目標環境的配置並傳回，接著只要在指令中給予相應的環境變數，就可以使 webpack 依照不同的配置做建置的工作：

```json
// ./demos/function/package.json
{
    ...
  "scripts": {
    "build": "webpack --env production",
    "dev": "webpack --env development"
  },
  ...
}
```

使用函式的好處在於只需要使用單一的配置檔，利用 JavaScript 完全控制設定的輸出，對於不同環境中各個設定不會相差太多時是個好選擇，但如果環境間差距過大，最好還是避免使用此方法。

## 使用 `webpack-merge` 合併多個配置

使用多個 webpack 配置檔設定不同環境的建置方式是最常見的做法，但大部分的配置不管差距再怎麼大，不同的環境還是會有相同的設定，為了避免重複的配置，開發者可以合併多個配置檔的內容。

試想你有下面這些配置檔：

```plaintext
root
|- /config
  |- /webpack.base.conf.js
  |- /webpack.dev.conf.js
  |- /webpack.prod.conf.js
```

你可能會想說使用 [`Object.assign()`](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) 或是 [Spread Operator](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Spread_syntax) 做合併，但由於 webpack 配置屬於多層結構，並且配置的順序也有其特定的規則，因此盡量避免使用這樣的方式做設定的合併處理。

為了安全的合併配置檔內容，我們可以借助 `webpack-merge` 的幫助，它是專門為了合併 webpack 配置而開發的，可以完美的組合多個配置檔。

以上面的例子來看，基底配置(`webpack.base.conf.js`)設定了關於模組的載入：

```js
// ./demos/merge/config/webpack.base.conf.js
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

而在開發(`webpack.dev.conf.js`)及生產配置(`webpack.prod.conf.js`)中使用 `webpack-merge` 與基底配置做合併:

```js
// ./demos/merge/config/webpack.dev.conf.js
const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");

module.exports = merge(baseWebpackConfig, {
  mode: "development",
});

// ./demos/merge/config/webpack.prod.conf.js
const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");

module.exports = merge(baseWebpackConfig, {
  mode: "production",
});
```

接著在執行的時候針對不同的環境，選取不同的配置檔：

```js
{
    ...
  "scripts": {
    "build": "webpack --config config/webpack.prod.conf.js",
    "dev": "webpack --config config/webpack.dev.conf.js"
  },
  ...
}
```

這樣的配置方式可以清楚的拆分各個不同的配置，對於專案中不同環境會有多種不同配置的情況十分的有用，開發者也能做很好的配置。

## 使用 `webpack-chain` 擴充配置

`webpack-merge` 足以應付大部分的需求，但是對於想要修改本來的規則時，例如說修改 `babel-loader` 中的 `options` 這樣細部的變動，使用 `webpack-merge` 時必須將整個 `babel-loader` 的規則重寫一遍，其中可能大部分的 `options` 都是相同的，這使得重複的代碼產生。

需要這類細部的變動時可以使用 `webpack-chain` 來達成，它使用鏈式(chain) 設計 API ，用這些 API 我們可以產生合法的 webpack 配置，也可以使用 API 定位各個設定並做指定的修改。

現在我們修改 `webpack-merge` 的基底配置：

```js
// ./demos/chain/config/webpack.base.conf.js
const WebpackConfig = require("webpack-chain");

const webpackConfig = new WebpackConfig();

webpackConfig.module
  .rule("js")
  .test(/\.js$/)
  .use("babel")
  .loader("babel-loader");

module.exports = webpackConfig;
```

在基底配置中我們設定了 `babel-loader` ，其中可以看到 `webpack-chain` 可以將各個設定做命名的動作：

- `.rule('js')`：將此 `rule` 命名為 `js`
- `.use('babel')`：將此 `use`(`loaders`) 命名為 `babel`

接下來在開發及生產配置檔中就可以依照這些名字對應至想要修改的規則：

```js
// ./demos/chain/config/webpack.prod.conf.js
const webpack = require("webpack");
const webpackConfig = require("./webpack.base.conf");

webpackConfig.module
  .rule("js")
  .use("babel")
  .loader("babel-loader")
  .tap((options) => options);

webpackConfig.mode("production");

module.exports = webpackConfig.toConfig();

// ./demos/chain/config/webpack.dev.conf.js
const webpack = require("webpack");
const webpackConfig = require("./webpack.base.conf");

webpackConfig.module
  .rule("js")
  .use("babel")
  .loader("babel-loader")
  .tap((options) => options);

webpackConfig.mode("development");

module.exports = webpackConfig.toConfig();
```

- `tap()`: callback 中會傳入之前設定選項 `options` ，修改後當作 callback 的回傳值即可改變設定
- `toConfig()`: 當要輸出為合法的 webpack 配置物件時，使用此函式

`webpack-chain` 使用鏈式 API 讓使用者可以完全控制並修改原有配置的所有細節，對於需要最高精細度修改的使用者來說非常合適。

## 總結

本文介紹了三種設定方式，各個特色如下表所示：

| 方式            | 優                               | 缺                           | 例子                                                                                                                                  |
| --------------- | -------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| function        | 設定手法簡單、擁有極高的控制能力 | 設定在單一檔案中，配置混亂   | [facebook/create-react-app](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js) |
| `webpack-merge` | 設定手法簡單、高可讀性           | 控制精細度較低               | [vuejs-templates/webpack](https://github.com/vuejs-templates/webpack/tree/develop/template/build)                                     |
| `webpack-chain` | 鏈式 API 、控制精細度極高        | 配置方式非原生，必須額外學習 | [Vue CLI](https://cli.vuejs.org/guide/webpack.html#chaining-advanced)                                                                 |

## 參考資料

- [GitHub: facebook / create-react-app](https://github.com/facebook/create-react-app)
- [GitHub: survivejs / webpack-merge](https://github.com/survivejs/webpack-merge)
- [GitHub: vuejs-templates / webpack](https://github.com/vuejs-templates/webpack)
- [GitHub: neutrinojs / webpack-chain](https://github.com/neutrinojs/webpack-chain)
- [Vue CLI: Working with Webpack # Chaining (Advanced)](https://cli.vuejs.org/guide/webpack.html#chaining-advanced)
