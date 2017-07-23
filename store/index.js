'use strict'

const fs = require('fs')
const _path = require('path')
const config = require('../config.js')

let flags = {}

checkDir(config.dataPath)

module.exports = {
  /**
   *  data: {},
   * record = {
   *  path: '.'
   * }
   */
  save: ({ data = {}, path = '.' }) => {
    let t = new Date()
    let dirname = _path.join(config.dataPath, path)

    checkDir(dirname)

    let write = fs.createWriteStream(`${dirname}/${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}.json`)

    write.end(JSON.stringify(data))
  }
}

function checkDir (dirname) {
  if (flags[dirname]) return

  try {
    fs.accessSync(dirname)
  } catch (error) {
    if (!error.toString().includes('no such file or directory')) throw error

    fs.mkdirSync(dirname)
  }

  flags[dirname] = true
}
