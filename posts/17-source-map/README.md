# Source Map

> 本文講解 Source Map 的功用以及在 webpack 中使用 `devTools` 屬性設定 Source Map 的方式。

webpack 是個建置工具，他會將多個檔案或是不同語言的模組合成 bundle 檔案，在生產環境時，這樣的做法能減少傳輸容量，對於程式效能有很大的幫助。但是在開發環境中，建置過的代碼會變得難以追蹤，一但發生 Bug ，都不知道要去哪裡找到問題，這時候 Source Map 可以解決此問題，接下來我們來看看建置後的代碼會造成開發什麼樣的問題，以及使用 Source Map 後的好處，接著講解如何在 webpack 中設定 Source Map 。

## 沒有使用 Source Map 的問題

 某天彼得寫了下面的代碼：

```js
// ./demos/without-source-map/src/index.js
import _ from "lodash";

const demoName = "Without Source Map";

function component() {
  const element = document.createElement("div");

  element.innerHTML = _.join(["Webpack Demo", demoName], ": ");

  return element;
}

document.body.appenChild(component());
```

興高采烈地用 webpack 建置後，在瀏覽器點開要看結果，發現怎麼一片白啊，無奈的彼得只好打開 DevTool 準備 Debug ，他看到了錯誤如下：

![without-source-map-error](./assets/without-source-map-error.png)

彼得看到傻眼，心想：「我明明只有寫 `index.js` 怎麼錯誤是從 `main.js` 來，而且行數也不太對啊」，雖然心裡毛毛的，可是彼得還是點開了 `main.js:9` 看 source 的內容：

![without-source-map-source](./assets/without-source-map-source.png)

「這天書般的代碼是要怎麼抓蟲啊」，這時彼得看到的是建置後的代碼，由於 webpack 的處理，代碼已經不是原本彼得撰寫的內容了。

![without-source-map](./assets/without-source-map.png)

彼得看到的是 Compiled Code ，跟原本的 Source Code 已經完全不同了。

## 使用 Source Map 解決開發問題

所幸 webpack 有提供 Source Map 的功能，我們使用 CLI 將它開啟：

```json
{
    ...
  "scripts": {
    "dev": "http-server ./dist & webpack --mode production --watch --devtool source-map"
  },
  ...
}
```

`--devtool` 參數可以選擇不同的 Source Map 方式，這裡選 `source-map` ，執行後再來看看瀏覽器的 Dev Tool ：

![source-map-devtool](./assets/source-map-devtool.png)

 看得到彼得所寫的代碼了，並且明確的指出錯誤的位置。

![source-map](./assets/source-map.png)

Source Map 會產生一份 map 檔案，用以對應建置後的代碼到來源代碼的位置，瀏覽器看到有 Source Map 的設定就會自動將 Source 轉為 Mapped 後的代碼。

## Source Map 原理

Source Map 會為每個檔案產生一個對應資料的檔案，它的內容會像下面這樣：

```json
{
  "version": 3,
  "sources": ["../src/index.js"],
  "names": ["add", "a", "b"],
  "mappings": ";;AAAA,IAAMA,GAAG,GAAG,SAANA,GAAM,CAACC,CAAD,EAAIC,CAAJ;AAAA,SAAUD,CAAC,GAAGC,CAAd;AAAA,CAAZ",
  "sourceRoot": "/",
  "sourcesContent": ["const add = (a, b) => a + b;\n"],
  "file": "index.js"
}
```

對應檔是個 JSON 格式的資料檔，副檔名為 `.map` ，主要的屬性有：

- `version`: Source Map 的版本，目前是 `3`
- `sources`: 組成此建置檔案的原始檔案位置
- `names`: 原始檔案內代碼的名詞(變數、屬性名...等)表
- `mappings`: 建置與原始檔案的代碼對應資料
- `sourceRoot`: 原始檔案的根目錄
- `sourceContent`: 原始檔案的代碼內容
- `file`: 此對應檔的目標檔案(建置檔案)

有了這個檔案後，我們需要告知瀏覽器要使用此對應檔，因此要在建置後的檔案中加上資訊：

