const express = require('express')
const router= express.Router()

const {getUserProfile ,followUser, searchUser} = require('../controllers/user.controller')
const {protect} = require('../middlewares/authorize')

router.route('/profile').get(protect, searchUser)
router.route('/profile/:id').get(protect, getUserProfile)
router.route('/profile/:id').post(protect, followUser)

module.exports = router