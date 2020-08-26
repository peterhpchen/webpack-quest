# What and Why

webpack 是 **JavaScript 應用程式的靜態模塊綑綁器**。它可以將應用程式中某個檔案做為入口(entry)，建構出相依圖(dependency graph)，最後依照相依圖將所有的模塊(module)綁成捆(bundle)。瀏覽器就只需引入這個 bundle 就可以執行應用程式了。

下面以簡單的例子讓大家了解為什麼要使用 webpack 。

## 沒有 webpack 時

在沒有 webpack 這類的綑綁工具時， 開發者會使用 `<script>` 、 `<link>` 各別引入不同的資源：

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.20/lodash.min.js"></script>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <script src="./index.js"></script>
  </body>
</html>
```

這樣會產生下列問題：

- 全域變數衝突
-
