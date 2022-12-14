const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
  context: path.resolve(__dirname, "./src"),
  resolve: {
    extensions: [".js",".ts", ".tsx"]
  },
  entry: {
    app: "./index.ts",
    vendorStyles: ["../node_modules/bootstrap/dist/css/bootstrap.css"],
    },
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      
     {
       test: /\.scss$/,
       exclude: /node_modules/,
       use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
     
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html", //Name of file in ./dist/
      template: "index.html",
      scriptLoading: "blocking", // Just use the blocking approach (no modern defer or module)
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    port: 8080,
  },
};