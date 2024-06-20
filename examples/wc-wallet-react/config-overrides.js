const webpack = require('webpack')

module.exports = function override(config) {
  config.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
      fallback: {
        vm: require.resolve('vm-browserify'),
        crypto: require.resolve('crypto-browserify'),
        querystring: require.resolve('querystring-es3'),
        stream: require.resolve('stream-browserify'),
        events: require.resolve('events'),
        buffer: require.resolve('buffer/'),
      },
    },
  })

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ])

  return config
}
