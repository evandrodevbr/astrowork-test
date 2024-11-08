import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author_fullname: {
        type: String,
        required: true
    },
    ups: {
        type: Number,
        required: true
    },
    num_comments: {
        type: Number,
        required: true
    },
    created_date: {
        type: Date,
        required: true
    },
    subreddit: {
        type: String,
        required: true
    },
    permalink: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Verifica se o modelo já existe antes de criar um novo
export const Post = mongoose.models.Post || mongoose.model('Post', postSchema);