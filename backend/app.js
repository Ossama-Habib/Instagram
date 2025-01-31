require('express-async-errors')
require('dotenv').config({})
const express = require('express')
const {app, server} = require('./socket/socket')
const PORT = 7000

// Database
const connectDB = require('./data/connect')

// Routes
const authRoute = require('./routes/auth.routes')
const userRoute = require('./routes/user.routes')
const postsRoute = require('./routes/posts.route')
const commentsRoute = require('./routes/commentsroutes')
const messagesRoute = require('./routes/messages.route')
const storiesRoute = require('./routes/stories.route')

// Extra Packages
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUploader = require('express-fileupload')

app.use(fileUploader())
app.use(express.static('./public'))
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}))
app.use(cookieParser())


// Error
const handleError = require('./middlewares/handleError')

// Routes Listen
app.use('/insta/auth', authRoute)
app.use('/insta/user', userRoute)
app.use('/insta/user', postsRoute)
app.use('/insta/user', commentsRoute)
app.use('/insta/user', messagesRoute)
app.use('/insta/stories', storiesRoute)
app.use(handleError)



const start = async () => {
    try {
        await connectDB(process.env.MONGOSE_URI)
        console.log('Database is connected')        
        server.listen(PORT,() => {
            console.log(`server is listening on ${PORT}`)
        })

    } catch (error) {
        console.log(`error in starting the server \n ${error.message}`)
    }
}
start()
