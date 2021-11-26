const router = require("express").Router();
const commentController = require("../controllers/comments");

router.get("/comments/:postID", commentController.getComments)
router.post("/postcomment", commentController.postComment)

module.exports = router