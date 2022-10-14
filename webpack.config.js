import path from "path";

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, `./src/upload/postImages`),
    filename: "index.bundle.js",
  },
  devServer: {
    port: 3000,
    watchContentBase: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.{png|sv|jpg|jpeg|gif|ico}$/,
        use: ["file-loader"],
      },
    ],
  },
};
