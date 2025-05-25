export interface User {
    _id: string;
    avatar: File;
    description: string;
    name: string;
    slug: string;
    links: SortableSocialLink[] | undefined;
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

export interface SortableSocialLink {
    id: number;
    name: string;
    url: string;
    enabled: boolean;
}

export type SocialLink = Pick<SortableSocialLink, "name" | "url" | "enabled">;