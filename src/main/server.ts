import express from 'express'
import 'reflect-metadata'
const app = express()
app.listen(3000, () => {
  console.log('API running on http://localhost:3000')
})
