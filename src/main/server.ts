import express from 'express'
import 'reflect-metadata'
import { TypeormPostgresHelper } from '../infra/db/typeorm-postgres/helpers/typeorm-postgres-helper'
import env from './config/env'

(async () => {
  try {
    await TypeormPostgresHelper.connect(env.dbURL)
    const app = express()
    app.listen(3000, () => {
      console.log(`API is running on ${env.host}:${env.port}`)
    })
  } catch (err) {
    console.log(err)
  }
})()
