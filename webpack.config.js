const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
    entry : './index.js',
    output : {
        path : path.resolve(__dirname,'dist'),
        filename : '[name].[chunkhash].js'
    },
    module : {
        rules : [
            {
                test : /\.css$/i,
                use : [
                    // {
                    //     loader : 'style-loader',
                    //     options : {
                    //         injectType : 'singletonStyleTag'
                    //     }
                    // },
                    {
                        loader : MiniCssExtractPlugin.loader
                    }
                    ,
                    {
                        loader : 'css-loader',
                        options : {
                            modules : true
                        }
                    }
                ]
            },
            {
                test : /\.hbs$/i,
                use : ['handlebars-loader']
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
            minify : {
                collapseWhitespace : true,
                useShortDoctype : true,
                removeScriptTypeAttributes : true
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename : '[contenthash].css'
        }),
        new OptimizeCssAssetsPlugin({ //css 최적화, css 컴프레서
            assetNameRegExp: /\.css$/i,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
              preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        })
    ],
    optimization : {
        runtimeChunk : {
            name : 'runtime'
        },
        splitChunks : {
            cacheGroups : {
                common : {
                    test : /[\\/]node_modules[\\/]/,
                    name : 'vendors',
                    chunks : 'all'
                }
            }
        },
        minimize : true,
        minimizer : [
            new TerserWebpackPlugin({
                cache : true
            })
        ]
    },
    mode : 'none'
    // mode : 'production' //압축(js, json 만)
}