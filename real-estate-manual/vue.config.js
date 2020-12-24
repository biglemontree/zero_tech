module.exports = {
    // 修改的配置
    baseUrl: '/dist/',
    
    // process.env.NODE_ENV === 'production'
    //     ? '/dist/'
    //     : '/',
    devServer: {
        proxy: 'http://2121k4a180.iask.in:11898/',
        port: 8000, // 端口
    }    
}