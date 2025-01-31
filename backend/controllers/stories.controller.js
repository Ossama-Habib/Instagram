const Stories = require('../models/Stories')
const User = require('../models/User')

const postStory = async (req, res) => {
    const {id} = req.user
    const {content} = req.body
    const userPreviousPost = await Stories.findOne({user: id})

    if(userPreviousPost){
        userPreviousPost.content.push(content)
        userPreviousPost.save()
        return res.status(200).json(userPreviousPost)
    }
    const createStory = await Stories.create({user: id, content})

    res.status(200).json(createStory)
}

const getStories = async (req, res) => {
    const {id} = req.user
    
    const loginUser = await User.findOne({user: id}).select('followings')
    const loginFollowingStories = [] 

    loginUser.followings.forEach((user) => {
        loginFollowingStories.push(user.toString())
    })

    const followedUserStory = await Stories.find({user: {$in : loginFollowingStories }}).populate({path: "user", select: "userName profileImg"})
    res.status(200).json(followedUserStory)
}

const getUserStory = async (req, res) => {
    const {storyId} = req.params
    const story = await Stories.findOne({_id: storyId})
    
    res.status(200).json(story)
}
const storyViews = async (req, res) => {
    const {id: userId} = req.user
    const {storyId} = req.params
    
    await Stories.findByIdAndUpdate(storyId, { $addToSet: { isViewed: userId } });
    res.status(200).json({ success: true, message: 'Story marked as viewed.' });
    
}

module.exports = {postStory, getStories, getUserStory, storyViews}