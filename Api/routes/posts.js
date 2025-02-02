const express = require("express");
const router = express.Router();
const {
  createPostWithImagesController_V2,
  createPostWithImagesController_V3,
  getPostsController,
  getSinglePostController,
  getUserPostsController,
  deletePostController,
  likePostController,
  dislikePostController,
} = require("../controllers/postController");

router.post("/create/v3/:userId", createPostWithImagesController_V3);
router.post("/create/v2/:userId", createPostWithImagesController_V2);

router.get("/all", getPostsController);
router.get("/single/:postId", getSinglePostController);
router.get("/user/:userId", getUserPostsController);

router.delete("/delete/:postId", deletePostController);
router.post("/like/:postId", likePostController);
router.post("/dislike/:postId", dislikePostController);

module.exports = router;
