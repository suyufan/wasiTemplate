import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/single/get',
    method: 'get',
    params
  })
}

