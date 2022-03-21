import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/stuff/get',
    method: 'get',
    params
  })
}

export function addList(query) {
  return request({
    url: '/stuff/add',
    method: 'post',
    data: query
  })
}

export function updateList(query) {
  return request({
    url: '/stuff/change',
    method: 'post',
    data: query
  })
}

export function delList(query) {
  return request({
    url: '/stuff/delete',
    method: 'post',
    data: query
  })
}
