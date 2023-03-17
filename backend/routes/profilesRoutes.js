const express = require('express')
const router = express.Router()
const { getUserProfile, updateUserProfile } = require('../controllers/profileControllers')

router.post('/get', getUserProfile)
router.post('/update', updateUserProfile)

module.exports = router