const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map', // any 'source-map'-like devtool is possible
    module: {
        loaders: [
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3|json|popup)$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            exclude:  ['icon.png', 'manifest.json', 'popup'],
            verbose:  true,
            dry:      false
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/manifest.json',
                to: 'manifest.json'
            },
            {
                from: 'src/icon.png',
                to: 'icon.png'
            },
            {
                from: 'src/popup',
                to: 'popup'
            }
        ])
    ]
};