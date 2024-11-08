import type { APIRoute } from 'astro';
import { RedditService } from '../../../lib/services/redditService';
import { connectDB } from '../../../lib/db/connect';

export const GET: APIRoute = async () => {  // Mudou de 'get' para 'GET'
    try {
        await connectDB();
        const redditService = new RedditService();
        const posts = await redditService.fetchAndSavePosts();

        return new Response(
            JSON.stringify({
                success: true,
                data: posts
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
};