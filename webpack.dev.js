const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const config = {
    mode : 'development',
    devServer : {
        historyApiFallback : {
            rewrites : [
                { from : /^\/subpage$/ , to:'subpage.html'},
                { from : /./, to: '404.html' }
            ]
        },
        open:false, //새 탭에서 실행됨. false : 기존 탭에서 실행
        overlay:true, // 에러메세지를 콘솔창이나 로그가 아닌 브라우저 화면에서 보여줌
        port:8080, //포트 변경
    },
    plugins : [
        new StyleLintPlugin()
    ]
}

module.exports = merge(common, config);
