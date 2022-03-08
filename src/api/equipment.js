import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list/equipment',
    method: 'get',
    params
  })
}