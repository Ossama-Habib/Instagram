const express = require('express')
const router = express.Router()

const {protect, authorizePermission} = require('../middlewares/authorize')
const {getAllPosts,getAllUserPosts,getSinglePost, createPost, likePost, deletePost} = require('../controllers/posts.controller')

router.route('/post').get(protect, getAllPosts).post(protect,createPost)
router.route('/posts/:id').get(protect, getAllUserPosts)
router.route('/post/:postId').get(protect, getSinglePost).delete(protect,deletePost)
router.route('/post/:postId/like').post(protect, likePost)

module.exports = router