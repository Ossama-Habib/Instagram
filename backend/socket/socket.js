const express = require('express')
const app = express()
const http = require('http')
const socket = require('socket.io')

const server = http.createServer(app)

const {Server} = socket

const io = new Server(server, {
    cors:{
        origin: ['http://localhost:5173'],
        methods: ["GET", "POST"]
    }
})

const connecteduser = {}

const findConnectedUser = (userId) => {
    return connecteduser[userId]
}

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId
    
    if(userId){
        connecteduser[userId] = socket.id
    }
})

module.exports = {server, app, io, findConnectedUser}