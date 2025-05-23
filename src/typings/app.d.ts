export interface User {
    _id: string;
    avatar: File;
    description: string;
    name: string;
    slug: string;
    links: SocialLink[] | undefined;
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

export interface SocialNetwork {
    _id: string;
    name: string;
    url: string;
    enabled: boolean;
}

export type SocialLink = Pick<SocialNetwork, "name" | "url" | "enabled">;