import request from '@/utils/request'

export function getMonitorList(data) {
  return request({
    url: '/monitor/add',
    method: 'post',
    data
  })
}
