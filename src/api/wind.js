import request from '../utils/request';
export function fetchList(query) {
    return request({
        url: '/monitor/wind/new',
        method: 'get',
        params: query
    })
}
