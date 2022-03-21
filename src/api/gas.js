import request from '../utils/request';
export function newList(query) {
    return request({
        url: '/monitor/gas/new',
        method: 'get',
        params: query
    })
}

export function fetchList(data,params) {
    return request({
        url: '/monitor/gas/get',
        method: 'post',
        data,
        params
    })
}
