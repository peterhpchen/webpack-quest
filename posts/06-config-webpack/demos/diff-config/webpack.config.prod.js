const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index2.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    }
}