'use strict'

const request = require('superagent')

module.exports = {
  get: async (url) => {
    let { text: html } = await request
      .get(url)

    return html
  }
}
