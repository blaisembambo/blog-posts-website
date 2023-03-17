const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const { errorMiddleware } = require('./middleware/errorMiddleware')


const PORT = process.env.PORT || 5000
const app = express()
connectDB()

// const store = MongoStore.create({
//     mongoUrl: process.env.DATA_BASE_URL,
//     mongoOptions: { useUnifiedTopology: true },
// })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', require('./routes/usersRoutes'))
app.use('/api/profiles', require('./routes/profilesRoutes'))
app.use('/api/blogs', require('./routes/blogsRoutes'))
app.use('/api/posts', require('./routes/postsRoutes'))
app.use('/api/feedbacks', require('./routes/feedbacksRoutes'))
app.use('/api/comments', require('./routes/commentsRoutes'))
app.use('/api/followers', require('./routes/followersRoutes'))

// app.use(session({
//     secret: 'sessions secret',
//     saveUninitialized: false, // don't create session until something stored
//     resave: false, //don't save session if unmodified
//     store: store
// }))

app.use(errorMiddleware)

app.listen(PORT, () => console.log('connected successfully to the port ', PORT))