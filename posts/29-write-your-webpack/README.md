# 自己動手寫 webpack

> 本文會先解析 webpack 的 bundle 結構，之後實作一個簡易的 webpack 。

webpack 將所有的模組打包在單個 bundle 中，本文會藉由輸出的檔案解析 webpack 如何打包模組，並利用其原理複製一個簡易的打包工具。

## 參考資料

- [Youtube: Ronen Amiel - Build Your Own Webpack](https://youtu.be/Gc9-7PBqOC8)
- [GitHub: ronami / minipack](https://github.com/ronami/minipack)
- [GitHub: webpack / webpack](https://github.com/webpack/webpack)
- [Node.js Documentation: File System](https://nodejs.org/api/fs.html)
- [GitHub: acornjs / acorn](https://github.com/acornjs/acorn)
