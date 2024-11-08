export interface Post {
    id: string;
    title: string;
    author_fullname: string;
    created_utc: number;
    created_date: string;
    ups: number;
    num_comments: number;
}