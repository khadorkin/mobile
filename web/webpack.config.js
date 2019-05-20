// @flow

const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const {default: generateConfig} = require('@coorpacademy/webpack-config');

const ROOT_DIRECTORY = path.join(__dirname, '..');

const defaultConfig = generateConfig(process.env.NODE_ENV);
const rules = defaultConfig.module.rules.filter(({loader}) => loader !== 'babel-loader');
const babelLoader = defaultConfig.module.rules.find(({loader}) => loader === 'babel-loader');

module.exports = {
  ...defaultConfig,
  entry: {
    mobile: path.join(ROOT_DIRECTORY, 'index.web.js')
  },
  output: {
    library: 'Mobile',
    path: path.resolve(ROOT_DIRECTORY, 'dist'),
    filename: 'mobile.js'
  },
  module: {
    rules: [
      ...rules,
      {
        ...babelLoader,
        include: [
          path.resolve(ROOT_DIRECTORY, 'app.json'),
          path.resolve(ROOT_DIRECTORY, 'index.web.js'),
          path.resolve(ROOT_DIRECTORY, 'src'),
          path.resolve(ROOT_DIRECTORY, 'storybook'),
          // path.resolve(ROOT_DIRECTORY, 'node_modules/@coorpacademy/react-native-video-controls'),
          path.resolve(ROOT_DIRECTORY, 'node_modules/@coorpacademy/react-native-deck-swiper'),
          path.resolve(ROOT_DIRECTORY, 'node_modules/@react-navigation'),
          path.resolve(ROOT_DIRECTORY, 'node_modules/react-navigation'),
          path.resolve(ROOT_DIRECTORY, 'node_modules/react-native-snap-carousel'),
          // path.resolve(ROOT_DIRECTORY, 'node_modules/react-native-gesture-handler'),
          path.resolve(ROOT_DIRECTORY, 'node_modules/react-native-swipe-gestures'),
          path.resolve(ROOT_DIRECTORY, 'node_modules/react-native-card-flip'),
          path.resolve(ROOT_DIRECTORY, 'node_modules/react-native-tab-view'),
          path.resolve(ROOT_DIRECTORY, 'node_modules/react-native-gesture-handler'),
          // path.resolve(ROOT_DIRECTORY, 'node_modules/rn-fetch-blob'),
          path.resolve(ROOT_DIRECTORY, 'node_modules/react-native-keyboard-aware-scroll-view'),
          path.resolve(ROOT_DIRECTORY, 'node_modules/apsl-react-native-button'),
          // path.resolve(ROOT_DIRECTORY, 'node_modules/react-native-status-bar-height'),
          path.resolve(ROOT_DIRECTORY, 'node_modules/react-native-picker-select'),
          path.resolve(ROOT_DIRECTORY, 'node_modules/react-native-linear-gradient'),
          path.resolve(ROOT_DIRECTORY, 'node_modules/react-native-modal'),
          path.resolve(ROOT_DIRECTORY, 'node_modules/react-native-confetti-cannon'),
          path.resolve(ROOT_DIRECTORY, 'node_modules/react-native-animatable'),
          // path.resolve(ROOT_DIRECTORY, 'node_modules/react-native-orientation-locker'),
          path.resolve(ROOT_DIRECTORY, 'node_modules/react-native-sideswipe')
          // path.resolve(ROOT_DIRECTORY, 'node_modules/react-native-video')
        ],
        options: {
          ...babelLoader.options,
          presets: [...babelLoader.options.presets, 'react-native'],
          plugins: [
            ...babelLoader.options.plugins,
            // 'babel-polyfill',
            // 'module:react-native-web',
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
      template: path.join(ROOT_DIRECTORY, 'web/index.html'),
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
