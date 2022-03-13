const Mock = require('mockjs')

const data = [{ "id": 1, "name": "基辅", "workspace_inner_name": null }, { "id": 2, "name": "aaa", "workspace_inner_name": null }, { "id": 3, "name": "二矿区", "workspace_inner_name": null }]


module.exports = [
  {
    url: '/workspace/get',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data
      }
    }
  }
]
