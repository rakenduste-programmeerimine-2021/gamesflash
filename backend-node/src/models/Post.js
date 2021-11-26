const { Schema, model } = require('mongoose')

const postSchema = new Schema({
  userName: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  postID: { type: Number, required: true, unique: true },
  postTitle: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true }
});

const Post = model("Post", postSchema)

module.exports = Post