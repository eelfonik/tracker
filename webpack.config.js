var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        './src/app'
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,         // Match both .js and .jsx files
                exclude: /node_modules/,
                loaders: ['babel?presets[]=es2015,presets[]=react'],
                include: path.join(__dirname, 'src')
            },
            {
                test:   /\.css$/,
                loaders: [
                    'style-loader',
                    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                    'postcss-loader?sourceMap=inline'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx','.css']
    },
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};