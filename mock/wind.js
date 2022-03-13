const Mock = require('mockjs')

const data = { "id" : 1, "name" : "", "time" : 55555, "stress" : 2400, "speed" : 2400, "stress_upper_limit" : 2400, "stress_lower_limit" : 2400, "speed_upper_limit" : 2400, "speed_lower_limit" : 2400 }

module.exports = [
  {
    url: '/monitor/wind/new',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data
      }
    }
  }
]
