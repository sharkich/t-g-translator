const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map', // any 'source-map'-like devtool is possible
    resolve: {
        extensions: ['.ts']
    },
    module: {
        loaders: [
            {
                test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3|json|popup)$/,
                loader: 'file-loader'
            },
            {
                test: /\.ts?$/,
                loader: 'ts-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            exclude: ['icon.png', 'manifest.json', 'popup', 'bundle.style.js'],
            verbose: true,
            dry: false
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