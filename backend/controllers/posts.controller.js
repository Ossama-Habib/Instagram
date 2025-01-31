const User = require('../models/User')
const Posts = require('../models/Posts')
const path = require('path')
const { authorizePermission} = require('../middlewares/authorize')
const { BadRequestError } = require('../errors')
const {io} = require('../socket/socket')

const getAllPosts = async (req, res) => {
    const { id: userId } = req.user;
    const user = await User.findOne({ user: userId }).populate({
      path: "followings",
    });
   
    const followingIds = user.followings.map((following) => following._id);
 
    const userFollowingsPosts = await Posts.find({ author: { $in: followingIds } }).populate("author");

    res.status(200).json(userFollowingsPosts);
}

const getAllUserPosts = async(req, res) => {
    const {id} = req.params
    const userPosts = await User.findOne({user: id}).select('posts').populate({
        path: "posts",
        select: "author",
        populate:{
            path: "author"
        }
    })
    
    res.status(200).json(userPosts)
}

const createPost = async(req, res) => {
    const {id: author} = req.user
    const {image} = req.files
    const {caption} = req.body
    const imagePath = path.join(__dirname, '../public/postsImg/' + image.name)
    await image.mv(imagePath)

    const post = await Posts.create({author, image:'/postsImg/'+ image.name, caption })
    const user = await User.findOne({user: author})
    user.posts.push(post._id)

    await user.save()
    res.status(200).json(post)
}

const likePost = async (req, res) => {

    const {postId} = req.params
    const {id:user} = req.user
    let post = await Posts.findOne({_id: postId})
    
    if(!post){
        throw new BadRequestError("Post you want to like does not exists.")
    }
    const alreadyLiked = post.likes.includes(user)


    if(alreadyLiked){
        post.likes = post.likes.filter((like) => like.toString() !== user.toString());
    }
    else{
        post.likes.push(user)
    }

    await post.save()
    io.emit('postLike', post)
    return res.status(200).json(post.likes)
}

const getSinglePost = async (req, res) => {
    const {postId} = req.params
    const post = await Posts.findOne({_id: postId}).populate({
        path: "comments",
        select: "author comment",
        populate:{
            path: 'author',
            select: 'profileImg userName'
        }
    }).populate({
        path: "author",
        select: "userName profileImg"
    })
    res.status(200).json(post)
}

const deletePost = async (req, res) => {
    const {postId} = req.params
    const {id: userId} = req.user

    const post = await Posts.findOne({_id: postId})
    if (post.author.toString() !== userId) {
        return res.status(403).json({ msg: "You are not authorized to delete this post" });
      }
    // authorizePermission(post.author)
    const user = await User.findOne({user: userId})
    user.posts = user.posts.filter((id) => id.toString() !== postId)
   
    await Posts.findByIdAndDelete(postId);
    await user.save()
    res.status(200).json({msg: "Post Deleted Succesfully" })
}

module.exports = {getAllPosts, getAllUserPosts,getSinglePost, createPost, likePost, deletePost}