const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    clean: true,
    path: path.resolve(__dirname, "dist"),
    filename: "index.[hash].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new ESLintPlugin({
      extensions: ["ts", "tsx"],
    }),
    new HtmlWebpackPlugin({
      title: "Admin panel",
      filename: "index.html",
      template: path.resolve(__dirname, "public", "index.ejs"),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "public",
          globOptions: {
            ignore: ["**/index.ejs"],
          },
        },
      ],
    }),
  ],
  devServer: {
    hot: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 3000,
    client: {
      progress: true,
    },
  },
};
