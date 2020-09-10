# 配置 webpack 的方式

> 本文會講解如何配置 webpack 。

webpack 開箱即用(out of the box)，不用任何配置就可以使用。只要將起始模組放於 `./src/index.js` ，輸入 `webpack` 指令就可以在 `./dist/main.js` 中產生適用於生產環境( `production` )的 bundle 。

但開箱即用的功能僅占了 webpack 的極小部分，如果想要完全掌握 webpack ，首先最重要的就是學會如何配置它。

接下來會說明如何配置 webpack 。

## 配置 webpack

以 CLI 執行 webpack 時，兩種方式可以配置設定，一種是**使用 CLI 的參數**，另一種是**使用配置檔案**。

> 除了 CLI 外， webpack 還提供開發者 [Node.js API](https://webpack.js.org/api/node/) 執行建置，在後面會提到這部分。

### 使用 CLI 的參數配置

webpack CLI 提供很多的選項做配置，可以藉由 `webpack --help` 查詢選項或是看 [webpack-cli 的文件](https://github.com/webpack/webpack-cli/blob/next/packages/webpack-cli/README.md) 以學習如何配置。

下面舉幾個簡單的例子來展示 CLI 的配置。

* 使用 CLI 修改 output

```bash
# ./demos/cli-config
webpack --output ./build/bundle.js
```

輸出從預設的 `./dist/main.js` 改為 `./build/bundle.js` 。

* 使用 CLI 修改 entry

```bash
# ./demos/cli-config
webpack --entry ./src/index2.js --output ./build/bundle.js
```

輸入從預設的 `./src/index.js` 改為 `./src/index2.js` 。

> CLI 如果已經設定了 `entry` 選項，但沒設定 `output` 的話，會造成輸出 bunlde 檔名變為 `null.js` ，因此此例子加上 `output` 設定避免此問題。

* 使用 CLI 設定開發模式

```bash
# ./demos/cli-config
webpack --mode development
```

將模式從預設的 `production` 改為 `development` 。

> 由於 CLI 的限制，並不能設定太複雜的配置，因此某先功能無法再 CLI 中設定(例如： Plugins)，所以 webpack 需要配置檔來做更精密且完整的配置。

### 使用配置檔配置

webpack 的配置檔是個 Node.js 的 CommonJS 模組，這個模組會 `export` 出配置物件( Configuration Object )， webpack 接收到後會使用相對應的配置執行建置。

#### 配置物件(Configuration Object)

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

#### 配置檔

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

webpack 會將 root 目錄下的 `webpack.config.js` 做為預設的配置檔，這樣一來 CLI 就不需要特別帶參數指定配置檔了。

## CLI 及配置檔的互相搭配

上面說了使用 CLI 的參數及配置檔這兩種配置方式，在實際使用時，如果只是 demo 或是 prototype 這類單純且不用長時間維護的專案，就可以只使用 CLI 做配置，但如果是大型專案的話，會藉由兩者的互相搭配來配置 webpack。

配置的方式如下：

* CLI 的參數: 設定 config file, 環境變數及 log 的輸出
* 配置檔：設定除了 CLI 外的其他細部設定

會在 CLI 的參數上配置環境所對應的配置檔與環境變數等與環境相關的設定，而配置檔則將其他全部的設定做配置。

例如像下面這樣：

```js
// ./demos/cli-file/package.json
{
    ...
  "scripts": {
    "build": "webpack --mode production --config webpack.config.prod.js",
    "dev": "webpack --mode development --config webpack.config.dev.js"
  }
  ...
}
```

設定兩個指令，一個是生產環境使用，另一個是開發環境使用，分別帶入對應的配置檔。

配置檔則將除了模式外的設定都做配置：

```js
// ./demos/cli-file/webpack.config.dev.js
const path = require('path');

module.exports = {
    entry: './src/index2.js'
}
```

```js
// ./demos/cli-life/webpack.config.prod.js
const path = require('path');

module.exports = {
    entry: './src/index2.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    }
}
```

如果 CLI 參數與配置檔都配置了相同屬性時會以 CLI 參數為準，例如在 CLI 參數配置模式是 `development` ，而配置檔 `webpack.config.js` 將模式設為 `production` 的話，會以 `development` 為準。

## 配置檔的配置

webpack 的配置會基於建置環境的不同而變化，像是開發環境與生產環境，在配置上就會有很大的差別。

本節帶大家學習要如配置多環境的 webpack 配置檔。

### 使用不同的配置檔

最簡單的方式就是使用不同的配置檔，我們以例子來說明：

```js
// ./demos/diff-config/src/index2.js
console.log('This is index2.js')
```

這是一個 JavaScript 檔 `index2.js` ，我們有兩個環境 `development` 及 `production` 需要配置，於是創建了 `webpack.config.dev.js` 及 `webpack.config.prod.js` 兩個配置檔：

```js
// ./demos/diff-config/webpack.config.dev.js
const path = require('path');

module.exports = {
    entry: './src/index2.js'
}
```

```js
// ./demos/diff-config/webpack.config.prod.js
const path = require('path');

module.exports = {
    entry: './src/index2.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    }
}
```

我想要將 `production` 所產生的檔案改為 `./build/bundle.js` ，因此在 `webpack.config.prod.js` 中要再加上 `output` 的設定。

我們下指令各別建置不同的環境：

```js
// ./demos/diff-config/package.json
{
    ...
  "scripts": {
    "prod": "webpack --mode production --config webpack.config.prod.js",
    "dev": "webpack --mode development --config webpack.config.dev.js"
  },
  ...
}
```

到這裡就配置完成了，然而雖然在不同環境下，仍然有些配置還是相同的（例如上面例子的 `entry`），為了避免 duplicate code 的問題，讓我們試試其他的辦法吧。

### 配置模組傳回 Function

配置檔是個標準的 Node.js CoomonJS 模組，除了回傳物件外， webpack 還允許配置檔傳回 Function 。

```js
// ./demos/export-function/webpack.config.env.js
const path = require('path');

module.exports = (env, argv) => ({
    mode: env.production ? 'production' : 'development',
    entry: './src/index2.js',
    output: env.production ? {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    }: {}
})
```

webpack 會傳入兩個參數：

* `env`: 環境變數，在 CLI 中用 [`--env`](https://webpack.js.org/api/cli/#environment-options) 設定
* `argv`: CLI 參數，像是 `--mode` 、 `--config` 等參數

```js
// ./demos/export-function/package.json
{
    ...
  "scripts": {
    "prod:env": "webpack --env.production --config webpack.config.env.js",
    "dev:env": "webpack --env.development --config webpack.config.env.js",
  },
  ...
}
```

使用 `--env` 傳回環境變數，藉由環境變數判斷環境配置。

也可以使用 `argv` 做判斷：

```js
// ./demos/export-function/webpack.config.argv.js
const path = require('path');

module.exports = (env, argv) => ({
    mode: argv.mode,
    entry: './src/index2.js',
    output: argv.mode === 'production' ? {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    }: {}
})
```

```js
// ./demos/export-function/package.json
{
    ...
  "scripts": {
    "prod:argv": "webpack --mode production",
    "dev:argv": "webpack --mode development"
  },
  ...
}
```

可以將所有的配置放於同個檔案中，並且用 JavaScript 代碼判斷在哪個環境下以此來設定不同的屬性值，達到切換環境的建置目的。

需要注意的是參數中的設定有可能跟配置物件發生衝突，盡量使用環境變數(`env`)、少用參數(`argv`)。

### 配置模組傳回 Promise

在取得配置時有些作業可能會是非同步的，因此 webpack 允許我們傳回 Promise 。

```js
// ./demos/export-promise/webpack.config.js
const path = require('path');

module.exports = (env, argv) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                mode: env.production ? 'production' : 'development',
                entry: './src/index2.js',
                output: env.production ? {
                    filename: 'bundle.js',
                    path: path.resolve(__dirname, 'build')
                }: {}
            })
        }, 5000)
    })
}
```

### 配置模組傳回陣列

有些情況，我們需要同時建置多種環境，這時就可以使用陣列的方式：

```js
// ./demos/export-array/webpack.config.js
const path = require('path');

module.exports = [{
    name: 'dev',
    mode: 'development',
    entry: './src/index2.js'
},{
    name: 'prod',
    mode: 'production',
    entry: './src/index2.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    }
}]
```

直接下 `webpack` 指令就可以建置 `development` 及 `production` 環境。

如果只想要執行其中一個的話，可以使用 `--config-name` 來對應不同的配置：

```js
// ./demos/export-array/package.json
{
    ...
  "scripts": {
    "prod": "webpack --config-name prod",
    "dev": "webpack --config-name dev"
  },
  ...
}
```

## 總結

本文從開發者最常使用的 CLI 方式介紹了 webpack 的配置方式，分為 **CLI 參數**及**配置檔案**。 CLI 參數適合用在小型的 prototype 專案上，而配置檔案適合用在大型專案中，這兩個方法可以依照使用者的想法做搭配。

而配置檔案是個 Node.js CommonJS 模組，依照需求的不同，可以直接傳回配置物件，也可以用 Function 、 Promise 的方式在內部組合配置物件再回傳。甚至可以使用陣列回傳，讓 webpack 一次執行多個不同的建置。

只要掌握了配置，就掌握了 webpack 。本文入門了 webpack 的配置方式，之後我們將一步步的學習各個不同屬性，強化對 webpack 的理解，到可以運用自如的程度。

## 參考資料

- [Configuration](https://webpack.js.org/concepts/configuration/)
- [Configuration](https://webpack.js.org/configuration/)
- [Command Line Interface](https://webpack.js.org/api/cli/)
- [Configuration Types](https://webpack.js.org/configuration/configuration-types/)
- [Node Interface](https://webpack.js.org/api/node/)