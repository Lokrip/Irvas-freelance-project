const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require("path")

module.exports = (env) => {
    const isDev = env.mode === "development"

    return {
        mode: env.mode ?? "development",
        entry: path.resolve(__dirname, "src", "js", "main.js"),
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].[contenthash].js",
            clean: true,
            assetModuleFilename: 'assets/img/[hash][ext][query]'
        },
        plugins: [
          new HtmlWebpackPlugin({template: path.resolve(__dirname, "src", "index.html")}),
          !isDev && new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css",
          }),
          new CopyWebpackPlugin({
            patterns: [
              { from: path.resolve(__dirname, "src", "assets", "img"), to: "assets/img" }
            ]
          })
        ].filter(Boolean),
        devtool: 'source-map',
        module: {
          rules: [
            {
              test: /\.css$/i,
              use: [
                  isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                  "css-loader",
              ],
            },
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [['@babel/preset-env', {
                    debug: true,
                    corejs: 3,
                    useBuiltIns: 'usage',
                  }]],
                },
              },
            },
          ],
        }
    }
}