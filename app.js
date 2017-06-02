'use strict'

global.Promise = require('bluebird')
Promise.promisifyAll(require('redis'))

require('./spider.js').start()
