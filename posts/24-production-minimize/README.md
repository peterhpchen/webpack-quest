# 建立 webpack 生產環境 - 減小體積

> 本文講述使用 webpack 建立生產環境中代碼減少體積的優化方式。

在真正的產品環境時，能將代碼的容量縮小，減少請求的時間，是開發者的目標之一。 webpack 可以在依照設定對代碼做壓縮、減少等處理，以達到優化的目的。

## 開啟 `production` 模式

webpack 使用模式 `mode` 來設定預設的最佳化配置，當目標環境為生產模式時，我們可以將 `mode` 設為 `production`，下面的配置輸出 `none` 與 `production` 的 bundle 供比較：

```js
// ./demos/production-mode/webpack.config.js
module.exports = ["none", "production"].map((mode) => ({
  mode,
  output: {
    filename: `${mode}.js`,
  },
}));
```

建置結果如下：

![none-vs-production](./assets/none-vs-production.png)

可以看到在沒有最佳化的狀態下(`none`)的 bundle 容量大於 `production` 模式下的最佳化處理很多。

`production` 模式做了許多優化的處理：

- 使用 terser 壓縮代碼
- Tree Shaking
- Module Concatenation
- 設定 `process.env.NODE_ENV` 為 `production`

webpack 的 `production` 模式已經將大部分減少體積的優化做好了，接下來本文會討論各個減少體積的策略與方法，配合 `production` 模式可以達到事半功倍的效果。

## 縮小 JavaScript 的體積

webpack 提供了 `optimization.minimize` 與 `optimization.minimizer` 配置供使用者設定使否啟用最小化以及如何處理最小化。

預設的 `minimizer` 是使用 `terser-webpack-plugin` 做最小化的處理，而 `minimize` 在 `production` 模式下預設是開啟的，你也可以手動開啟：

```js
// ./demos/optimization-minimize/webpack.config.js
const TerserWebpackPlugin = require("terser-webpack-plugin");
const ClosureWebpackPlugin = require("closure-webpack-plugin");

module.exports = [
  { name: "terser", plugin: TerserWebpackPlugin },
  { name: "closure", plugin: ClosureWebpackPlugin },
].map((minimizer) => ({
  mode: "none",
  output: {
    filename: `${minimizer.name}.js`,
  },
  optimization: {
    minimize: true,
    minimizer: [new minimizer.plugin()],
  },
}));
```

這裡使用了 webpack 預設的 [terser](https://terser.org/) 與 Google 的 [Closure Compiler](https://developers.google.com/closure/compiler) 輸出個別的 bundle 。大家可以觀察看哪個比較合適你。

## Tree Shaking

Tree Shaking 的意思是將 JavaScript 中不會執行到的代碼刪去的動作。這樣技巧需要依照 ES Module 的架構(`import`, `export`)，因此在建置時請將模組建置為 ES Module 使 webpack 可以做 Tree Shaking 的處理。

## 參考資料

- [Decrease Front-end Size](https://developers.google.com/web/fundamentals/performance/webpack/decrease-frontend-size)
- [Webpack Documentation: Configuration - Optimization](https://webpack.js.org/configuration/optimization)
- [Webpack Documentation: Plugins - TerserWebpackPlugin](https://webpack.js.org/plugins/terser-webpack-plugin/)
- [Webpack Documentation: Guides - Production](https://webpack.js.org/guides/production/)
- [Webpack Documentation: Guides - Tree Shaking](https://webpack.js.org/guides/tree-shaking/)
