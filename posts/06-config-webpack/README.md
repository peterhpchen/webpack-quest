# 配置 webpack 的方式

> 本文會講解如何配置 webpack 。

webpack 開箱即用(out of the box)，不用任何配置就可以使用。只要將起始模組放於 `./src/index.js` ，輸入 `webpack` 指令就可以在 `./dist/main.js` 中產生適用於生產環境( `production` )的 bundle 。

但開箱即用的功能僅占了 webpack 的極小部分，如果想要完全掌握 webpack ，首先最重要的就是學會如何配置它。

接下來會說明如何配置 webpack 。

## 配置 webpack

配置 webpack 的方式有兩種，一種是**使用 CLI 的參數**，另一種是**使用配置檔案**。

## 使用 CLI 的參數配置

webpack CLI 提供很多的選項做配置，可以藉由 `webpack --help` 查詢選項或是看 [webpack-cli 的文件](https://github.com/webpack/webpack-cli/blob/next/packages/webpack-cli/README.md) 以學習如何配置。

下面舉幾個簡單的例子來展示 CLI 的配置。

### 使用 CLI 修改 output

```bash
# ./demos/cli-config
webpack --output ./build/bundle.js
```

輸出從預設的 `./dist/main.js` 改為 `./build/bundle.js` 。

### 使用 CLI 修改 entry

```bash
# ./demos/cli-config
webpack --entry ./src/index2.js --output ./build/bundle.js
```

輸入從預設的 `./src/index.js` 改為 `./src/index2.js` 。

> CLI 如果已經設定了 `entry` 選項，但沒設定 `output` 的話，會造成輸出 bunlde 檔名變為 `null.js` ，因此此例子加上 `output` 設定避免此問題。

### 使用 CLI 設定開發模式

```bash
# ./demos/cli-config
webpack --mode development
```

將模式從預設的 `production` 改為 `development` 。

> 由於 CLI 的限制，並不能設定太複雜的配置，因此 webpack 需要配置檔來做更精密的配置。

## 使用配置檔配置

webpack 的配置檔是個 Node.js 的 CommonJS 模組，這個模組會 `export` 出配置物件( Configuration Object )， webpack 接收到後會使用相對應的配置執行建置。

### 配置物件(Configuration Object)

配置物件是個標準的 JavaScript 物件，使用者可以藉由調整物件中的屬性來做配置。

下面是個簡單的配置物件：

```js
// ./demos/config-file/webpack.config.js
{
    mode: 'development',
    entry: './src/index2.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    }
}
```

這配置物件配置了 `mode`, `entry` 及 `output` 。

### 配置檔

將配置物件以 Node.js CommonJS 模組匯出就是個合法的配置檔。

```js
// ./demos/config-file/webpack.config.js
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index2.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    }
}
```

> webpack 會將 root 目錄下的 `webpack.config.js` 做為預設的配置檔。

## CLI 及配置黨的互相搭配

上面說了 CLI 及配置檔兩種配置方式，其實不用一定要把所有的配置都用相同的方式設定，依照需求的不同來決定要使用哪種方式，這裡講解如何搭配這兩種方式做出最好的配置。

### CLI 的使用場景



## 參考資料

- [Configuration](https://webpack.js.org/configuration/)
- [Command Line Interface](https://webpack.js.org/api/cli/)