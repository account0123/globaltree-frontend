import type { SocialLink } from "./app";

export type LoginCredentials = {
    email: string;
    password: string;
}

export type SignupFields = LoginCredentials & {
    name: string;
    slug: string | undefined;
    password2: string;
}

export type ProfileEditFields = {
    slug?: string;
    description?: string;
    links?: SocialLink[];
}