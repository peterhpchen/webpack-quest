const path = require('path');

module.exports = [{
    name: 'dev',
    mode: 'development',
    entry: './src/index2.js'
},{
    name: 'prod',
    mode: 'production',
    entry: './src/index2.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    }
}]