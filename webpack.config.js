'use strict'

module.exports = {
  entry: './client/app.js', // entry point is the app.js in the client folder of the project folder
  mode: 'development',
  output: {
    path: __dirname, // bundle.js will also be in the public folder
    filename: './public/bundle.js'
  },
  devtool: 'source-maps',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
