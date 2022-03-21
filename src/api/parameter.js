import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/argument/getall',
    method: 'get',
    params
  })
}

export function addList(query) {
  return request({
    url: '/argument/add',
    method: 'post',
    data: query
  })
}

export function updateList(query) {
  return request({
    url: '/argument/update',
    method: 'post',
    data: query
  })
}

export function delList(query) {
  return request({
    url: '/argument/delete',
    method: 'post',
    data: query
  })
}