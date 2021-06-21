import 'reflect-metadata'
import { TypeormPostgresHelper } from '../infra/db/typeorm-postgres/helpers/typeorm-postgres-helper'
import env from './config/env'

(async () => {
  try {
    await TypeormPostgresHelper.connect()
    const app = (await import('./config/app')).default

    app.listen(env.port, () => {
      console.log(`API is running on ${env.host}:${env.port}`)
    })
  } catch (err) {
    console.log(err)
  }
})()
