'use strict'

const { debug } = require('./config.js')

module.exports = {
  log: function () {
    console.log(`${time()} ${Array.from(arguments).join(' ')}`)
  },
  debug: function () {
    if (debug) console.log(`DEBUG: ${time()} ${Array.from(arguments).join(' ')}`)
  },
  error: function () {
    console.log(`ERROR: ${time()} ${Array.from(arguments).join(' ')}`)
  }
}

function time () {
  let t = new Date()
  let yyyy = t.getFullYear()
  let mm = (t.getMonth() + 1)
  let dd = t.getDate()
  let hh = t.getHours()
  let mi = t.getMinutes()
  let ss = t.getSeconds()

  mm = mm > 9 ? mm : '0' + mm
  dd = dd > 9 ? dd : '0' + dd
  hh = hh > 9 ? hh : '0' + hh
  mi = mi > 9 ? mi : '0' + mi
  ss = ss > 9 ? ss : '0' + ss

  return `${yyyy}/${mm}/${dd} ${hh}:${mi}:${ss}`
}
