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

## Source Map 種類

eval: 可以對應檔名
eval-source-map: 可以對應檔名、loader 處理前的行數、欄數
eval-cheap-source-map: 可以對應檔名、loader 處理後的行數
eval-module-source-map: 可以對應檔名、loader 處理前的行數

## 參考資料

- [Webpack Documentation: Guides - Development # Using source maps](https://webpack.js.org/guides/development/#using-source-maps)
