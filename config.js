'use strict'

const path = require('path')

module.exports = {
  debug: false,
  dataPath: path.join(__dirname, './datas'),
  redisConfig: {
    host: '127.0.0.1',
    port: 6379,
    db: 1 // 防止污染db 0
  },
  download: {
    retry: true,
    timeout: {
      response: 10 * 1000,
      deadline: 60 * 1000
    }
  }
}
