const mongoose = require('mongoose');

// Define the schema correctly
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    position: { type: String, required: true }, // เปลี่ยนจาก Number เป็น String
    username: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export the model with the correct schema
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
