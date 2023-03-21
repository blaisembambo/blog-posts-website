const express = require('express')
const { getReadingListPosts } = require('../controllers/readingListControllers')

const router = express.Router()

router.get('/posts', getReadingListPosts)

module.exports = router