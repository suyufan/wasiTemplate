const Mock = require('mockjs')

const data = { "id": 1, "name": "", "time": 15999999, "volume": 1250, "upper_limit": 2000, "lower_limit": 1 }

module.exports = [
  {
    url: '/monitor/gas/new',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data
      }
    }
  }
]
