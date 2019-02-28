const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)
const routes = express.Router()

const authMiddleware = require('./app/middleware/auth')
const guestMiddleware = require('./app/middleware/guest')

const FileController = require('./app/controllers/FileController')
const VmController = require('./app/controllers/VmController')
const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')

// acesso public
// routes.get('/', guestMiddleware, SessionController.create)
routes.post('/login', SessionController.store)

routes.get('/files/:file', FileController.show)
routes.post('/user', upload.single('avatar'), UserController.store)

// acesso somente autorizado
routes.use('/app', authMiddleware)
routes.get('/app/vm', VmController.index)

module.exports = routes
