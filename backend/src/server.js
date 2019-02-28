const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const path = require('path')
const cors = require('cors')

class App {
  constructor() {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.middlewares()
    this.views()
    this.routes()
  }

  middlewares() {
    this.express.use(express.urlencoded({ extended: false }))

    this.express.use(
      session({
        name: 'root',
        secret: 'MyApp',
        resave: false,
        store: new FileStore({
          path: path.resolve(__dirname, '..', 'tmp', 'sessions')
        }),
        saveUninitialized: true
      })
    )
    this.express.use(cors())
  }

  views() {
    this.express.use(express.static(path.resolve(__dirname, 'public')))
  }

  routes() {
    this.express.use(require('./routes'))
  }

  configIoMiddleware(io) {
    this.express.use((req, res, next) => {
      req.io = io
      return next()
    })
  }
}

module.exports = new App()
