# Dev Tool

> 本文講解在 webpack 中使用 `devTools` 屬性設定 Source Map 的方式。

webpack 是個建置工具，他會將多個檔案或是不同語言的模組合成 bundle 檔案，在生產環境時，這樣的做法能減少傳輸容量，對於程式效能有很大的幫助。但是在開發環境中，建置過的代碼會變得難以追蹤，一但發生 Bug ，都不知道要去哪裡找到問題，幸好 webpack 有提供 Source Map 輸出的功能，接下來會講解如何使用 webpack 中的 `devtool` 設定 Source Map。

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
