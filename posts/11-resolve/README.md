# 解析 Resolve

> 本文講解 webpack 是如何知道引入的模組位置，以及 `resolve` 屬性的意義及設定方式。

在開發 webpack 應用程式時，我們很自然地用**相對路徑**引用專案內的模組(`import hello from './hello.js'`)，對於從 npm 安裝的第三方庫直接用名稱引用(`import _ from 'lodash'`)。你有想過為什麼 webpack 懂要去哪裡抓這些你設定的模組嗎？讓我娓娓道來這段可歌可泣的找尋模組之旅。

## webpack 尋找模組的方式

在 webpack 中可以用三種方式引入模組：

- 絕對路徑
- 相對路徑
- 模組路徑

> webpack 使用 [enhance-resolve](https://github.com/webpack/enhanced-resolve) 解析模組的路徑。

### 絕對路徑

```js
// ./demos/absolute/index.js
import helloPOSIX from "/Users/PeterChen/Documents/code/webpack-quest/posts/11-resolve/demos/absolute/src/hello.js";

import helloWINDOWS from "C:\\Users\\PeterChen\\Documents\\codewebpack-quest\\posts\\11-resolve\\demos\\absolute\\src\\hello.js";
```

絕對路徑不需要經過轉換，直接使用就行了。

### 相對路徑

```js
// ./demos/relative/index.js
import "./utils/sayHi.js";
```

`./` 會將請求資源所在的目錄(`./demos/relative`) 與模組路徑(`utils/sayHi.js`)結合組成絕對路徑，以此找到對應的模組。

```js
// ./demos/relative/utils/sayHi.js
import name from "../name.js";

console.log(`Hello ${name}`);
```

`../` 會將請求資源所在的目錄上層(`./demos/relative`) 與模組目錄(`name.js`)結合組成絕對路徑，以此找到對應的模組。

### 模組路徑

使用模組時可以直接使用名稱引入：

```js
// ./demos/module/src/index.js
import _ from "lodash";
```

建置結果如下：

![module-result](./assets/module-result.png)

在結果中可以看到 `lodash` 被轉成 `node_modules` 中真正的引用路徑了。這是因為 webpack 藉由 `resolve` 配置的幫助，將模組的實際位置找出，因此我們才可以便利的使用名稱引入不同的模組。

![module](./assets/module.png)

接著來介紹如何使用 `resolve` 。

## 參考資料

- [Webpack Documentation: Concepts - Module Resolution](https://webpack.js.org/concepts/module-resolution/)
