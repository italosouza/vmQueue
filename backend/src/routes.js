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
const QueueController = require('./app/controllers/QueueController')

// acesso public
// routes.get('/', guestMiddleware, SessionController.create)
routes.post('/login', SessionController.login)

routes.get('/files/:file', FileController.show)
routes.post('/user', upload.single('avatar'), UserController.store)

// acesso somente autorizado
// routes.use('/app', authMiddleware)

// vm
routes.get('/app/vm', VmController.index)
routes.post('/app/vm', VmController.store)
routes.post('/app/vm/join/:id', VmController.join)
routes.post('/app/vm/leav/:id', VmController.leave)

// user
routes.get('/app/user', UserController.index)
routes.post('/app/user', UserController.store)

// queue
routes.get('/app/queue', QueueController.index)
routes.post('/app/queue', QueueController.store)

module.exports = routes
