module.exports = {
    // publicPath: './',
    // productionSourceMap: false,
    // outputDir: 'dist', // 构建输出目录
    // assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)

    devServer: {
        // 设置主机地址
        host: 'localhost' || '0.0.0.0',
        // 设置默认端口
        port: 8082,
        open:true,
        // 设置代理
        proxy: {
            '/api': {
                // 目标 API 地址
                target: 'http://localhost:8085',
                // 如果要代理 websockets
                ws: true,
                // 将主机标头的原点更改为目标URL
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    }
}