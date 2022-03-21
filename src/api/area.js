import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/workspace/trend',
    method: 'get',
    params
  })
}

export function addList(query) {
  return request({
    url: '/workspace/area',
    method: 'post',
    data: query
  })
}