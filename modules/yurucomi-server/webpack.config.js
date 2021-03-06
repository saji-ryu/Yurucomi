const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/client/ts/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        exclude: ["/node_modules/"],
        use: {
          loader: "ts-loader",
          options: {
            compilerOptions: {
              target: "es6",
              outDir: "/public",
              lib: ["dom", "es2015", "es2016", "es2017"],
            },
          },
        },
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.scss/, // 対象となるファイルの拡張子
        use: [
          "style-loader",

          {
            loader: "css-loader",
            options: {
              url: false,
              //sourceMap: enabledSourceMap,
              // 2 => postcss-loader, sass-loader
              importLoaders: 2,
            },
          },
          {
            loader: "sass-loader",
            options: {
              //sourceMap: enabledSourceMap,
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: [".js", "jsx", ".ts", ".tsx"],
  },
};
