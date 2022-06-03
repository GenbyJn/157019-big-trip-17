const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    clean: true,
  },
  devtool: 'source-map',
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public' }],
    }),
  ],
  module: {
    rules: [
      {
        test : /\.js$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@view': path.resolve(__dirname, 'src/view'),
      '@edit-point-header': path.resolve(__dirname, 'src/view/edit-point/header'),
      '@filters': path.resolve(__dirname, 'src/view/filters'),
      '@info': path.resolve(__dirname, 'src/view/info'),
      '@sort': path.resolve(__dirname, 'src/view/sort'),
      '@presenter': path.resolve(__dirname, 'src/presenter'),
    },
  }
}