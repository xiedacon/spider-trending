'use strict'

const path = require('path')

module.exports = {
  dataPath: path.join(__dirname, './datas'),
  redisConfig: {
    host: '127.0.0.1',
    port: 6379,
    db: 1 // 防止污染db 0
  }
}
