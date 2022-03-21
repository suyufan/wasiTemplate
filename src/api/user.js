import request from '@/utils/request'

export function login(data) {
  console.log("---api-data---",data);
  return request({
    url: 'user/login',
    method: 'post',
    data
  })
}

export function register(data) {
  console.log("----api-register---data",data);
  return request({
    url: 'user/register',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
