// @flow

const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const {default: generateConfig} = require('@coorpacademy/webpack-config');

const defaultConfig = generateConfig(process.env.NODE_ENV);

const rules = defaultConfig.module.rules.filter(({loader}) => loader !== 'babel-loader');

const babelLoader = defaultConfig.module.rules.find(({loader}) => loader === 'babel-loader');

module.exports = {
  ...defaultConfig,
  entry: {
    mobile: path.join(__dirname, './index.web.js')
  },
  output: {
    library: 'Mobile',
    path: path.resolve(__dirname, 'dist'),
    filename: 'mobile.js'
  },
  module: {
    rules: [
      ...rules,
      {
        ...babelLoader,
        options: {
          ...babelLoader.options,
          presets: [...babelLoader.options.presets, 'react-native'],
          plugins: [
            ...babelLoader.options.plugins,
            '@babel/plugin-syntax-class-properties',
            '@babel/plugin-proposal-class-properties'
          ]
        }
      },
      {
        test: /\.(png|jpe?g|gif|mp4)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    ...defaultConfig.plugins,
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ],
  resolve: {
    ...defaultConfig.resolve,
    alias: {
      'react-native$': 'react-native-web'
    },
    extensions: ['.web.js', '.js', '.json']
  }
};
