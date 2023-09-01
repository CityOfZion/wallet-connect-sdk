module.exports = function override(config) {
    config.module.rules.push({
        test: /\.m?js/,
        resolve: {
            fullySpecified: false,
            fallback: {
                "crypto": require.resolve("crypto-browserify"),
                "querystring": require.resolve("querystring-es3"),
                "stream": require.resolve("stream-browserify")
            }
        }
    })
    return config;
}
