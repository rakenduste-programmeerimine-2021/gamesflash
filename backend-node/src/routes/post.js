const router = require("express").Router();
const postController = require("../controllers/posts");

router.get("/post/:postID", postController.getPost)
router.get("/social", postController.getSocialPosts)
router.get("/gaming", postController.getGamingPosts)
router.get("/userposts/:userName", postController.getUserPosts)
router.post("/create", postController.createPost)
router.put("/edit/:postID", postController.updatePost)
router.delete("/delete/:postID", postController.deletePost)

module.exports = router