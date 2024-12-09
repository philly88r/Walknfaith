const webpack = require('webpack');

class WebpackCryptoPlugin {
  apply(compiler) {
    compiler.options.resolve = compiler.options.resolve || {};
    compiler.options.resolve.fallback = compiler.options.resolve.fallback || {};
    compiler.options.resolve.fallback.crypto = require.resolve('crypto-browserify');
    
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    }).apply(compiler);
  }
}

module.exports = WebpackCryptoPlugin;
