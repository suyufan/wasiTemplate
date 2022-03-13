import request from '../utils/request';

export function getList(params) {
    return request({
        url: '/workspace/get',
        method: 'get',
        params
    })
}
