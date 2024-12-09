const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname);
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/index.web.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
    clean: true,
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
  },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
    alias: {
      'react-native$': 'react-native-web',
      'react-native-vector-icons/MaterialCommunityIcons': '@expo/vector-icons/MaterialCommunityIcons',
      'react-native-vector-icons/MaterialIcons': '@expo/vector-icons/MaterialIcons',
      'react-native-vector-icons/FontAwesome': '@expo/vector-icons/FontAwesome',
      '@expo/vector-icons': '@expo/vector-icons',
      '@react-native/assets-registry': path.resolve(__dirname, './src/assets-registry'),
      '@react-native/assets-registry/registry': path.resolve(__dirname, './src/assets-registry/registry.js')
    },
    fallback: {
      "crypto": false,
      "path": require.resolve("path-browserify"),
      "fs": false,
      "process": require.resolve("process/browser")
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'App.tsx'),
          path.resolve(__dirname, 'node_modules/@expo/vector-icons'),
          path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
          path.resolve(__dirname, 'node_modules/@react-navigation'),
          path.resolve(__dirname, 'node_modules/react-native-safe-area-context'),
          path.resolve(__dirname, 'node_modules/react-native-paper'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { 
                targets: { browsers: ['last 2 versions'] },
                modules: 'commonjs'
              }],
              '@babel/preset-react',
              '@babel/preset-typescript'
            ],
            plugins: [
              'react-native-web',
              '@babel/plugin-transform-runtime'
            ]
          }
        }
      },
      {
        test: /\.ttf$/,
        type: 'asset/resource',
        include: [
          /node_modules\/@expo\/vector-icons\/.*\/Fonts/,
          /node_modules\/react-native-vector-icons\/Fonts/,
        ],
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            esModule: false,
          },
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
      filename: 'index.html',
      inject: true
    }),
    new webpack.DefinePlugin({
      __DEV__: isDevelopment,
      process: { env: { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') } },
      'global.TYPED_ARRAY_SUPPORT': JSON.stringify(false)
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  ]
};
