const path = require('path');

module.exports = {
  watch: true,
  mode: 'development',
  entry: {
    main: [
      './minesweeper/js/createHTML.js',
      './minesweeper/js/placeMines.js',
      './minesweeper/js/gameProcess.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'minesweeper/dist'),
    filename: 'bundle.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'bundle',
    },
  }
};