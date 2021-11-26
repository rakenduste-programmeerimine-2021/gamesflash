const User = require("../models/User");
const Comment = require("../models/Comment");

exports.getComments = async (req, res) => {
    const { postID } = req.params;
    const comments = await Comment.find({postID: postID})
    res.status(200).send(comments)
}

exports.postComment = async (req, res) => {
    const { commentID, postID, userName, commentContent  } = req.body;
  
    const addedComment = {
        commentID: commentID,
        postID: postID,
        userName: userName,
        commentContent: commentContent
    }
  
    const createdComment = new Comment(addedComment);
    const savedComment = await createdComment.save();
    const user = await User.findOne({userName: userName});
    user.commentCount = user.commentCount + 1;
    const saveCommentCount = user.save();
    res.status(200).send(`Comment added. commentID: ${savedComment.commentID}`)
}
