const express = require('express');
const router = express.Router();
const authenticateToken = require("../middlewares/auth");


const { getPosts,getPost,createPost,updatePost,deletePost } = require ("../controller/postController");

router.get("/post",authenticateToken,getPosts);
router.get("/post/:id",authenticateToken ,getPost);
router.post("/post",authenticateToken, createPost);
router.put("/post/:id",authenticateToken, updatePost);
router.delete("/post/:id",authenticateToken, deletePost);


module.exports = router;