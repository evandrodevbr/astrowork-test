import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
    id: string;
    title: string;
    author_fullname: string;
    created_utc: number;
    created_date: string;
    ups: number;
    num_comments: number;
}

const postSchema = new Schema<IPost>({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    author_fullname: { type: String, required: true },
    created_utc: { type: Number, required: true, index: true },
    created_date: { type: String, required: true },
    ups: { type: Number, required: true, index: true },
    num_comments: { type: Number, required: true, index: true }
}, { timestamps: true });

export const PostModel = mongoose.model<IPost>('Post', postSchema);