# 終點只是另一個起點

> 這篇是這次鐵人賽最後一篇文章，照慣例來說說心得吧。

webpack 是我從進入前端領域一直想要弄懂的技術，它跟我們前端工程師彷彿有個微妙的距離感，你看得見它，會稍微的了解它，但當別人問起你關於它的事時，才發現對於它的理解都只是表面的東西，你從來沒有真正的認識它，像極了愛情 :) 。

webpack 雖然不像是 Vue.js 、 Bootstrap 這類的框架那麼常被使用，但他絕對會在你的前端人生中，佔用了你不少的時光。藉由這次的鐵人賽，我將 webpack 從頭再學習了一次，盡量以初學者的角度，重新認識 webpack ，這次的旅程對我來說學習了很多，也希望讀者們也有所收穫。

## 文章總覽

這裡總結整個系列的各篇文章，

### 第一章: 認識 webpack

- [JavaScript 的模組化之路](../02-history-of-js-module/README.md): 前端工程模組化的歷史發展
- [新技術的崛起](../03-new-tech/README.md): 介紹現代前端工程的新興技術
- [介紹 webpack](../04-introduction/README.md): webpack 各種概念介紹
- [第一次使用 webpack 就上手](../05-first-webpack/README.md): 配置第一個 webpack 專案
- [webpack 的配置](../06-config-webpack/README.md): webpack 配置物件介紹
- [使用 CLI 操作 webpack](../07-use-cli/README.md): 如何使用 CLI 執行 webpack 建置
- [使用 Node.js API 操作 webpack](../08-use-node-api/README.md): 如何使用 Node.js API 執行 webpack 建置

### 第二章: 配置 webpack

- [入口 Entry](../09-entry/README.md): 入口(`entry`)屬性配置方法
- [輸出 Output](../10-output/README.md): 輸出(`output`)屬性配置方法
- [解析 Resolve](../11-resolve/README.md): 解析(`resolve`)屬性配置方法
- [載入器(Loaders)](../12-loaders/README.md): 載入器配置介紹
- [模組 Module 的規則判定](../13-module/README.md): 模組(`module`)的規則屬性配置方法
- [模組 Module 的處理](../14-module-use/README.md): 模組(`module`)的處理屬性配置方法
- [插件 Plugins](../15-plugins/README.md): 插件(`plugins`)屬性配置方法
- [監聽 Watch](../16-watch/README.md): 監聽模式(`watch` and `watchOptions`)屬性配置方法
- [Source Map](../17-source-map/README.md): Source Map 原理介紹
- [Dev Tool](../18-devtool/README.md): `devtool` 屬性配置方法
- [最佳化 Optimization 與模式 Mode](../19-optimization/README.md): 最佳化(`optimization`)與模式(`mode`)屬性配置方法

### 第三章: 真實世界的 webpack

- [建立 webpack 開發環境](../20-development/README.md): 配合多種屬性建立 webpack 的開發環境
- [使用 JavaScript](../21-javascript/README.md): 在 webpack 中配置 JavaScript
- [使用 Style](../22-style/README.md): 在 webpack 中配置 Style 樣式表
- [使用 Image](../23-image/README.md): 在 webpack 中配置圖片
- [建立 webpack 生產環境 - 減小體積](../24-production-minimize/README.md): 學習如何配置以減少 bundle 體積
- [建立 webpack 生產環境 - 切割代碼](../25-production-code-splitting/README.md): 學習如何切割代碼輸出多個 bundle
- [建立 webpack 生產環境 - 快取](../26-production-caching/README.md): 配置瀏覽器快取最佳化輸出
- [建立 webpack 生產環境 - 分析 bundle 構成](../27-production-analyze/README.md): 學習追蹤 bundle 狀況
- [配置多模式專案](../28-config-setup/README.md): 學習如何在同專案中多模式的配合

### 第四章: 解構 webpack

- [自己動手寫 webpack](../29-write-your-webpack/README.md): 理解 bundle 原理，並模仿 webpack 自己開發一個簡易的打包器

## 推薦網站

下面是我在寫文章的時候經常參考的網站:

- [GitHub: webpack/webpack](https://github.com/webpack/webpack): webpack 代碼庫， [examples](https://github.com/webpack/webpack/tree/master/examples) 值得一看，對於各種情境以例子說明
- [Webpack 官網](https://webpack.js.org/): webpack 官方網站，官方文件非常豐富，但稍嫌雜亂
- [SURVIVEJS — WEBPACK](https://survivejs.com/webpack/): 進階的 webpack 教學書，作者為 Juho Vepsäläinen ，是 webpack 核心團隊成員

## GitHub Repository

本系列的 Repo 在 [peterhpchen/webpack-quest](https://github.com/peterhpchen/webpack-quest) ，需要使用範例代碼可以從這裡取用，如果對文章內容有任何問題，都歡迎發 Issue ，謝謝各位大大。

## 總結

這次鐵人賽的結束，也只是下次旅程的開始，在 10 月 10 日的時候， [webpack 5 正式發佈](https://webpack.js.org/blog/2020-10-10-webpack-5-release/)了，帶來了更好的效能、更少的配置，但是其基本概念是不變的，只要記得這系列中各個打包的核心概念，相信不管版本更新到幾版，甚至 webpack 被其他更好的工具所取代，在這段時間所學的概念，絕對會一直用到。

謝謝大家跟我一起經歷了一段奇幻旅程，有機會會再見的 :) 。
