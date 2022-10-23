export type CommentType = {
    comment: any;
    _id?: number,
    author: string;
    avatar: string;
    content: string;
    datetime: string;
    createdAt: string;
    rating: number;
    userId: string;
    postId: string;
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
    reply: [
        {
            userId: string,
            userName: string,
            content: string,
            avata: string,
            date: string,
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
    ]
}