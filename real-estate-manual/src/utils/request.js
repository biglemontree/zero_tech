import axios from 'axios'

// import appStore from '@/store'

const service = axios.create({
    baseURL: 'http://2121k4a180.iask.in:11898/jlbdc_gzh/',
    method: 'post',
    timeout: 15000
})
axios.defaults.withCredentials = true
service.interceptors.request.use(options => {
    console.log('request: ', options)
    const config = options
    // const method = options.method.toUpperCase()
    const field = 'params' // method === 'GET' ? 'params' : 'data'
    // const token = appStore.token
    // config.headers['TOKEN'] = 'token'

    // 添加token到查询参数中
    // if (token) {
    // }
    config[field] = { ...options[field] }

    return config
}, error => Promise.reject(error))

service.interceptors.response.use(
    response => {
        console.log('response: ', response.data)
        const { data } = response
        const code = String(data.retcode)
        // Do something
        if (+code === 0) {
            return data
        }

        return Promise.reject(data)
    },
    error => Promise.reject(error)
)

/**
 * axios封装
 * @param  {Object} params      axios 的请求参数
 * @param  {Boolean} ignoreError 是否忽略错误，用来自己处理异常
 * @return {Promise}             返回一个Promise对象
 */
function request(params, ignoreError) {
    // appStore.setLoading(true)
    return service(params).then(res => {
        // appStore.updateTimer().setLoading(false)
        return res
    }).catch(res => {
        console.log('request.error: ', res)
        // appStore.setLoading(false)
        // 网络异常等情况，拿到的是string类型的错误信息
        if (typeof res === 'string') {
            // 为兼容后端返回的数据，这里把res封装到message中
            const error = { message: res }
            if (ignoreError !== true) {
                // appStore.setError(error)
            }
            return Promise.reject(error)
        }

        const code = String(res.code)

        // 121 token失效，128用户被冻结
        if (code === '121' || code === '128') {
            // 当前系统使用的是 HashRouter，所以这里取hash部分
            const href = window.location.hash
            const loginPath = '#/login'

            // appStore.setToken(null)

            // 如果当前不是在登录页，即跳转到登录
            if (href.indexOf(loginPath) === -1) {
                window.location = '/'
                return false
            }
        }

        // 接口如果需要在外边需要异常，需要设置ignoreError = true
        if (ignoreError !== true) {
            // appStore.setError(res)
        }

        return Promise.reject(res)
    })
}

export default request
