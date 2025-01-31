const express = require('express')
const router = express.Router()

const {protect} = require('../middlewares/authorize')
const {getAllPostComment, createPostComment} = require('../controllers/comments.controller')

router.route('/:postId/comment').get(protect, getAllPostComment).post(protect, createPostComment)

module.exports = router