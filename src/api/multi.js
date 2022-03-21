import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/monitor/multi',
    method: 'get',
    params
  })
}