'use strict'

const downloader = require('./downloader')
const parser = require('./parser')
const store = require('./store')

const baseUrl = 'https://github.com/trending'

const job = (cycle) => {
  let timeout
  let url = `${baseUrl}?since=${cycle}`

  // 使用redis或node-cron或node-schedule替换，倾向于redis
  let time
  switch (cycle) {
    case 'daily':
      time = 24 * 60 * 60 * 1000
      break
    case 'weekly':
      time = 7 * 24 * 60 * 60 * 1000
      break
    case 'monthly':
      time = 30 * 24 * 60 * 60 * 1000
      break
    default:
      throw new Error()
  }

  let job = {
    start: async () => {
      let html = await downloader.get(url)
      let languages = parser.getLanguages(html)

      let data = await Promise.map(languages, async (language) => {
        language.repos = parser.getRepos(await downloader.get(language.href))
        return language
      })

      store.save({
        cycle: cycle,
        data: data
      })

      timeout = setTimeout(function () {
        job.start()
      }, time)
    },
    stop: () => {
      clearTimeout(timeout)
    }
  }

  return job
}

let daily, weekly, monthly

module.exports = {
  start: () => {
    daily = job('daily')
    weekly = job('weekly')
    monthly = job('monthly')

    daily.start()
    weekly.start()
    monthly.start()
  },
  stop: () => {
    daily.stop()
    weekly.stop()
    monthly.stop()
  }
}
