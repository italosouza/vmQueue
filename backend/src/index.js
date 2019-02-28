// application server
const server = require('./server')

// http server - used with socket.io
var http = require('http').Server(server.express)

// configuração do socket.io
const io = require('socket.io')(http)
const uuidv4 = require('uuid/v4')

io.on('connection', function(socket) {
  socket.on('add user', username => {
    const user = { _id: uuidv4(), username: username, numUsers: 1 }
    socket.user = user
    io.emit('login', user)
    console.log(`Usuário ${user.username} id: ${user._id} conectado`)
  })

  socket.on('new message', data => {
    io.emit('new message', { username: socket.user.username, message: data })
  })

  socket.on('disconnect', () => {
    console.log(`${socket.user.username} desconectou-se.`)
  })
})

http.listen(process.env.PORT || 3000)
