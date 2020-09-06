const { merge } = require('webpack-merge');
const common = require('./webpack.common'); 
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const config = {
    plugins : [
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
    mode : 'production' //압축(js, json 만)
}

module.exports = merge(common, config);