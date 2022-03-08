const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    name: '@sentence(2, 4)',
    // display_time: '@datetime',
    // pageviews: '@integer(300, 5000)',
    department: '@sentence(5, 10)',
    location: '@sentence(5, 10)',
    'perm_group|1': ['published', 'admin']
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list/stuff',
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
