import type { APIRoute } from 'astro';
import { connectDB } from '../../../lib/db/connect';
import { Post } from '../../../lib/models/Post';

export const GET: APIRoute = async () => {
    try {
        await connectDB();
        const posts = await Post.find({}).sort({ created_date: -1 });

        return new Response(JSON.stringify({
            success: true,
            count: posts.length,
            data: posts
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};