import request from '../utils/request';
export function fetchList(query) {
    return request({
        url: '/device/get',
        method: 'get',
        params: query
    })
}

export function addList(query) {
    return request({
        url: '/device/add',
        method: 'post',
        data: query
    })
}

export function delList(query) {
    return request({
        url: '/device/delete',
        method: 'post',
        data: query
    })
}