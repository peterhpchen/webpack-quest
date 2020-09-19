# 模組 Module

> 本文講解 Webpack 中 `module` 屬性的設定方式。

`module` 屬性設定 webpack 應該怎麼處理各個不同類型的模組。

## Loaders 的執行順序

Loaders 的執行順序都是由後往前依序執行的，但有些設定可以自訂執行順序。

## `module.rules` 的設定方式

`module.rules` 配置了模組如何處理的設定。它的設定主要分為兩個部分：

- 判斷類：使用條件篩選出適合此規則的模組，例如上節的 `test` 。
- 使用類：對於此規則要使用何種處理方式，例如上結的 `use` 。

## 判斷類

判斷的屬性有下面幾類：

- `test`: 包含匹配任意規則的模組
- `include`: 包含匹配任意規則的模組
- `exclude`: 排除匹配任一規則的模組
- `and`: 包含匹配所有規則的模組，須在 `resource`, `issuer` 中使用。
- `or`: 包含匹配任意規則的模組，須在 `resource`, `issuer` 中使用。
- `not`: 排除匹配任一規則的模組，須在 `resource`, `issuer` 屬性中使用。

判斷類的屬性是設定此規則是用哪些模組，它的判斷依據有兩類：

- 資源本身(resource)：**被請求的**模組的絕對路徑
- 資源使用者(issuer)：**請求模組的**模組的絕對路徑

以上節的例子來說，在 `./src/index.js` 中使用 `import style from "./style.css"` 引入 `style.css`：

- resource 為 `/absolute-path/src/style.css`
- issuer 為 `/absolute-path/src/index.js`

依照判斷依據的不同，分別使用 `resource` 與 `issuer` 設定兩個不同類別。

### `resource`

## `module.rules.use`

## 參考資料

- [Webpack Docuementation: Configuration - Module](https://v4.webpack.js.org/configuration/module/)
