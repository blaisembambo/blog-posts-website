const express = require('express')
const { setPost, getPostById, getBlogPosts, updatePost, deletePost, updateFeedbackWithALike, updateFeedbackWithADislike } = require('../controllers/postControllers')

const router = express.Router()

router.post('/set', setPost)
router.get('/post', getPostById)
router.put('/update', updatePost)
router.delete('/delete', deletePost)
router.get('/posts', getBlogPosts)
router.post('/feedback-like', updateFeedbackWithALike)
router.post('/feedback-dislike', updateFeedbackWithADislike)


module.exports = router