const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === "PRODUCTION";
const postcssLoader = {
    loader : 'postcss-loader',
    options : {
        config : {
            path: 'postcss.config.js'
        }
    } 
};

module.exports = {
    entry : './src/index.js',
    output : {
        path : path.resolve(__dirname,'dist'),
        filename : '[name].[chunkhash].js'
    },
    module : {
        rules : [ //filename.module.scss => css modules, //filename.scss => global
            {
                test : /\.s?css$/,
                // use : [
                //     // {
                //     //     loader : 'style-loader',
                //     //     options : {
                //     //         injectType : 'singletonStyleTag'
                //     //     }
                //     // },
                //     {
                //         loader : MiniCssExtractPlugin.loader
                //     }
                //     ,
                //     {
                //         loader : 'css-loader',
                //         options : {
                //             modules : true
                //         }
                //     }
                // ]
                oneOf : [
                    {
                        test : /\.module.s?css$/,
                        use : [
                            {
                                loader : MiniCssExtractPlugin.loader
                            },
                            {
                                loader : 'css-loader',
                                options : {
                                    modules : true
                                }
                            },
                            postcssLoader,
                            'sass-loader'
                        ]
                    },
                    {   
                        use : [
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            postcssLoader,
                            'sass-loader'
                        ]
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
            {
                test : /.js/,
                exclude : /node_modules/,
                loader : 'babel-loader'
            }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            title : 'webpack',
            template : './template.hbs',
            meta : {
                viewport: 'width=device-width, initial-scale=1',
                charset : 'UTF-8'
            },
            minify : isProduction ? {
                collapseWhitespace : true,
                useShortDoctype : true,
                removeScriptTypeAttributes : true
            } : false
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename : '[contenthash].css'
        }),
        new webpack.DefinePlugin({
            IS_PRODUCTION : isProduction
        })
    ]
}