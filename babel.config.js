const path = require('path');

module.exports = {
  presets: [
    ['@babel/preset-env', { modules: 'commonjs' }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript'
  ],
  plugins: [
    'react-native-web',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    ['module-resolver', {
      alias: {
        '@react-native/assets-registry': './src/assets-registry',
        '@react-native/assets-registry/registry': './src/assets-registry/registry'
      }
    }]
  ]
};
