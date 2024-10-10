const Post = require('../models/creaftpost');
const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require ("bcryptjs");

// Get all posts
exports.getPosts = async (req, res) => { 
    try { 
        const posts = await Post.find();    
        res.status(200).json(posts); 
    } catch (err) { 
        res.status(500).json({ message: err.message }); 
    }
}; 

// Get a specific post by ID
exports.getPost = async (req, res) => {
    try { 
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: 'Post not found' }); 
        res.json(post); 
    } catch (err) { 
        res.status(500).json({ message: err.message }); 
    }
};
    
// Create a new post with validation
exports.createPost = async (req, res) => {
    const { title, content, position, username } = req.body;

    // ตรวจสอบว่าข้อมูลทุกฟิลด์ถูกต้อง
    if (!title || !content || !position || !username) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const post = new Post({ title, content, position, username });
    try { 
        const newPost = await post.save();
        res.status(201).json(newPost); 
    } catch (err) { 
        res.status(400).json({ message: err.message }); 
    }
};


// Update a post by ID
exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(updatedPost);
    } catch (err) { 
        res.status(400).json({ message: err.message }); 
    }
};

// Delete a post by ID
exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) { 
        res.status(400).json({ message: err.message }); 
    }
};
