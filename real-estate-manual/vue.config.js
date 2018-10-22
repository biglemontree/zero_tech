module.exports = {
    // 修改的配置
    // 将baseUrl: '/api',改为baseUrl: '/',
    // baseUrl: 'http://2121k4a180.iask.in:11898/jlbdc_gzh/',
    devServer: {
        // host: 'localhost',
        // port: 8080,
        proxy: 'http://2121k4a180.iask.in:11898/',
        // proxy: {
        //     '/jlbdc_gzh': {
        //         target: 'http://2121k4a180.iask.in:11898/',
        //         changeOrigin: true,
        //         ws: true,
        //         // pathRewrite: {
        //         //     '^/api': ''
        //         // }
        //     }
        // }
    }
}