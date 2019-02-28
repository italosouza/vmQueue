const express = require('express')
// const mongoose = require('mongoose')
const cors = require('cors')
const uuidv4 = require('uuid/v4')

const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

// mongoose.connect(
//   'mongodb://goweek-user:goweek-pass123@ds155073.mlab.com:55073/goweek-demo',
//   {
//     useNewUrlParser: true
//   }
// )

let clients = []
let nUsers = -1
io.on('connection', function(socket) {
  socket.on('add user', username => {
    nUsers++
    const user = { _id: uuidv4(), username: username, numUsers: nUsers }
    clients[nUsers] = user
    socket.user = user
    io.emit('login', user)
    console.log(
      'Usuário "' + user.username + '" id: "' + user._id + '" conectado. '
    )
  })

  socket.on('new message', data => {
    io.emit('new message', { username: socket.user.username, message: data })
  })

  socket.on('disconnect', () => {
    // nUsers--
    // let sMensagem = ''
    // let client
    // for (let i = 0; i < clients.length; i++) {
    //   if (clients[i]) {
    //     if (clients[i]._id === socket.user._id) {
    //       client = clients[i]
    //       clients.splice(i, 1)
    //       sMensagem =
    //         'Usuário "' +
    //         client.username +
    //         '" id: "' +
    //         client._id +
    //         '" desconectou. '
    //       break
    //     }
    //   }
    // }
    // sMensagem = sMensagem + 'Total: ' + clients.length
    // console.log(sMensagem)
    // io.emit('user left', client)
  })
})

app.use((req, res, next) => {
  req.io = io
  return next()
})

app.use(express.static(__dirname + '/public'))
app.use(cors())
app.use(express.json())
app.use(require('./routes'))

server.listen(8080, () => {
  console.log('Servidor rodando em: 8080')
})
