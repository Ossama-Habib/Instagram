const { BadRequestError } = require('../errors')
const User = require('../models/User')
const Auth = require('../models/Auth')

const getUserProfile = async (req, res) => {
    const {id} = req.params
    const user = await User.findOne({user: id}).populate({
        path: 'user',
        select:'userName profileImg',
    }).populate({
        path: 'posts',
        select: 'author image caption comments likes createdAt',
        populate: { 
            path: 'comments',         
        }
    });
    if(!user){
        throw new BadRequestError('User Does Not Exists')
    }

    res.status(200).json(user)
}

const searchUser = async (req, res) => {
    const {user} = req.query

    if (!user || user.trim() === "") {
        return res.status(200).json([]);
    }

    const auth = await Auth.find({ userName: { $regex: user, $options: "i" } });

    if(!auth){
        throw new BadRequestError('No user found')
    }

    res.status(200).json(auth)
}

const followUser = async (req, res) => {
    const { id: userToFollow } = req.params; 
    const { id: myId } = req.user;
    const userToFollowProfile = await User.findOne({ user: userToFollow });
    const userFollowingProfile = await User.findOne({ user: myId });

   
    if (!userToFollowProfile || !userFollowingProfile) {
        throw new BadRequestError('User does not exist');
    }

    const isAlreadyFollowing = userFollowingProfile.followings.includes(userToFollow);

    if (isAlreadyFollowing) {
        userToFollowProfile.followers = userToFollowProfile.followers.filter(
            (followerId) => followerId.toString() !== myId.toString()
        );
        userFollowingProfile.followings = userFollowingProfile.followings.filter(
            (followingId) => followingId.toString() !== userToFollow.toString()
        );

        await userToFollowProfile.save();
        await userFollowingProfile.save();

        return res.status(200).json({ msg: 'User unfollowed successfully' });
    } else {
        userToFollowProfile.followers.push(myId);
        userFollowingProfile.followings.push(userToFollow);

        await userToFollowProfile.save();
        await userFollowingProfile.save();

        return res.status(200).json({ msg: 'User followed successfully' });
    }
};


module.exports ={followUser, getUserProfile, searchUser}