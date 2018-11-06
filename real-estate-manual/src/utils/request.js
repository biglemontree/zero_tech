import axios from 'axios'
import store from 'store'
// import appStore from '@/store'

// const baseURL = 'http://2121k4a180.iask.in:11898/jlbdc_gzh/'
const baseURL = 'http://118.89.65.103:8080/jlbdc_gzh/'
const imgURL = 'http://118.89.65.103:8080/rs/'
const service = axios.create({
    baseURL,
    method: 'post',
    timeout: 15000
})
service.interceptors.request.use(options => {
    console.log('request: ', options)
    const config = options   
    // const method = options.method.toUpperCase()
    const field = 'data' // method === 'GET' ? 'params' : 'data'
    // 添加token到查询参数中
    if (store.token ) {
        config.data.token = store.token
    } 
    // else if(config.data.url.includes('')){

    // }
    config[field] = { ...options[field], token:  store.get('token')}

    return config
}, error => Promise.reject(error))

service.interceptors.response.use(
    response => {
        console.log('response: ', response.data)
        const { data } = response
        const {code} = data.msg
        // Do something
        if (+code === 1) {
            return data
        } else if(code === 422) {
            // window.location = "/#/agree"
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
    const loading = weui.loading('加载中')
    return service(params).then(res => {
        loading.hide()
        // appStore.updateTimer().setLoading(false)
        return res
    }).catch(res => {
        console.log('request.error: ', res)
        loading.hide()
        const {code, msg} = res.msg
        // appStore.setLoading(false)
        // 网络异常等情况，拿到的是string类型的错误信息
        if (typeof res === 'string') {
            // 为兼容后端返回的数据，这里把res封装到message中
            const error = { message: res }
            if (ignoreError !== true) {
                weui.alert(msg)
                // appStore.setError(error)
            }
            return Promise.reject(error)
        }

        // 422 token失效
        if (+code === 422) {
            // appStore.setToken(null)

            window.location = "/dist/#/agree"
        }

        // 接口如果需要在外边需要异常，需要设置ignoreError = true
        if (ignoreError !== true) {
            // appStore.setError(res)
            weui.alert(msg)
        }

        return Promise.reject(res)
    })
}

// function
export {
    baseURL,
    imgURL
}
export default request
