export interface User {
    _id: string;
    avatar: File;
    description: string;
    name: string;
    slug: string;
}

export interface File {
    _id: string;
    url: string;
    tag: string;
    metadata: {
        type: "Image";
        width: number;
        height: number;
    };
}