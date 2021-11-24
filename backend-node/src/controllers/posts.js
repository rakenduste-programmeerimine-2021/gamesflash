const Post = require('../models/Post')

exports.getSocialPosts = async (req, res) => {
  const posts = await Post.find({category: "social"})
  res.status(200).send(posts)
}

exports.getGamingPosts = async (req, res) => {
  const posts = await Post.find({category: "gaming"})
  res.status(200).send(posts)
}

exports.getUserPosts = async (req, res) => {
  const { userName } = req.params;
  const posts = await Post.find({userName: userName})
  res.status(200).send(posts)
}

exports.getPost = async (req, res) => {
    const { postID } = req.params;
    const post = await Post.find({postID: postID})
    res.status(200).send(post)
}

exports.createPost = async (req, res) => {
  const { userName, postID, postTitle, content, category } = req.body

  const newPost = {
    userName: userName,
    postID: postID,
    postTitle: postTitle,
    content: content,
    category: category
  }

  const createdPost = new Post(newPost)
  const savedPost = await createdPost.save()
  res.status(200).send(`Post added. postID: ${savedPost.postID}`)
}

exports.updatePost = async (req, res) => {
  const { postID } = req.params;
  const { content } = req.body;
  const post = await Post.findOne({postID: postID})
  if (!post) res.status(404).send("That post doesnt exist!")

  post.content = content;
  const savedItem = post.save()
  res.status(200).send("Post updated!")
}

exports.deletePost = async (req, res) => {
  const { postID } = req.params;
  const post = await Post.findOneAndDelete({ postID: postID })

  if (!post) res.status(404).send("That post doesnt exist!")
  res.status(200).send(`Post: "${post.postTitle}" successfully deleted!`)
}