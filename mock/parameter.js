const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    name: '@sentence(2, 4)',
    location: '@sentence(5, 10)',
    max: '@integer(3000, 5000)',
    min: '@integer(300, 500)'
    // display_time: '@datetime',
    // pageviews: '@integer(300, 5000)',
    // department: '@sentence(5, 10)',
    // 'equipment_status|1': ['warning', 'error']
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list/parameter',
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
