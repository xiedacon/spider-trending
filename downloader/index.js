'use strict'

const request = require('superagent')
const { download: { retry, timeout } } = require('../config.js')
const logger = require('../logger.js')

module.exports = {
  get: async (url) => {
    let t = Date.now()
    logger.debug('DOWNLOADER: start GET ' + url)

    let html = tryGet(url)

    logger.debug(`DOWNLOADER: finish GET ${url} [${Date.now() - t}ms]`)

    return html
  }
}

async function tryGet (url, times = 0) {
  try {
    let { text: html } = await request
      .get(url)
      .timeout(timeout)

    return html
  } catch (error) {
    logger.error('NetError: ' + error.toString())

    if (retry && times < retry) {
      logger.error('DOWNLOADER: retry GET ' + url)
      return tryGet(url, times++)
    }

    logger.error('DOWNLOADER: fail retry GET ' + url)
    throw error
  }
}
