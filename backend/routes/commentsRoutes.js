const express = require('express')
const { setComment, getPostComments, deleteComment } = require('../controllers/commentControllers')

const router = express.Router()

router.post('/set', setComment)
router.delete('/delete', deleteComment)
router.get('/comments', getPostComments)


module.exports = router