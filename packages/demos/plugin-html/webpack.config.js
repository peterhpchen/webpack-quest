const { NamedModulesPlugin } = require("webpack");

const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    plugins: [new HTMLWebpackPlugin({
        title: 'Webpack Demo: Plugin HTML'
    })]
}