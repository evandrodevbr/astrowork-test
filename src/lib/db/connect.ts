import mongoose from 'mongoose';

export async function connectDB(): Promise<void> {
    try {
        await mongoose.connect('mongodb://localhost:27017/redditData');
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}