const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: './src/index.js',
        main2: './src/index2.js',
    },
    output: {
        // filename: '[hash].js'
        // filename: '[chunkhash].js'
        filename: '[contenthash].js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            // filename: '[hash].css'
            // filename: '[chunkhash].css'
            filename: '[contenthash].css'
        })
    ],
    module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                // options: {
                //   publicPath: '/',
                // },
    
              },
              'css-loader',
            ],
          },
        ],
      },
}