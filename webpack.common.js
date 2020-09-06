const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'PRODUCTION';

module.exports = {
    entry : './src/index.js',
    output : {
        path : path.resolve(__dirname,'dist'),
        filename : '[name].[chunkhash].js'
    },
    module : {
        rules:[
            {
                test : /\.css$/i,
                use : [
                    // {
                    //     loader:'style-loader',
                    //     options:{
                    //         injectType:'singletonStyleTag'
                    //     }
                    // },
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader:'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            {
                test : /\.hbs$/i,
                use : ['handlebars-loader']
            },
            {
                test : /\.(png|jpe?g|gif)$/i,
                use : [
                    {
                        loader : 'file-loader',
                        options : {
                            name () {
                                if(!isProduction) {
                                    return '[path][name].[ext]';
                                }
                                return '[path][contenthash].[ext]';
                            },
                            publicPath: 'assets/',
                            outputPath : 'assets/'
                        }
                    }
                ]
            },
            {
                test : /\.svg$/i,
                use : [{
                    loader : 'url-loader',
                    options : {
                        limit : 8192
                    }
                }]
            },
        ]       
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename : '[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            title : 'funny',
            template: './template.hbs',
            meta : {
                viewport: 'width=device-width, initial-scale=1'
            },
            minify: isProduction ? {
                collapseWhitespace: true,
                useShortDoctype: true,
                removeScriptTypeAttributes: true
            } : false
        }),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            IS_PRODUCTION : isProduction
        })
    ]
}