const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    workspace: '@sentence(5, 10)',
    name: '@sentence(2, 4)',
    // display_time: '@datetime',
    // pageviews: '@integer(300, 5000)',
    'status|1': ['warning', 'error']
  }]
})

module.exports = [
  {
    url: '/monitor/equipment/new',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
