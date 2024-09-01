import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from 'jsonwebtoken';

const handler = NextAuth({
    providers: [
        CredentialsProvider({
          name: "Credentials",          
          credentials: {
            email: { label: "Username", type: "text", placeholder: "jsmith"},
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {            
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login?username=${credentials?.email}&password=${credentials?.password}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },                    
                }
            )
            const user = await res.json()
            if (user.status_code === 400) throw user;
            return user;
          }
        })
      ],
    callbacks: {
        async jwt({token, user}){
            return {...token, ...user};
        },
        async session({session, token}){
            const decodedIdToken = jwt.decode(token.id_token as any);
            const decodedAccessToken = jwt.decode(token.access_token as any);
            session.user = {...session.user, 
              token: token.access_token,
              userRoles: (decodedAccessToken as any)?.userRoles as string,
              permissions: (decodedAccessToken as any)?.permissions as string[],
              ...decodedIdToken as any}
            return session;
        }
    },
    pages: {
      signIn: '/',

    }
})

export { handler as GET, handler as POST};