const express = require('express')
const routes = express.Router()

// const multerConfig = require('./config/multer')
// const upload = require('multer')(multerConfig)

const authMiddleware = require('./app/middlewares/auth')
const controllers = require('./app/controllers')

// usuario - create and login
routes.post('/user', controllers.UserController.store)
routes.post('/session', controllers.SessionController.store)

// routes.post('/user', upload.single('avatar'), controllers.UserController.store)
// routes.get('/files/:file', controllers.FileController.show)

// rotas a sequir requerem Token de autenticação
routes.use(authMiddleware)

// vm
routes.get('/vm', controllers.VmController.index)
routes.get('/vm/:id', controllers.VmController.show)
routes.post('/vm', controllers.VmController.store)
routes.put('/vm/:id', controllers.VmController.update)
routes.delete('/vm/:id', controllers.VmController.destroy)

routes.post('/vm/join/:id', controllers.VmController.join)
routes.post('/vm/leave/:id', controllers.VmController.leave)

// user -
// routes.get('/user', controllers.UserController.index)

// queue
routes.get('/queue', controllers.QueueController.index)
routes.post('/queue/join', controllers.QueueController.join)
routes.post('/queue/leave', controllers.QueueController.leave)

module.exports = routes
