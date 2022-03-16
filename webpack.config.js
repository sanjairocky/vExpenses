const path = require("path");
const dotenv = require("dotenv");

const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
  const basePath = path.join(__dirname, ".env");

  const envPath = basePath + "." + env.ENVIRONMENT;

  const envKeys = Object.fromEntries(
    Object.entries(
      dotenv.config({
        path: require("fs").existsSync(envPath) ? envPath : basePath,
      }).parsed
    ).map(([k, v]) => [k, JSON.stringify(v)])
  );

  return {
    mode: env.PROFILE || "development",
    entry: {
      app: "./src/index.js",
    },
    devtool: "inline-source-map",
    devServer: {},
    output: {
      filename: "js/[name].bundle.js",
      path: path.resolve(__dirname, "dist"), // base path where to send compiled assets
      publicPath: "", // base path where referenced files will be look for
      pathinfo: false,
    },
    resolve: {
      extensions: ["*", ".js", ".jsx"],
      alias: {
        "@": path.resolve(__dirname, "src"), // shortcut to reference src folder from anywhere
        components: path.resolve(__dirname, "src", "components"),
        pages: path.resolve(__dirname, "src", "pages"),
        util: path.resolve(__dirname, "src", "util"),
        context: path.resolve(__dirname, "src", "context"),
        api: path.resolve(__dirname, "src", "api"),
        schemas: path.resolve(__dirname, "src", "schemas"),
      },
    },
    optimization: {
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false,
      runtimeChunk: true,
    },
    module: {
      rules: [
        {
          // config for es6 jsx
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          // config for images
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "images",
              },
            },
          ],
        },
        {
          // config for fonts
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "fonts",
              },
            },
          ],
        },
        {
          test: /\.(csv|tsv)$/,
          use: ["csv-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        filename: "index.html",
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: "./public/" }],
      }),
      new MiniCssExtractPlugin({
        // plugin for controlling how compiled css will be outputted and named
        filename: "css/[name].css",
        chunkFilename: "css/[id].css",
      }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          "css/*.*",
          "js/*.*",
          "fonts/*.*",
          "images/*.*",
        ],
      }),
      new DefinePlugin(envKeys),
    ],
  };
};
