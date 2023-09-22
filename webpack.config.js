const path = require('path');

module.exports = {
  watch: true,
  mode: 'production',
  entry: {
    main: [
      './js/createHTML.js',
      './js/gameProcess.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'bundle',
    },
  }
};
