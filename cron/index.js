'use strict'

const redis = require('redis')
const { redisConfig } = require('../config.js')
const uuid = require('uuid')

const jobs = {}
const sub = redis.createClient(redisConfig)
const sup = redis.createClient(redisConfig)

sub.on('message', (channel, key) => {
  let job = jobs[key]
  if (job && job instanceof Function) job()
})
sub.subscribe(`__keyevent@${redisConfig.db}__:expired`)

module.exports = async (job, time) => {
  let taskId = uuid.v1().replace(/-/g, '')

  try {
    await sup.multi()
      .set(taskId, '')
      .expire(taskId, time)
      .execAsync()

    jobs[taskId] = job

    return { cancel: () => { delete jobs[taskId] } }
  } catch (error) {
    delete jobs[taskId]
    console.error(`Failed to generate task`)
    console.error(`  time: ${time}`)
    console.error(`  function: ${job.toString()}`)
    console.error(`  error: ${error}`)

    return { cancel: () => { } }
  }
}
