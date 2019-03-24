import request from '@/utils/request'

export function login(account, password) {
  return request({
    url: '/sys/user/login',
    method: 'post',
    data: {
      account,
      password
    }
  })
}

export function logout() {
  return request({
    url: '/sys/user/loginOut',
    method: 'post'
  })
}
