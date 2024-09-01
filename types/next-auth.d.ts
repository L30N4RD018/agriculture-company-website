import "next-auth"

declare module "next-auth"{
    interface Session {
        user: {
            name: string;
            nickname: string;
            email: string;
            picture: string;
            token: string;
            aud: string;
            iss: string;
            sub: string;
            updated_at: string;
            userRoles: string;
            permissions: string[];
        }
    }
}