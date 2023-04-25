import express from 'express'
import helmet from 'helmet'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { router } from './routes/router.js'
import 'dotenv/config'

try {

  const app = express()

  app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false
  }))


  const directoryFullName = dirname(fileURLToPath(import.meta.url))

  app.set('view engine', 'ejs')
  app.set('views', join(directoryFullName, 'views'))
  app.use(express.static(join(directoryFullName, '..', 'public')))
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())


  app.use('/', router)

  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
  })
} catch (error) {
  console.log(error)
}

