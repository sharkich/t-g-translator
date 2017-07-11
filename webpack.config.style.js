const path = require('path');

module.exports = {
    entry: './src/index.scss',
    output: {
        filename: 'bundle.style.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        loaders: [
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    }
};