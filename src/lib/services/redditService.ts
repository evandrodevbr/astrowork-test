import type { Post } from '../../types/Post';
import { PostModel } from '../db/schema';
import axios from 'axios';
import type { SortOrder } from 'mongoose';

export class RedditService {
    async fetchAndSavePosts(): Promise<Post[]> {
        let posts: Post[] = [];
        try {
            const response = await axios.get('https://www.reddit.com/r/artificial/hot.json');
            posts = response.data.data.children.map((post: any) => ({
                id: post.data.id,
                title: post.data.title,
                author_fullname: post.data.author_fullname,
                created_utc: post.data.created_utc,
                created_date: new Date(post.data.created_utc * 1000).toISOString(),
                ups: post.data.ups,
                num_comments: post.data.num_comments
            }));

            const operations = posts.map(post => ({
                updateOne: {
                    filter: { id: post.id },
                    update: { $set: post },
                    upsert: true
                }
            }));

            await PostModel.bulkWrite(operations, { ordered: false });

            const savedPosts = await PostModel.find({
                id: { $in: posts.map(p => p.id) }
            }).lean();

            return savedPosts;

        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('E11000')) {
                    const postIds = posts.map(p => p.id);
                    const savedPosts = await PostModel.find({
                        id: { $in: postIds }
                    }).lean();
                    return savedPosts;
                }
            }
            throw new Error(`Failed to fetch and save posts: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async getFilteredPosts(
        startDate: string,
        endDate: string,
        orderBy: 'ups' | 'num_comments'
    ): Promise<Post[]> {
        try {
            const start = new Date(startDate).toISOString();
            const end = new Date(endDate).toISOString();

            const query = {
                created_date: {
                    $gte: start,
                    $lte: end
                }
            };

            const sortOptions: { [key: string]: SortOrder } = {
                [orderBy]: -1
            };

            const posts = await PostModel.find(query)
                .sort(sortOptions)
                .select('-__v')
                .lean();

            return posts;
        } catch (error) {
            throw new Error(`Failed to get filtered posts: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async getExistingPosts(postIds: string[]): Promise<Post[]> {
        try {
            return await PostModel.find({
                id: { $in: postIds }
            }).lean();
        } catch (error) {
            throw new Error(`Failed to get existing posts: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}