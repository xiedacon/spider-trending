'use strict'

const request = require('superagent')
const { download: config } = require('../config.js')
const logger = require('../logger.js')

const downloader = module.exports = {
  get: async (url) => {
    try {
      let t = Date.now()
      logger.debug('DOWNLOADER: start get ' + url)

      let { text: html } = await request
        .get(url)
        .timeout(config.timeout)

      logger.debug(`DOWNLOADER: finish get ${url} [${Date.now() - t}ms]`)
      return html
    } catch (error) {
      logger.error('NetError: ' + error.toString())

      if (config.retry) {
        logger.debug('DOWNLOADER: retry GET ' + url)
        return downloader.get(url)
      }
      return ''
    }
  }
}
