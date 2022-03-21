import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/monitor/equipment',
    method: 'get',
    params
  })
}
