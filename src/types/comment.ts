export type CommentType = {
    _id?: number,
    author: string;
    avatar: string;
    content: string;
    datetime: string;
    createdAt:string;
    rating: number,
    like: [
        {
            userId: string,
            status: string
        }
    ],
    dislike: [
        {
            userId: string,
            status: string
        }
    ],
}