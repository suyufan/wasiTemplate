import request from '../utils/request';
export function fetchList(query) {
    return request({
        url: '/monitor/gas/new',
        method: 'get',
        params: query
    })
}
