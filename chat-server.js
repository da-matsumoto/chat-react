const express = require('express')
const app = express()
const server = require('http').createServer(app)
const portNo = 3001
server.listen(portNo, () => {
    console.log('起動しました' , 'http://localhost:' + portNo)
})
app.use('/public', express.static('./public'))
app.get('/', (req, res) => {
    res.redirect(302, '/public')
})

const socketio = require('socket.io')
const io = socketio.listen(server)
io.onconnection('connection', (socket) => {
    console.log('ユーザーが接続', socket.client.id)
    socket.on('chat-msg', (msg) => {
        io.emit('chat-msg', msg)
    })
})
