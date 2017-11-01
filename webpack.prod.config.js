/********************************************
 * Config for production
 ********************************************/
var path = require('path');
var webpack = require('webpack');
var ProjCfg = require('./project.js');

// package css 
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// html webpack plugin 
var HtmlWebpackPlugin = require('html-webpack-plugin');

// root path
var ROOT_PATH = path.resolve(__dirname);

// app path
var APP_PATH = path.resolve(ROOT_PATH, 'src');

// app.js path
var APP_FILE = path.resolve(APP_PATH, 'app');

// build ouput path
var BUILD_PATH = path.resolve(ROOT_PATH, ProjCfg.base.DistPath + '/public');

module.exports = {
    entry: {
        app: APP_FILE,
    },
    output: {
        path: BUILD_PATH,
        publicPath: '/public/',
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash:5].min.js',
    },
    babel: {
        presets: ['es2015', 'stage-3', 'react'],
        plugins: ['transform-runtime', ['import', {
          libraryName: 'antd',
          style: true
        }]]
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', ['css']), // 用这种方式写的，表示此类文件单独打包成一个css文件
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('style', ['css', 'stylus'])
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', ['css','less']),
            },
            { 
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', ['css','sass']),
            },
            {
                test: /\.(eot|woff|svg|ttf|woff2|appcache|mp3|pdf)(\?|$)/,
                exclude: /node_modules/,
                loader: 'file-loader?name=files/[hash:8].[name].[ext]',
            },
            {
                test: /\.(png|jpg|gif)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=8192&name=imgs/[hash:8].[name].[ext]',
                // 设置limit参数，当图片大小小于这个限制的时候，会自动启用base64编码图片
            },
            {
                test: /\.json$/,
                loaders: ['json']
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({ // 设置webpack 打包模式
            'process.env': {
                NODE_ENV: JSON.stringify('production') // 定义生产环境
            }
        }),
        new HtmlWebpackPlugin({  // 根据模板插入css/js等生成最终HTML
            filename: '../index.html', 
            template: './src/static/index_prod.html',
            favicon: './src/static/favicon.ico', 
            inject: true, 
            hash: true, 
        }),
        
        new ExtractTextPlugin('[name].css'),

        // webpack遍历所有模块，这个模块不是在src中的，就提取到公共js中
        new webpack.optimize.CommonsChunkPlugin('common', 'common.min.js', (module, count) =>
      module.resource && module.resource.indexOf(APP_PATH) === -1),

        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false, 
            },
            compress: {
                warnings: false, 
                drop_console: true, // 是否删除所有的console
            },
        }),
    ],

    resolve: {
        extensions: ['', '.js', '.jsx', '.less', '.css', 'scss'],
    }
};