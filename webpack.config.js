const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname);
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: {
    app: path.join(appDirectory, 'src/index.web.tsx'),
  },
  output: {
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
    filename: 'app-[contenthash].bundle.js',
  },
  devServer: {
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
    alias: {
      'react-native$': 'react-native-web',
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
        test: /\.(tsx|ts|jsx|js|mjs)$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'App.tsx'),
          path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
          path.resolve(__dirname, 'node_modules/@react-navigation'),
          path.resolve(__dirname, 'node_modules/react-native-safe-area-context'),
          path.resolve(__dirname, 'node_modules/@expo/vector-icons'),
          path.resolve(__dirname, 'node_modules/react-native-paper'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  browsers: ['last 2 versions', 'not dead', '> 0.2%']
                },
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
        test: /\.(gif|jpe?g|png|svg)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
    }),
    new webpack.DefinePlugin({
      __DEV__: isDevelopment,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      global: {}
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ]
};
