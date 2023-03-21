const express = require('express')
const { setBlog, getBlogById, updateBlog, deleteBlog, getUserBlogs } = require('../controllers/blogControllers')

const router = express.Router()

router.post('/set', setBlog)
router.get('/blog', getBlogById)
router.put('/update', updateBlog)
router.delete('/delete', deleteBlog)
router.get('/blogs', getUserBlogs)


module.exports = router