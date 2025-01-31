const Post = require('../models/Posts')
const Comment = require('../models/Comments')
const { BadRequestError } = require('../errors')
const {io} = require('../socket/socket')

const getAllPostComment =  async(req, res) => {
    const {postId} = req.params
    const post = await Post.findOne({_id: postId}).select('comments').populate({
        path: 'comments', 
        populate: { 
            path: 'author',
            select: 'profileImg', 
        },
    });
    res.status(200).json(post)
}

const createPostComment =  async(req, res) => {
    const {id: author} = req.user
    const {comment} = req.body
    const {postId} = req.params
    
    const post = await Post.findOne({_id: postId})

    if(!post){
        throw new BadRequestError('The Post you want to comment on, does not exists!')
    }
    const postComment = await Comment.create({author, post: postId,comment})
    post.comments.push(postComment._id)

    await post.save() 
    io.emit('newPostComment', postComment)
    res.status(200).json(postComment)
}

module.exports = {getAllPostComment, createPostComment}