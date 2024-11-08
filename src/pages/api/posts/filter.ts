import type { APIRoute } from 'astro';
import { RedditService } from '../../../lib/services/redditService';
import { connectDB } from '../../../lib/db/connect';

type OrderBy = 'ups' | 'num_comments';
type SortDirection = 'asc' | 'desc';

const isValidOrderBy = (value: string): value is OrderBy => {
    return ['ups', 'num_comments'].includes(value);
};

const isValidSortDirection = (value: string | null): value is SortDirection => {
    return value === null || ['asc', 'desc'].includes(value);
};

const isValidDate = (dateStr: string): boolean => {
    const date = new Date(dateStr);
    return date instanceof Date && !isNaN(date.getTime());
};

export const GET: APIRoute = async ({ url }) => {
    try {
        const startDate = url.searchParams.get('startDate');
        const endDate = url.searchParams.get('endDate');
        const orderBy = url.searchParams.get('orderBy');
        const sortDirection = url.searchParams.get('sortDirection');

        if (!startDate || !endDate || !orderBy) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: 'Missing required parameters'
                }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        }

        if (!isValidDate(startDate) || !isValidDate(endDate)) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: 'Invalid date format'
                }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        }

        if (!isValidOrderBy(orderBy)) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: 'Invalid orderBy parameter'
                }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        }

        if (sortDirection && !isValidSortDirection(sortDirection)) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: 'Invalid sortDirection parameter'
                }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        }

        await connectDB();
        const redditService = new RedditService();
        const posts = await redditService.getFilteredPosts(
            startDate,
            endDate,
            orderBy
        );

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