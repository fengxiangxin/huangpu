// import request from '@/utils/request'
const Qs = require('qs')

let weatherService = {
  getCimWeather() {
    return request({
      url: '/CimWeather/list',
      method: 'get',

    })
  },
  updataCimWeather(data) {
    return request({
      url: '/CimWeather/?' + Qs.stringify(data),
      method: 'put',

    })
  },
  getCurrentUser() {
    return request({
      url: '/Login/getCurrentUser',
      method: 'post'
    })
  }
}

export default weatherService