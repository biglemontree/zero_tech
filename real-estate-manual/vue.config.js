module.exports = {
    // 修改的配置
    baseUrl: process.env.NODE_ENV === 'production'
        ? '/dist/'
        : '/',
    devServer: {
        // host: 'localhost',
        // port: 8080,
        proxy: 'http://2121k4a180.iask.in:11898/',
    }    
}