# 載入圖片資源

> 本文介紹如何使用 webpack 載入圖片資源，並對載入做最佳化處理。

網頁載入圖片的方式有很多，可以直接用路徑載入，或是轉為 data URL 載入， svg 格式甚至可以用 inline 的方式嵌入 HTML 。這些載入方式都可以藉由 webpack 來達成，甚至做最佳化的處理。接下來就來講解如何使用 webpack 載入圖片資源。

## 使用路徑載入

使用 `file-loader` 載入的圖片會被放到輸出的路徑下，並且將引入的路徑轉為輸出的路徑。

### 安裝 `file-loader`

```bash
npm install -D file-loader
```

## 參考資料

- [file-loader](https://webpack.js.org/loaders/file-loader/)
