const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: "./index.js",

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js"
  },

  resolve: {
    extensions: [".js", ".jsx", "scss"]
  },

  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, "./dist"),
    publicPath: "/",
    host: "localhost",
    port: 8080
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
          "sass-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader:
              "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "less-loader",
            options: {
              modifyVars: {
                "primary-color": "#330A6D",
                "border-radius-base": "0px"
              },
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
        use: "file-loader?name=[name].[ext]?[hash]"
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
      {
        test: /\.otf(\?.*)?$/,
        use:
          "file-loader?name=/fonts/[name].[ext]&mimetype=application/font-otf"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: "./template/index.html"
    })
  ]
};
