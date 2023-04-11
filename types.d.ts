export interface Video {
    caption: string;
    video: {
        asset: {
            _id: string;
            url: string;
        };
    };
    _id: string;
    postedBy: {
        _id: string;
        userName: string;
        image: string;
    };
    likes: {
        postedBy: {
            _id: string;
            userName: string;
            image: string;
        };
    }[];
    comments: {
        postedOn: string
        comment: string;
        _key: string;
        postedBy: {
            _ref: string;
            _id: string;
        };
    }[];
    userId: string;
}

interface IUser {
    _id: string,
    userName: string,
    _type: string,
    image: string,
}