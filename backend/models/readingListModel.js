const mongoose = require('mongoose')
const FollowBlog = require('../models/followBlogModel')
const Post = require('../models/postModel')

const readingListSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    }
})

readingListSchema.methods.readingListPosts = async function () {
    try {
        const followedBlogs = await FollowBlog.find({ follower: this.user })
        if (!followedBlogs) {
            res.status(400)
            throw new Error(`L'utilisateur n'est abonné à aucun blog`)
        }

        let blogs = followedBlogs.map(followedBlog => followedBlog.blog)
        let posts = blogs.map(async (blog) => await Post.find(blog))
        posts = posts.flat(2)

        return posts
    } catch (error) {
        return null
    }
}



module.exports = mongoose.model('ReadingList', readingListSchema)