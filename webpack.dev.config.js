/********************************************
 * Config for develop 
 ********************************************/
var path = require('path');
var webpack = require('webpack');
var ProjCfg = require('./project.js');

// root path
var ROOT_PATH = path.resolve(__dirname);

// app path
var APP_PATH = path.resolve(ROOT_PATH, 'src');

// app.js path
var APP_FILE = path.resolve(APP_PATH, 'app');

// build output path
var BUILD_PATH = path.resolve(ROOT_PATH, '/dev'); // exits only in memory

var ExtractTextPlugin = require("extract-text-webpack-plugin");  //css单独打包
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: [
            'webpack-hot-middleware/client', // support hot update
            APP_FILE
        ]
    },
    output: {
        publicPath: '/dev/',
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    babel: {
        presets: ['es2015', 'stage-3', 'react'],
        plugins: ['transform-runtime', ['import', {
          libraryName: 'antd',
          style: true // for `antd` library [auto load `css` `sass`]
        }]]
    },
    module: {
        preLoaders: [
          {
            test: /\.js?$/,
            loader: 'eslint',
            exclude: /node_modules/,
          },
        ],
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel-loader?presets[]=react,presets[]=es2015'],
                // query: {
                //     cacheDirectory: true,
                //     presets: ['react', 'es2015']
                //   },
                include: [APP_PATH]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
                // loaders: ['css']
            },
            {
                test: /\.styl$/,
                loaders: ['style', 'css', 'stylus']
            },
            {
                test: /\.less$/,
                loaders: ['style', 'css', 'less']
            },
            {
                test: /\.scss$/,
                // loaders: ['css','postcss','sass']
                loader: 'style!css!sass'
            },
            {
                test: /\.(eot|woff|svg|ttf|woff2|appcache|mp3|pdf)(\?|$)/,
                exclude: /node_modules/,
                loader: 'file-loader?name=[name].[ext]',
                include: [APP_PATH]
            },
            {
                test: /\.(png|jpg|gif)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
                //设置limit参数，当图片大小小于这个限制的时候，会自动启用base64编码图片
                include: [APP_PATH]
            },
            {
                test: /\.json$/,
                loaders: ['json']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // plugin for hot update
        new webpack.NoErrorsPlugin() // do not stop serve when error occurred
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.less', '.css', 'scss'],
    }
};