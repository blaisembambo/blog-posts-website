const express = require('express')
const { followBlog, unFollowBlog, followedBlogs, blogFollowers } = require('../controllers/followBlogControllers')

const router = express.Router()

router.post('/follow', followBlog)
router.post('/unfollow', unFollowBlog)
router.post('/followed-blogs', followedBlogs)
router.post('/blog-followers', blogFollowers)

module.exports = router