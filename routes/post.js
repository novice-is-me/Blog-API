const express = require("express");
const postController = require('../controllers/post');
const auth = require("../auth");

const { verify, verifyAdmin } = auth;

const router = express.Router();

// ROUTES
router.get("/getPosts", postController.getPosts); // all users
router.post("/addPost", verify, postController.addPost); // auth user
router.get("/getPost/:postId", postController.getPostById); // all users
router.get("/myPosts", verify, postController.getMyPosts); // auth user
router.patch("/updatePost/:postId", verify, postController.updatePost); // auth user
router.delete("/deletePost/:postId", verify, postController.deletePost); // auth user
router.delete("/deletePostByAdmin/:postId", verify, verifyAdmin, postController.deletePostByAdmin); // admin

router.patch("/addComment/:postId", verify, postController.commentPost); // auth user
router.get("/getComments/:postId", postController.getComments); // all users
router.delete("/deleteComment/:postId/:commentId", verify, verifyAdmin, postController.deleteComment); // admin
 
module.exports = router;