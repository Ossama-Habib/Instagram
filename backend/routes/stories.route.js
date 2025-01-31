const express = require('express')
const router = express.Router()

const {protect, authorizePermission} = require('../middlewares/authorize')
const {postStory, getStories, getUserStory, storyViews} = require('../controllers/stories.controller')

router.route('/').get(protect, getStories).post(protect, postStory)
router.route('/:storyId').get(protect, getUserStory)
router.route('/:storyId/view').put(protect, storyViews)

module.exports = router