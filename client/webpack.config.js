const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  devServer: {
    port: 4200,
    historyApiFallback: true,
    proxy: {
      "/api":
      {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true
      }
    },
  },
  entry: {
    main: './src/main.ts'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader', 'angular2-template-loader'],
        exclude: [/node_modules/]
      },
      {
        test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
        parser: { system: true },
      },
      {
        test: /\.(html|css)$/,
        use: 'raw-loader'
      },
      // {
      //   test: /\.scss$/,
      //   exclude: /node_modules/,
      //   loaders: ['raw-loader', 'sass-loader']
      // },

      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ["raw-loader", "sass-loader",
          {
            loader: 'sass-resources-loader',
            options: {
              resources: ['./src/styles.scss']
            },
          }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    //fixes a compiler warning on build/serve
    new webpack.ContextReplacementPlugin(
      /\@angular(\\|\/)core(\\|\/)f?esm5/, path.join(__dirname, './src')
    )
  ]
};
