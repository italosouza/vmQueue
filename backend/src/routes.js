const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)
const routes = express.Router()

const authMiddleware = require('./app/middleware/auth')
const guestMiddleware = require('./app/middleware/guest')

const FileController = require('./app/controllers/FileController')

// acesso public
routes.get('/files/:file', FileController.show)

// acesso somente autorizado

module.exports = routes
