module.exports = {
  entry: {
    main: './src/index.js',
    main2: './src/index2.js'
  },
  output: {
    filename(chunkData) {
      return chunkData.chunk.name === 'main' ? 'main.js' : `bundle.${chunkData.chunk.name}.js`
    }
  },
};
