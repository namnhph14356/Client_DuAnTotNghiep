export type CommentType = {
    _id?: string,
    author: string;
    avatar: string;
    content: string;
    datetime: string;
    createdAt: string;
    rating: number;
    userId: string;
    postId: string;
    dayId:string,
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