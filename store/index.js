'use strict'

const fs = require('fs')
const path = require('path')
const config = require('../config.js')

module.exports = {
  save: (record) => {
    let t = new Date()
    let dirname = path.join(config.dataPath, record.cycle)

    try {
      fs.accessSync(dirname)
    } catch (error) {
      if (!error.toString().includes('no such file or directory')) throw error

      fs.mkdirSync(dirname)
    }

    let write = fs.createWriteStream(`${dirname}/${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}.json`)
    write.end(JSON.stringify(record.data))
  }
}
