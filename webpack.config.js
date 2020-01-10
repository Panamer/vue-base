const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, "src/index.js"),
    output: {
        chunkFilename: "[name].[hash:6].js",
        sourceMapFilename: "[name]-[chunkhash].map",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: "/\.vue$/",
                use: "vue-loader"
            }
        ]
    }
}