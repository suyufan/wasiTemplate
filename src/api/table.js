import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/stuff/get',
    method: 'get',
    params
  })
}

export function addList(data) {
  return request({
    url: '/stuff/add',
    method: 'post',
    data
  })
}

export function updateList(data) {
  return request({
    url: '/stuff/change',
    method: 'post',
    data
  })
}

export function delList(data) {
  return request({
    url: '/stuff/delete',
    method: 'post',
    data
  })
}
