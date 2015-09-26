var path = require('path');
var webpack = require('webpack');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

var appDir = path.join(__dirname, 'src');

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: appDir,
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    plugins: [
        new ngAnnotatePlugin({
            add: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
            minChunks: function (module, count) {
                /**
                 * if you're wondering why bootstrap or other vendor sass modules are not included in the vendor file,
                 * check out this github issue https://github.com/jtangelder/sass-loader/issues/164
                 **/
                return module.resource && module.resource.indexOf(appDir) === -1;
            }
        }),
        new webpack.DefinePlugin({
            GOOGLE_ANALYTICS_CONFIG: 'your ga key or config object here'
        })
    ],
    module: {
        loaders: [
            // SASS
            { test: /\.scss$/, loader: 'style!css!sass' },
            // babel/eslint
            { test: /\.js?$/, exclude: /(node_modules)/, loader: 'babel!eslint-loader' },
            // fonts/images
            { test: /\.(eot|woff|ttf$|woff2|ttf|svg|png|jpg)$/, loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]' }
        ]
    }
};