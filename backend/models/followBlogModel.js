const mongoose = require('mongoose')

const followBlogSchema = mongoose.Schema({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Blog'
    },
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true })

module.exports = mongoose.model('FollowedBlogs',followBlogSchema)