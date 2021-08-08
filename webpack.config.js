const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: path.join(__dirname, 'frontend', 'app.js'),
    mode: 'production',
    output: {
        path: path.join(__dirname, 'backend', 'public'),
        filename: 'js/bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    devMode ? 'style-loader' : MiniCSSExtractPlugin.loader,
                    'css-loader',
                ],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'frontend', 'index.html'),
            minify: {
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
            },
        }),
        new MiniCSSExtractPlugin({
            filename: 'css/bundle.css',
        }),
    ],
};
