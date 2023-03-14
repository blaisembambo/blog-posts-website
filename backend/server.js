const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const {errorMiddleware} = require('./middleware/errorMiddleware')


const PORT = process.env.PORT || 5000
const app = express()
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', require('./routes/usersRoutes'))
app.use('/api/profiles', require('./routes/profilesRoutes'))
app.use('/api/blogs', require('./routes/blogsRoutes'))
app.use('/api/posts', require('./routes/postsRoutes'))
app.use('/api/feedbacks', require('./routes/feedbacksRoutes'))
app.use('/api/comments', require('./routes/commentsRoutes'))
app.use('/api/followers', require('./routes/followersRoutes'))

app.use(errorMiddleware)

app.listen(PORT, () => console.log('connected successfully to the port ', PORT))