```js
"use strict";

var add = function add(a, b) {
  return a + b;
};
//# sourceMappingURL=index.js.map
```

最後一行的 `//# sourceMappingURL=index.js.map` 告訴瀏覽器此檔案的對應檔為 `index.js.map` 檔。

如此一來，在瀏覽器開啟此檔案時，會發現有對應檔，從而使用 Source Map 對應原始檔案的內容。

![process](./assets/process.png)

大部分的屬性都很直覺的可以知道使用的方式，除了 `mappings` 外，而這也是對應檔中最重要的資訊，接著我們就來解釋 `mappings` 資訊的使用方式吧。

## `mappings` 的對應方式

`mappings` 內的資料規則如下：

- `;` : 分號用以區隔建置代碼中的每一行。
- `,` : 逗號用以區隔每個代碼段。
- `AAAA` : 代碼段對應資訊的編碼，此編碼包含 1 或 4 或 5 個值，每個值都以 [VLQ 編碼](https://en.wikipedia.org/wiki/Variable-length_quantity)而成。

使用 `;` 對應建置後代碼的行， `,` 分隔行中的各個代碼段，最後使用對應編碼還原代碼段在原始資料中的內容與位置，接著來看要如何看懂對應編碼。

## 對應編碼的定義

對應編碼的值都是使用 VLQ 編碼，總共由五個值所組成：

- 第一個值：此代碼段位於建置後代碼中的第幾欄
- 第二個值：此代碼段的原始檔案位於 map 檔中 `sources` 陣列的第幾個元素
- 第三個值：此代碼段位於原始檔案中的第幾行
- 第四個值：此代碼段位於原始檔案中的第幾欄
- 第五個值：此代碼段的名稱位於 map 檔中 `names` 陣列的第幾個元素

## 以例子說明 Source Map 對應方式

這節會以 Babel 代碼轉換的 Source Map 為例子來說明其對應的方法。

原始代碼為：

```js
// ./demos/babel-source-map/src/index.js
const add = (a, b) => a + b;
```

建置代碼為：

```js
// ./demos/babel-source-map/lib/index.js
"use strict";

var add = function add(a, b) {
  return a + b;
};
//# sourceMappingURL=index.js.map
```

`//# sourceMappingURL=index.js.map` 告訴瀏覽器此建置檔案的對應檔位置。

對應檔為：

```json
// ./demos/babel-source-map/lib/index.js.map
{
  "version": 3,
  "sources": ["../src/index.js"],
  "names": ["add", "a", "b"],
  "mappings": ";;AAAA,IAAMA,GAAG,GAAG,SAANA,GAAM,CAACC,CAAD,EAAIC,CAAJ;AAAA,SAAUD,CAAC,GAAGC,CAAd;AAAA,CAAZ",
  "sourceRoot": "/",
  "sourcesContent": ["const add = (a, b) => a + b;\n"],
  "file": "index.js"
}
```

 檔案都介紹完了，接著我們試著對應

## Source Map 種類

eval: 可以對應檔名
eval-source-map: 可以對應檔名、loader 處理前的行數、欄數
eval-cheap-source-map: 可以對應檔名、loader 處理後的行數
eval-module-source-map: 可以對應檔名、loader 處理前的行數
inline: 用 DataUrl 載入 map 檔，不產生 map 檔案
hidden: 不會有 sourceMappingURL 的註解在 bundle 中
nosource: 不會產生 sourceContent 的內容，但依然可以看到錯誤堆疊
cheap: 不會對應列數
cheap-module: 不會對應列數但會對應 loader 轉換前的行數

## 參考資料

- [Webpack Documentation: Guides - Development # Using source maps](https://webpack.js.org/guides/development/#using-source-maps)
- [Webpack Documentation: Configuration - Devtool](https://webpack.js.org/configuration/devtool/)
- [SurvieJS Webpack: Source Maps](https://survivejs.com/webpack/building/source-maps/)
- [阮一峰的网络日志: JavaScript Source Map 详解](https://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)
- [Babel Options: sourceMaps](https://babeljs.io/docs/en/options#sourcemaps)
