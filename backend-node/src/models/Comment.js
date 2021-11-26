const { Schema, model } = require('mongoose')

const commentSchema = new Schema({
    commentID: { type: Number, required: true, unique: true },
    postID: { type: Number, required: true },
    userName: { type: String, required: true },
    commentContent: { type: String, required: true },
    commentDate: { type: Date, required: true, default: Date.now }
});

const Comment = model("Comment", commentSchema)

module.exports = Comment