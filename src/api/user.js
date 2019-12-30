import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: 'speed-auth-2.1.6.RELEASE/api/user/login',
    method: 'post',
    params: data
  })
}
// 获取用户信息
export function getInfo(token) {
  return request({
    url: 'speed-scene-2.1.3.RELEASE/api/user/info',
    method: 'get',
    params: { token }
  })
}
// 登出
export function logout() {
  return request({
    url: 'speed-auth-2.1.6.RELEASE/api/user/logout',
    method: 'post'
  })
}
// 登录历史
export function getHistory() {
  return request({
    url: 'speed-scene-2.1.3.RELEASE/api/user/history',
    method: 'get',
    params: { history }
  })
}

// 手机发送验证码
export function sendMes(data) {
  return request({
    url: 'speed-auth-2.1.6.RELEASE/smsverification',
    method: 'post',
    params: data
  })
}

// 邮箱发送验证码
export function sendMesEmail(data) {
  return request({
    url: 'speed-auth-2.1.6.RELEASE/contextLoads',
    method: 'post',
    params: data
  })
}

// 手机验证验证码
export function exSendMes(data) {
  return request({
    url: 'speed-auth-2.1.6.RELEASE/SmsVerirandomNum',
    method: 'post',
    params: data
  })
}

// 邮箱验证验证码
export function exSendMesEmail(data) {
  return request({
    url: 'speed-auth-2.1.6.RELEASE/contextLoadsNum',
    method: 'post',
    params: data
  })
}

// 验证手机号是否已注册
export function exPhone(data) {
  return request({
    url: 'speed-auth-2.1.6.RELEASE/api/user/queryByPhone',
    method: 'get',
    params: data
  })
}
// 验证邮箱是否已注册
export function exEmail(data) {
  return request({
    url: 'speed-auth-2.1.6.RELEASE/api/user/queryByEmail',
    method: 'get',
    params: data
  })
}
// 验证公司名是否存在
export function exCompanyName(data) {
  return request({
    url: 'speed-auth-2.1.6.RELEASE/api/user/queryByCorporate',
    method: 'get',
    params: data
  })
}

// 注册用户
export function addUsers(data) {
  return request({
    url: 'speed-auth-2.1.6.RELEASE/api/user/add',
    method: 'post',
    params: data
  })
}

// 重置密码
export function resetPassword(data) {
  return request({
    url: 'speed-auth-2.1.6.RELEASE/retrieve',
    method: 'get',
    params: data
  })
}
