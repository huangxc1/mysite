module.exports = {
    configureWebpack: require("./webpack.config"),
    publicPath: './',
  

    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:7001',
            },
            '/static': {
                target: 'http://localhost:7001',
            }
        }
    },
   
}