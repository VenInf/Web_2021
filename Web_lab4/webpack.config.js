const path = require('path');

module.exports = {
    entry: './public/styles/style.min.css',
    module: {
        rules: [
            { test: /.css$/, use: [ 'style-loader', 'css-loader' ] },
        ]
    },
    output: {
        path: path.resolve(__dirname, 'public/'),
        filename: 'index_bundle.js'
    }
}